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

export enum PlayerColor {
  RED = '#FF0000',
  BLACK = '#000000',
  GREEN = '#00FF00',
  BLUE = '#0000FF',
  YELLOW = '#FFFF00'
}

export type TicketCard = {
  id: string;
  start: string;
  destination: string;
  points: number;
  complete: boolean;
};

export type TrainCarCard = {
  id: string;
  color: Color;
  type: string;
};

export type Route = {
  start: string,
  destination: string,
  id?: string,
  color: Color,
  path: { x: number, y: number, angle: number }[],
  claimed_player_id?: string;
  disabled: boolean;
};