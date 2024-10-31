import { createContext, useContext, useReducer } from "react";
import { Player } from "../../types/Player";

const PlayerContext = createContext({} as PlayerContextValue);

type PlayerContextValue = { 
	Player: Player,
	updatePlayer: React.Dispatch<any>,
};

const defaultPlayer = {
  id: "",
  username: "",
  trainCarCards: [],
  ticketCards: [],
  points: 0,
  routes: [],
  numTrainCars: 0,
  proposedTicketCards: []
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const PlayerReducer = (Player: Player, payload: Player) => {
		return { ...Player, ...payload };
	}
	const [Player, updatePlayer] = useReducer(PlayerReducer, defaultPlayer);

	const value: PlayerContextValue = { 
		Player,
		updatePlayer
	};

	return (
		<PlayerContext.Provider value={value}>
			{children}
		</PlayerContext.Provider>
	);
}

export const usePlayer = () => useContext(PlayerContext);