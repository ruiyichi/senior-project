import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import credentials from "./middleware/credentials";
import corsOptions from "./config/corsOptions";
import { logger } from "./middleware/logEvents";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/dbConnection";
import cookieParser from "cookie-parser";
import verifyJWT from "./middleware/verifyJWT";
import path from "path";

dotenv.config();

function init_server() {
	const app = express();
	const PORT = process.env.PORT || 3500;

	connectDB();

	app.use(logger);
	app.use(credentials);
	app.use(cors(corsOptions));

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cookieParser());

	app.use('/', require('./routes/root'));
	app.use('/register', require('./routes/register'));
	app.use('/auth', require('./routes/auth'));
	app.use('/refresh', require('./routes/refresh'));
	app.use('/logout', require('./routes/logout'));
	app.use('/images', require('./routes/images'));

	app.use(verifyJWT);

	app.all('*', (req, res) => {
		res.status(404);
		if (req.accepts('html')) {
			res.sendFile(path.join(__dirname, 'views', '404.html'));
		} else if (req.accepts('json')) {
			res.json({ "error": "404 Not Found" });
		} else {
			res.type('txt').send("404 Not Found");
		}
	});

	app.use(errorHandler);

	mongoose.connection.once('open', () => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	});
}

import { Socket, Server } from "socket.io";
import jwt, { Secret } from 'jsonwebtoken';
import { createLobbyCode } from "./utils";
import { MAX_ITER } from "./constants";
import { WebsocketUser } from "./types/WebsocketUser";
import { WebsocketLobby } from "./types/WebsocketLobby";
import { Game } from "./classes/Game";
import { Player } from "./classes/Player";

