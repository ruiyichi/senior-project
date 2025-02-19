import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";
import { SOCKET_SERVER_URI } from "../constants";
import { useLobbies } from "./LobbiesContext";
import { useLobby } from "./LobbyContext";
import { useGame, ActionTypes as GameActionTypes } from "./GameContext";
import { ActionTypes as PlayerActionTypes, usePlayer } from "./PlayerContext";
import { TrainCarCard } from "../../api/types";
import { OtherPlayerKeptCard } from "types/OtherPlayer";

type SocketContextValue = {
  socketRef: React.MutableRefObject<Socket | undefined>,
};

const SocketContext = createContext({} as SocketContextValue);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<undefined | Socket>();

  const { user } = useUser();
	const { updateLobbies } = useLobbies();
	const { updateLobby } = useLobby();
	const { updateGame, setFinalGame, setOtherPlayerSelectedCard } = useGame();
	const { updatePlayer, setSelectedCard } = usePlayer();

  useEffect(() => {
		if (user.accessToken) {
			socketRef.current = io(SOCKET_SERVER_URI, { query: { token: user.accessToken }});
			socketRef.current.on("updateLobbies", payload => updateLobbies(payload));
			socketRef.current.on("updateLobby", payload => updateLobby(payload));
			socketRef.current.on("updateGame", payload => updateGame({ type: GameActionTypes.UPDATE, payload }));
			socketRef.current.on("updatePlayer", payload => updatePlayer({ type: PlayerActionTypes.UPDATE, payload }));
			socketRef.current.on("updateFinalGame", payload => setFinalGame(payload));
			socketRef.current.on("playerKeepTrainCarCard", payload => {
				console.log('playerKeepTrainCarCard', payload)
				if (payload) {
					setSelectedCard(payload as TrainCarCard);
					updatePlayer({ type: PlayerActionTypes.ADD_TRAIN_CAR_CARD, payload });
				}
			});
			socketRef.current.on("otherPlayerKeepTrainCarCard", (payload: OtherPlayerKeptCard) => {
				console.log('otherPlayerKeepTrainCarCard', payload)
				if (payload.card) {
					setOtherPlayerSelectedCard(payload);
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