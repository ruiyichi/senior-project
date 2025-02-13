import { createContext, useContext, useReducer } from "react";
import { Player } from "../../types/Player";
import { PlayerColor } from "../../api/types";

const PlayerContext = createContext({} as PlayerContextValue);

type PlayerContextValue = { 
	player: Player,
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
  proposedTicketCards: [],
	color: PlayerColor.RED,
	type: 'Agent',
	longestContinuousPath: false
} as Player;

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const PlayerReducer = (Player: Player, payload: Player) => {
		console.log(payload);
		return { ...Player, ...payload };
	}
	const [player, updatePlayer] = useReducer(PlayerReducer, defaultPlayer);

	const value: PlayerContextValue = { 
		player,
		updatePlayer
	};

	return (
		<PlayerContext.Provider value={value}>
			{children}
		</PlayerContext.Provider>
	);
}

export const usePlayer = () => useContext(PlayerContext);