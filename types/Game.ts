import { Route, TrainCarCard } from "../api/types";
import { OtherPlayer } from "./OtherPlayer";
import { GameStatus } from "../api/classes/Game";
import { ACTION } from "api/constants";

export type Game = {
  id: string;
  numTrainCarCards: number;
  numTicketCards: number;
  players: OtherPlayer[];
  routes: Route[];
  activePlayerId: string;
  turnTimer: number;
  startTime: number;
  turnStartTime: number;
  faceUpTrainCarCards: TrainCarCard[];
  status: GameStatus;
  activePlayerAction: ACTION;
  standings: string[];
  log: string[];
};