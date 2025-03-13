import { createContext, useContext, useReducer, useState } from "react";
import { Game } from "../../types/Game";
import { GameStatus } from "../../api/classes/Game";
import { ACTION } from "../../api/constants";
import { Color, Route } from "../../api/types";
import { Game as finalGame } from "../../api/classes/Game";
import { OtherPlayerKeptCard } from "../../types/OtherPlayer";

const GameContext = createContext({} as GameContextValue);

type GameContextValue = { 
	game: Game,
	updateGame: React.Dispatch<Action>,
	finalGame: finalGame | undefined,
	setFinalGame: React.Dispatch<React.SetStateAction<finalGame | undefined>>,
	selectedRoute: Route | undefined,
	setSelectedRoute: React.Dispatch<React.SetStateAction<Route | undefined>>,
	selectedCardColor: Color | undefined,
	setSelectedCardColor: React.Dispatch<React.SetStateAction<Color | undefined>>,
	otherPlayerSelectedCard : OtherPlayerKeptCard | undefined,
	setOtherPlayerSelectedCard: React.Dispatch<React.SetStateAction<OtherPlayerKeptCard | undefined>>
};

const defaultGame = {
  id: "",
  numTrainCarCards: 0,
  numTicketCards: 0,
  players: [],
  routes: [],
  activePlayerId: '',
  turnTimer: 0,
  startTime: 0,
  turnStartTime: 0,
  faceUpTrainCarCards: [],
	status: GameStatus.PENDING,
	activePlayerAction: ACTION.NO_ACTION,
	standings: [],
	log: []
} as Game;

export enum ActionTypes {
	UPDATE,
};

type Action = 
	| { type: ActionTypes.UPDATE, payload: Game }

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const gameReducer = (game: Game, action: Action) => {
		console.log(action);

		if (action.type === ActionTypes.UPDATE) {
			return { ...game, ...action.payload };
		}

		return game;
	}

	const [game, updateGame] = useReducer(gameReducer, defaultGame);

	const [finalGame, setFinalGame] = useState<finalGame | undefined>(undefined);

	const [selectedRoute, setSelectedRoute] = useState<Route | undefined>(undefined);

	const [selectedCardColor, setSelectedCardColor] = useState<Color | undefined>(undefined);

	const [otherPlayerSelectedCard, setOtherPlayerSelectedCard] = useState<OtherPlayerKeptCard | undefined>(undefined);

	const value: GameContextValue = { 
		game,
		updateGame,
		selectedRoute,
		setSelectedRoute,
		selectedCardColor,
		setSelectedCardColor,
		finalGame,
		setFinalGame,
		otherPlayerSelectedCard,
		setOtherPlayerSelectedCard
	};

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
}

export const useGame = () => useContext(GameContext);
