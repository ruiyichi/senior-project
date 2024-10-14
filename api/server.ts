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
import { Lobby } from "../types/Lobby";

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

function init_websocket_server() {
	const socketUsers = {} as Record<string, string>;
	const lobbies = {} as Record<string, Lobby>;

	const io = new Server(3001, { cors: { origin: "http://localhost:5173" }});
	console.log("Socket server running on port 3001");

	const getSocketByID = (id: string) => io.sockets.sockets.get(id);

	io.use((socket: Socket, next) => {
		if (socket.handshake.query && socket.handshake.query.token) {
			const token = socket.handshake.query.token as string;
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, decoded: any) => {
				if (err) return next(new Error('Authentication error'));
				socketUsers[socket.id] = decoded?.UserInfo?.id;
				next();
			});
		} else {
			next(new Error('Authentication error'));
		}
	}).on("connection", socket => {
		const userID = socketUsers[socket.id];
		console.log(`Connected ${userID}`)

		const handleDisconnect = () => {
			console.log(`Disconnected ${socketUsers[socket.id]}`);
			delete socketUsers[socket.id];
		}

		const createLobby = (callback: Function) => {
			let lobbyCode = createLobbyCode(5);
			let iterations = 0;
			while (Object.values(lobbies).map(lobby => lobby.code).includes(lobbyCode) && iterations < MAX_ITER) {
				lobbyCode = createLobbyCode(5);
				iterations++;
			}

			const lobby = {
				hostId: userID,
				code: lobbyCode,
				playerIds: [userID],
				createdAt: Date.now(),
				maxPlayers: 6
			}

			lobbies[userID] = lobby;
			socket.join(lobbyCode);
			io.in(lobbyCode).emit("updateLobby", { ...lobby });
			emitLobbies();
			callback(lobbyCode);
		}

		const emitLobbies = () => {
			Object.keys(socketUsers).forEach(socketId => getSocketByID(socketId)?.emit("updateLobbies", Object.values(lobbies).filter((obj1, i, arr) => arr.findIndex(obj2 => (obj2.hostId === obj1.hostId)) === i)));
		}

		const joinLobby = (lobbyCode: string, callback: Function) => {
			let status = "OK";
	
			const lobby = Object.values(lobbies).find(lobby => lobby.code === lobbyCode);
			if (!lobby) {
				status = "Invalid code";
				return callback(status);
			}
	
			if (lobby.playerIds.length === lobby.maxPlayers) {
				status = "Lobby full";
			} else if (!lobby.playerIds.includes(userID)) {
				lobbies[userID] = lobby;
				socket.join(lobbyCode);
				lobby.playerIds.push(userID);
				io.in(lobbyCode).emit("updateLobby", { ...lobby });
				emitLobbies();
			}
			callback(status);
		}

		socket.on("disconnect", handleDisconnect);
		socket.on("createLobby", createLobby);
		socket.on("emitLobbies", emitLobbies);
		socket.on("joinLobby", joinLobby);

		// Send on connect
		emitLobbies();
	});
}

init_server();
init_websocket_server();
