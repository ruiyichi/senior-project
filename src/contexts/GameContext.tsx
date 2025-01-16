import { createContext, useContext, useReducer, useState } from "react";
import { Game } from "../../types/Game";
import { GameStatus } from "../../api/classes/Game";
import { ACTION } from "../../api/constants";
import { Color, Route } from "api/types";

const GameContext = createContext({} as GameContextValue);

type GameContextValue = { 
	game: Game,
	updateGame: React.Dispatch<Game>,
	selectedRoute: Route | undefined,
	setSelectedRoute: React.Dispatch<React.SetStateAction<Route | undefined>>,
	selectedCardColor: Color | undefined,
	setSelectedCardColor: React.Dispatch<React.SetStateAction<Color | undefined>>,
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
	activePlayerAction: ACTION.NO_ACTION
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const gameReducer = (game: Game, payload: Game) => {
		console.log(payload);
		return { ...game, ...payload };
	}
	const [game, updateGame] = useReducer(gameReducer, defaultGame);

	const [selectedRoute, setSelectedRoute] = useState<Route | undefined>(undefined);

	const [selectedCardColor, setSelectedCardColor] = useState<Color | undefined>(undefined);

	const value: GameContextValue = { 
		game,
		updateGame,
		selectedRoute,
		setSelectedRoute,
		selectedCardColor,
		setSelectedCardColor
	};

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
}

export const useGame = () => useContext(GameContext);