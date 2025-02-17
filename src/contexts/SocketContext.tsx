import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";
import { SOCKET_SERVER_URI } from "../constants";
import { useLobbies } from "./LobbiesContext";
import { WebsocketLobby } from "../../api/types/WebsocketLobby";
import { useLobby } from "./LobbyContext";
import { useGame } from "./GameContext";
import { Game } from "types/Game";
import { Player } from "types/Player";
import { ActionTypes, usePlayer } from "./PlayerContext";
import { Game as finalGame } from "../../api/classes/Game";
import { TrainCarCard } from "../../api/types";

type SocketContextValue = {
  socketRef: React.MutableRefObject<Socket | undefined>,
};

const SocketContext = createContext({} as SocketContextValue);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<undefined | Socket>();

  const { user } = useUser();
	const { updateLobbies } = useLobbies();
	const { updateLobby } = useLobby();
	const { updateGame, setFinalGame } = useGame();
	const { updatePlayer, setSelectedCardColor } = usePlayer();

  useEffect(() => {
		if (user.accessToken) {
			socketRef.current = io(SOCKET_SERVER_URI, { query: { token: user.accessToken }});
			socketRef.current.on("updateLobbies", payload => updateLobbies(payload as WebsocketLobby[]));
			socketRef.current.on("updateLobby", payload => updateLobby(payload as WebsocketLobby));
			socketRef.current.on("updateGame", payload => updateGame(payload as Game));
			socketRef.current.on("updatePlayer", payload => updatePlayer({ type: ActionTypes.UPDATE, payload: payload as Player }));
			socketRef.current.on("updateFinalGame", payload => setFinalGame(payload as finalGame));
			socketRef.current.on("playerKeepTrainCarCard", payload => {
				if (payload) {
					setSelectedCardColor((payload as TrainCarCard).color);
					updatePlayer({ type: ActionTypes.ADD_TRAIN_CAR_CARD, payload: (payload as TrainCarCard) });
				}
			});
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		}
	}, [user.accessToken]);

  const value: SocketContextValue = {
		socketRef
  };

  return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);