function init_websocket_server() {
	const socket_id_to_user = {} as Record<string, WebsocketUser>;
	const lobby_id_to_lobby = {} as Record<string, WebsocketLobby>;
	const player_id_to_lobby_id = {} as Record<string, string>;
	const player_id_to_game_id = {} as Record<string, string>;
	const game_id_to_game = {} as Record<string, Game>;

	const io = new Server(3001, { cors: { origin: "http://localhost:5173" }});
	console.log("Socket server running on port 3001");

	const getSocketIdsInRoom = (room: string) => io.sockets.adapter.rooms.get(room);

	const getSocketByID = (id: string) => io.sockets.sockets.get(id);

	io.use((socket: Socket, next) => {
		if (socket.handshake.query && socket.handshake.query.token) {
			const token = socket.handshake.query.token as string;
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, decoded: any) => {
				if (err) return next(new Error('Authentication error'));
				console.log(decoded.UserInfo)
				socket_id_to_user[socket.id] = decoded.UserInfo as WebsocketUser;
				next();
			});
		} else {
			next(new Error('Authentication error'));
		}
	}).on("connection", socket => {
		const user = socket_id_to_user[socket.id];
		console.log(`Connected ${user.id}`);

		const handleDisconnect = () => {
			console.log(`Disconnected ${socket_id_to_user[socket.id].id}`);
			delete socket_id_to_user[socket.id];
			leaveLobby()
		}

		const leaveLobby = () => {
			const lobby_id = player_id_to_lobby_id[user.id];
			if (!lobby_id) return;

			const lobby = lobby_id_to_lobby[lobby_id];
			if (!lobby) return;

			if (lobby.host.id === user.id) {
				const remaining_players = lobby.players.filter(player => player.id !== user.id);
				if (remaining_players.length > 0) {
					lobby.host = remaining_players[0];
				} else {
					delete lobby_id_to_lobby[lobby.code];
				}
				delete player_id_to_lobby_id[user.id];
			}
			lobby.players = lobby.players.filter(player => player.id !== user.id);
			
			io.in(lobby.code).emit("updateLobby", { ...lobby });
			emitLobbies();
		}

		const createLobby = (callback: Function) => {
			if (player_id_to_lobby_id[user.id]) {
				return;
			}

			let lobbyCode = createLobbyCode(5);
			let iterations = 0;
			while (Object.values(lobby_id_to_lobby).map(lobby => lobby.code).includes(lobbyCode) && iterations < MAX_ITER) {
				lobbyCode = createLobbyCode(5);
				iterations++;
			}

			const lobby = {
				host: user,
				code: lobbyCode,
				players: [user],
				createdAt: Date.now(),
				maxPlayers: 6
			}

			lobby_id_to_lobby[lobby.code] = lobby;
			player_id_to_lobby_id[user.id] = lobby.code;
			socket.join(lobbyCode);
			io.in(lobbyCode).emit("updateLobby", lobby);
			emitLobbies();
			callback(lobbyCode);
		}

		const emitLobbies = () => {
			const all_socket_ids = Object.keys(socket_id_to_user);
			all_socket_ids.forEach(socketId => getSocketByID(socketId)?.emit("updateLobbies", Object.values(lobby_id_to_lobby)));
		}

		const emitGameToAllClients = (game_id: string) => {
			const sockets_in_game = getSocketIdsInRoom(game_id);
			const game = game_id_to_game[game_id];
			if (!game) return;
			sockets_in_game?.forEach(socket_id => getSocketByID(socket_id)?.emit("updateGame", game.getSanitizedGame()));
		}

		const emitRespectivePlayers = () => {
			console.log(player_id_to_game_id);
			console.log(socket_id_to_user);
			const game_id = player_id_to_game_id[user.id];
			if (!game_id) return;

			const game = game_id_to_game[game_id];
			if (!game) return;

			const sockets_in_game = getSocketIdsInRoom(game.id);
			sockets_in_game?.forEach(socket_id => {
				const player = socket_id_to_user[socket_id];
				getSocketByID(socket_id)?.emit("updatePlayer", game.players.find(p => p.id === player.id));
			});
		}

		const emitGame = () => {
			const game_id = player_id_to_game_id[user.id];
			if (!game_id) return;

			const game = game_id_to_game[game_id];
			if (!game) return;

			socket.emit("updateGame", game.getSanitizedGame());
		}

		const joinLobby = (lobbyCode: string, callback: Function) => {
			let status = "OK";
	
			const lobby = lobby_id_to_lobby[lobbyCode];
			if (!lobby) {
				status = "Invalid code";
				return callback(status);
			}
	
			if (lobby.players.length === lobby.maxPlayers) {
				status = "Lobby full";
			} else if (!lobby.players.find(player => player.id === user.id)) {
				player_id_to_lobby_id[user.id] = lobby.code;
				socket.join(lobbyCode);
				lobby.players.push(user);
				io.in(lobbyCode).emit("updateLobby", lobby);
				emitLobbies();
			}
			callback(status);
		}

		const startGame = () => {
			// user is already in a game
			if (player_id_to_game_id[user.id]) return;
			
			const lobby_id = player_id_to_lobby_id[user.id];
			const lobby = lobby_id_to_lobby[lobby_id];

			const players = lobby.players;
			const game_players = players.map(p => new Player(p.id, p.username));
			const game = new Game(game_players);

			game_id_to_game[game.id] = game;

			// map each player id to game
			players.forEach(player => player_id_to_game_id[player.id] = game.id);

			// remove each player from lobby socket
			const lobby_socket_ids = getSocketIdsInRoom(lobby.code);
			lobby_socket_ids?.forEach(socket_id => {
				const socket = getSocketByID(socket_id);
				const user = socket_id_to_user[socket_id];
				// socket leave lobby
				socket?.leave(lobby.code);
				delete player_id_to_lobby_id[user.id];
				// socket join game
				socket?.join(game.id);
			});

			// delete lobby
			delete lobby_id_to_lobby[lobby.code];
			
			console.log(lobby_id_to_lobby)
			console.log(player_id_to_lobby_id);
			game.startGame();
			emitGameToAllClients(game.id);
			emitRespectivePlayers();
		}

		const handleSocketConnect = () => {
			console.log('on socket connect')
			const game_id = player_id_to_game_id[user.id];
			if (game_id !== undefined) {
				const game = game_id_to_game[game_id];
				socket.join(game.id);
				emitGame();
				emitRespectivePlayers();
			} else {
				emitLobbies();
			}
		}

		socket.on("disconnect", handleDisconnect);
		socket.on("createLobby", createLobby);
		socket.on("emitLobbies", emitLobbies);
		socket.on("joinLobby", joinLobby);
		socket.on("leaveLobby", leaveLobby);
		socket.on("startGame", startGame);

		// Send on connect
		handleSocketConnect();
	});
}

init_server();
init_websocket_server();
