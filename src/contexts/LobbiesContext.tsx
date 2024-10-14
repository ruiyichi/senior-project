import { createContext, useContext, useReducer } from "react";
import { Lobby } from "../../types/Lobby";

type LobbiesAction = { 
	type: 'update', 
	payload: Lobby[]
};

type LobbiesContextValue = {
  lobbies: Lobby[],
	updateLobbies: React.Dispatch<any>
};

const LobbiesContext = createContext({} as LobbiesContextValue);

export const LobbiesProvider = ({ children }: { children: React.ReactNode }) => {
  const lobbiesReducer: React.Reducer<Lobby[], LobbiesAction> = (lobbies: Lobby[], action: LobbiesAction) => {
		console.log(lobbies)
		switch (action.type) {
			case 'update':
				return [...action.payload];
			default:
				return lobbies;
		}
	}

	const [lobbies, dispatchLobbies] = useReducer(lobbiesReducer, [] as Lobby[]);

	const updateLobbies = (payload: Lobby[]) => {
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