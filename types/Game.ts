import { Route, TrainCarCard } from "../api/types";
import { OtherPlayer } from "./OtherPlayer";
import { GameStatus } from "../api/classes/Game";

export type Game = {
  id: string;
  numTrainCarCards: number;
  numTicketCards: number;
  players: OtherPlayer[];
  unclaimedRoutes: Route[];
  activePlayerId: number;
  turnTimer: number;
  startTime: number;
  turnStartTime: number;
  faceUpTrainCarCards: TrainCarCard[];
  status: GameStatus;
};