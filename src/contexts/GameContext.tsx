import { createContext, useContext, useReducer } from "react";
import { Game } from "../../types/Game";
import { GameStatus } from "../../api/classes/Game";

const GameContext = createContext({} as GameContextValue);

type GameContextValue = { 
	game: Game,
	updateGame: React.Dispatch<any>,
};

const defaultGame = {
  id: "",
  numTrainCarCards: 0,
  numTicketCards: 0,
  players: [],
  unclaimedRoutes: [],
  activePlayerId: 0,
  turnTimer: 0,
  startTime: 0,
  turnStartTime: 0,
  faceUpTrainCarCards: [],
	status: GameStatus.PENDING
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const gameReducer = (game: Game, payload: Game) => {
		console.log(payload);
		return { ...game, ...payload };
	}
	const [game, updateGame] = useReducer(gameReducer, defaultGame);

	const value: GameContextValue = { 
		game,
		updateGame
	};

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
}

export const useGame = () => useContext(GameContext);