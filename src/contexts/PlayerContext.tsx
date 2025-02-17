import { createContext, useContext, useReducer, useState } from "react";
import { Player } from "../../types/Player";
import { Color, PlayerColor, TrainCarCard } from "../../api/types";

const PlayerContext = createContext({} as PlayerContextValue);

type PlayerContextValue = { 
	player: Player,
	updatePlayer: React.Dispatch<Action>,
	selectedCardColor: Color | undefined,
	setSelectedCardColor: React.Dispatch<React.SetStateAction<Color | undefined>>
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

export enum ActionTypes {
	UPDATE,
	ADD_TRAIN_CAR_CARD
}

type Action = 
	| { type: ActionTypes.UPDATE, payload: Player }
	| { type: ActionTypes.ADD_TRAIN_CAR_CARD, payload: TrainCarCard };

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const PlayerReducer = (player: Player, action: Action) => {
		console.log(action);

		if (action.type === ActionTypes.UPDATE) {
			return { ...player, ...action.payload };
		}
		if (action.type === ActionTypes.ADD_TRAIN_CAR_CARD) {
			return { ...player, trainCarCards: [...player.trainCarCards, action.payload]};
		}

		return player;
	}
	const [player, updatePlayer] = useReducer(PlayerReducer, defaultPlayer);

	const [selectedCardColor, setSelectedCardColor] = useState<undefined | Color>(undefined);

	const value: PlayerContextValue = { 
		player,
		updatePlayer,
		selectedCardColor,
		setSelectedCardColor
	};

	return (
		<PlayerContext.Provider value={value}>
			{children}
		</PlayerContext.Provider>
	);
}

export const usePlayer = () => useContext(PlayerContext);