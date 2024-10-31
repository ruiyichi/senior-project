import { createContext, useContext, useReducer } from "react";
import { WebsocketLobby } from "../../api/types/WebsocketLobby";

type LobbiesAction = { 
	type: 'update', 
	payload: WebsocketLobby[]
};

type LobbiesContextValue = {
  lobbies: WebsocketLobby[],
	updateLobbies: React.Dispatch<any>
};

const LobbiesContext = createContext({} as LobbiesContextValue);

export const LobbiesProvider = ({ children }: { children: React.ReactNode }) => {
  const lobbiesReducer: React.Reducer<WebsocketLobby[], LobbiesAction> = (lobbies: WebsocketLobby[], action: LobbiesAction) => {
		switch (action.type) {
			case 'update':
				return [...action.payload];
			default:
				return lobbies;
		}
	}

	const [lobbies, dispatchLobbies] = useReducer(lobbiesReducer, [] as WebsocketLobby[]);

	const updateLobbies = (payload: WebsocketLobby[]) => {
		dispatchLobbies({ type: 'update', payload });
	}

  const value: LobbiesContextValue = {
    lobbies,
		updateLobbies
  };

  return (
		<LobbiesContext.Provider value={value}>
			{children}
		</LobbiesContext.Provider>
	);
};

export const useLobbies = () => useContext(LobbiesContext);