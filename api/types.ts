export enum Color {
  Pink,
  White,
  Blue,
  Yellow,
  Orange,
  Black,
  Red,
  Green,
  Wild
};

export type TicketCard = {
  id: string;
  start: string;
  destination: string;
  points: number;
};

export type TrainCarCard = {
  id: string;
  color: Color;
  type: string;
};

export type Route = {
  id: string;
  start: string;
  destination: string;
  numTrainCars: number;
  color: Color;
}