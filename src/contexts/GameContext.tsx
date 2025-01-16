import { createContext, useContext, useReducer, useState } from "react";
import { Game } from "../../types/Game";
import { GameStatus } from "../../api/classes/Game";
import { ACTION } from "../../api/constants";

const GameContext = createContext({} as GameContextValue);

type GameContextValue = { 
	game: Game,
	updateGame: React.Dispatch<Game>,
	selectedRouteId: string,
	setSelectedRouteId: React.Dispatch<React.SetStateAction<string>>
};

const defaultGame = {
  id: "",
  numTrainCarCards: 0,
  numTicketCards: 0,
  players: [],
  unclaimedRoutes: [],
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

	const [selectedRouteId, setSelectedRouteId] = useState("");

	const value: GameContextValue = { 
		game,
		updateGame,
		selectedRouteId,
		setSelectedRouteId
	};

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
}

export const useGame = () => useContext(GameContext);