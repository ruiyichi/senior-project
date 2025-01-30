import { PlayerColor, Route } from "../api/types";

export type OtherPlayer = {
  id: string;
  username: string;
  numTrainCarCards: number;
  numTicketCards: number;
  points: number;
  routes: Route[];
  numTrainCars: number;
  color: PlayerColor;
  longestContinuousPath: boolean;
};