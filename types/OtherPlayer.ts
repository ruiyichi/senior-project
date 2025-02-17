import { PlayerColor, Route, TrainCarCard } from "../api/types";

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
  type: 'Player' | 'Agent';
};

export type OtherPlayerKeptCard = { 
  user_id: string;
  card: TrainCarCard | undefined;
}
