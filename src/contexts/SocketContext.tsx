import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";
import { SOCKET_SERVER_URI } from "../constants";
import { useLobbies } from "./LobbiesContext";
import { Lobby } from "types/Lobby";
import { useLobby } from "./LobbyContext";

type SocketContextValue = {
  socketRef: React.MutableRefObject<Socket | undefined>,
};

const SocketContext = createContext({} as SocketContextValue);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<undefined | Socket>();

  const { user } = useUser();
	const { updateLobbies } = useLobbies();
	const { updateLobby } = useLobby();

  useEffect(() => {
		if (user.accessToken) {
			socketRef.current = io(SOCKET_SERVER_URI, { query: { token: user.accessToken }});
			socketRef.current.on("updateLobbies", payload => updateLobbies(payload as Lobby[]));
			socketRef.current.on("updateLobby", payload => updateLobby(payload as Lobby));
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