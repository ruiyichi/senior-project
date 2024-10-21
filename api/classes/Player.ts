import { NUM_TRAIN_CARS } from "../constants";
import { Route } from "./Route";

export class Player {
  id: string;
  username: string;
  trainCarCards: TrainCarCard[];
  ticketCards: TicketCard[];
  points: number;
  routes: Route[];
  numTrainCars: number;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
    this.trainCarCards = [];
    this.ticketCards = [];
    this.points = 0;
    this.routes = [];
    this.numTrainCars = NUM_TRAIN_CARS;
  }
}