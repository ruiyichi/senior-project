import { createContext, useContext, useReducer, useState } from "react";
import { Game } from "../../types/Game";
import { GameStatus } from "../../api/classes/Game";
import { ACTIONS } from "../constants";

const GameContext = createContext({} as GameContextValue);

type GameContextValue = { 
	game: Game,
	updateGame: React.Dispatch<any>,
	action: ACTIONS,
	setAction: React.Dispatch<React.SetStateAction<ACTIONS>>
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
	status: GameStatus.PENDING
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const gameReducer = (game: Game, payload: Game) => {
		console.log(payload);
		return { ...game, ...payload };
	}
	const [game, updateGame] = useReducer(gameReducer, defaultGame);
	const [action, setAction] = useState(ACTIONS.NO_ACTION);

	const value: GameContextValue = { 
		game,
		updateGame,
		action,
		setAction
	};

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
}

export const useGame = () => useContext(GameContext);