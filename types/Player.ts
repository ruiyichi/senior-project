import { PlayerColor, Route, TicketCard, TrainCarCard } from "../api/types";

export type Player = {
  id: string;
  username: string;
  trainCarCards: TrainCarCard[];
  ticketCards: TicketCard[];
  points: number;
  routes: Route[];
  numTrainCars: number;
  proposedTicketCards: TicketCard[];
  color: PlayerColor;
  longestContinuousPath: boolean;
  type: 'Player' | 'Agent'
};