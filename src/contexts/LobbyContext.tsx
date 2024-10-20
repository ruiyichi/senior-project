import { createContext, useContext, useReducer } from "react";
import { WebsocketLobby } from "../../api/types/WebsocketLobby";

type LobbyAction = { 
	type: 'update', 
	payload: WebsocketLobby 
};

type LobbyContextValue = {
  lobby: WebsocketLobby,
	updateLobby: React.Dispatch<any>
};

const LobbyContext = createContext({} as LobbyContextValue);

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const lobbyReducer: React.Reducer<WebsocketLobby, LobbyAction> = (lobby: WebsocketLobby, action: LobbyAction) => {
		switch (action.type) {
			case 'update':
				return { ...lobby, ...action.payload };
			default:
				return lobby;
		}
	}

	const [lobby, dispatchLobby] = useReducer(lobbyReducer, {} as WebsocketLobby);

	const updateLobby = (payload: WebsocketLobby) => {
		dispatchLobby({ type: 'update', payload });
	}

  const value: LobbyContextValue = {
    lobby,
		updateLobby
  };

  return (
		<LobbyContext.Provider value={value}>
			{children}
		</LobbyContext.Provider>
	);
};

export const useLobby = () => useContext(LobbyContext);