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
import { v4 as uuid } from "uuid";

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
import { MAX_ITER, MAX_NUM_PLAYERS } from "./constants";
import { WebsocketUser } from "./types/WebsocketUser";
import { WebsocketLobby } from "./types/WebsocketLobby";
import { Game, GameStatus } from "./classes/Game";
import { Player } from "./classes/Player";
import { Color, PlayerColor, TrainCarCard } from "./types";
import { Agent } from "./classes/Agent";

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

		const addBotToLobby = () => {
			const lobby_id = player_id_to_lobby_id[user.id];
			if (!lobby_id) return;

			const lobby = lobby_id_to_lobby[lobby_id];
			if (!lobby) return;

			if ((lobby.host.id === user.id) && (lobby.players.length < lobby.maxPlayers)) {
				const num_agents = lobby.players.filter(p => p.type === 'Agent').length;
				const agent_user = { id: uuid(), username: `Bot ${num_agents + 1}`, type: 'Agent' } as WebsocketUser;
				lobby.players.push(agent_user);
				io.in(lobby.code).emit("updateLobby", lobby);
				emitLobbies();
			}
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
				maxPlayers: MAX_NUM_PLAYERS
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
			sockets_in_game?.forEach(socket_id => {
				getSocketByID(socket_id)?.emit("updateGame", game.getSanitizedGame());
			})
		}

		const emitFinalGameToAllClients = (game_id: string) => {
			const sockets_in_game = getSocketIdsInRoom(game_id);
			const game = game_id_to_game[game_id];
			if (!game) return;
			sockets_in_game?.forEach(socket_id => getSocketByID(socket_id)?.emit("updateFinalGame", game));
		}

		const getGame = () => {
			const game_id = player_id_to_game_id[user.id];
			if (!game_id) return;

			return game_id_to_game[game_id];
		}

		const emitRespectivePlayers = () => {
			const game = getGame();
			if (!game) return;

			const sockets_in_game = getSocketIdsInRoom(game.id);
			sockets_in_game?.forEach(socket_id => {
				const player = socket_id_to_user[socket_id];
				getSocketByID(socket_id)?.emit("updatePlayer", game.players.find(p => p.id === player.id)?.getSanitizedPlayer());
			});
		}

		const emitGame = () => {
			const game = getGame();
			if (!game) return;

			socket.emit("updateGame", game.getSanitizedGame());
		}

		const emitFinalGame = () => {
			const game = getGame();
			if (!game) return;

			socket.emit("updateFinalGame", game);
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

		const emit = (game_id: string) => {
			emitGameToAllClients(game_id);
			emitRespectivePlayers();
		}

		const startGame = () => {
			// user is already in a game
			if (player_id_to_game_id[user.id]) return;
			
			const lobby_id = player_id_to_lobby_id[user.id];
			const lobby = lobby_id_to_lobby[lobby_id];

			const players = lobby.players;
			const playerColors = Object.values(PlayerColor);
			const game_players = players.map((p, i) => p.type === 'Agent' ? new Agent(p.id, p.username, playerColors[i]) : new Player(p.id, p.username, playerColors[i]));
			const game = new Game(game_players, emit, emitFinalGameToAllClients, emitOnOtherPlayerKeepTrainCarCard);

			game_id_to_game[game.id] = game;

			// map each player id to game
			players.filter(p => p.type === 'Player').forEach(player => player_id_to_game_id[player.id] = game.id);
			
			// delete lobby
			delete lobby_id_to_lobby[lobby.code];
			emitLobbies();

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


			game.startGame();
		}

		const handleSocketConnect = () => {
			console.log('on socket connect')
			const game_id = player_id_to_game_id[user.id];
			if (game_id !== undefined) {
				const game = game_id_to_game[game_id];
				socket.join(game.id);

				if (game.status === GameStatus.COMPLETE) {
					emitFinalGame();
				}
				emitGame();
				emitRespectivePlayers();
			} else {
				emitLobbies();
			}
		}

		const selectTicketCards = async (ticketCardIds: string[]) => {
			const game = getGame();
			if (!game) return;

			game.keepTicketCards(user.id, ticketCardIds);
			emitGameToAllClients(game.id);
			emitRespectivePlayers();
		}

		const onGameEnd = () => {
			const game = getGame();
			if (!game) return;

			emitFinalGameToAllClients(game.id);
		}

		const playerKeepTrainCarCard = async (card_id: string | undefined) => {
			const game = getGame();
			if (!game) return;

			const kept_card = game.keepTrainCarCard(user.id, card_id);

			emitGameToAllClients(game.id);

			emitOnOtherPlayerKeepTrainCarCard(game.id, socket_id_to_user[socket.id].id, card_id, kept_card);

			socket.emit("playerKeepTrainCarCard", kept_card);

			if (game.status === GameStatus.COMPLETE) {
				onGameEnd();
			}
		}

		const emitOnOtherPlayerKeepTrainCarCard = (game_id: string, user_id: string, selected_card_id: string | undefined, kept_card: TrainCarCard | null) => {
			const sockets_in_game = getSocketIdsInRoom(game_id);
			sockets_in_game?.forEach(socket_id => {
				if (user_id === socket_id_to_user[socket_id]?.id) return;

				getSocketByID(socket_id)?.emit("otherPlayerKeepTrainCarCard", { 
					user_id,
					card: selected_card_id === undefined ? { id: uuid(), color: null } : kept_card
				});
			});
		}

		const playerActionTicketCard = () => {
			const game = getGame();
			if (!game) return;

			game.actionTicketCards(user.id);
			emitGameToAllClients(game.id);
			emitRespectivePlayers();

			if (game.status === GameStatus.COMPLETE) {
				onGameEnd();
			}
		}

		const playerClaimRoute = async (route_id: string, color?: Color) => {
			const game = getGame();
			if (!game) return;

			game.claimRoute(route_id, color);
			emitGameToAllClients(game.id);
			emitRespectivePlayers();

			if (game.status === GameStatus.COMPLETE) {
				onGameEnd();
			}
		}

		const playerPass = async () => {
			const game = getGame();
			if (!game) return;
			
			game.nextTurn();
			emitGameToAllClients(game.id);
			emitRespectivePlayers();

			if (game.status === GameStatus.COMPLETE) {
				onGameEnd();
			}
		}

		const finishGame = () => {
			const game = getGame();
			if (!game) return;

			delete player_id_to_game_id[user.id];
			socket?.leave(game.id);
		}

		socket.on("disconnect", handleDisconnect);
		socket.on("createLobby", createLobby);
		socket.on("emitLobbies", emitLobbies);
		socket.on("joinLobby", joinLobby);
		socket.on("leaveLobby", leaveLobby);
		socket.on("lobbyAddBot", addBotToLobby);
		socket.on("startGame", startGame);
		socket.on("selectTicketCards", selectTicketCards);
		socket.on("playerKeepTrainCarCard", playerKeepTrainCarCard);
		socket.on("playerActionTicketCard", playerActionTicketCard);
		socket.on("playerClaimRoute", playerClaimRoute);
		socket.on("playerPass", playerPass);
		socket.on("finishGame", finishGame);

		// Send on connect
		handleSocketConnect();
	});
}

init_server();
init_websocket_server();
