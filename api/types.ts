export enum Color {
  Pink = "pink",
  White = "white",
  Blue = "blue",
  Yellow = "yellow",
  Orange = "orange",
  Black = "black",
  Red = "red",
  Green = "green",
  Wild = "gray"
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