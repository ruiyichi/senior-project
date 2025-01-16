import { NUM_TRAIN_CARS } from "../constants";
import { PlayerColor, Route, TicketCard, TrainCarCard } from "../types";

export class Player {
  id: string;
  username: string;
  trainCarCards: TrainCarCard[];
  ticketCards: TicketCard[];
  points: number;
  routes: Route[];
  numTrainCars: number;
  proposedTicketCards: TicketCard[];
  color: PlayerColor;

  constructor(id: string, username: string, color: PlayerColor = PlayerColor.RED) {
    this.id = id;
    this.username = username;
    this.trainCarCards = [];
    this.ticketCards = [];
    this.points = 0;
    this.routes = [];
    this.numTrainCars = NUM_TRAIN_CARS;
    this.proposedTicketCards = [];
    this.color = color;
  }

  getSanitizedPlayer() {
    return {
      id: this.id,
      username: this.username,
      numTrainCarCards: this.trainCarCards.length,
      numTicketCards: this.ticketCards.length,
      points: this.points,
      routes: this.routes,
      numTrainCars: this.numTrainCars,
      color: this.color
    };
  }
}