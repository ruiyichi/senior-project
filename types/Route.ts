import { Color } from "../api/types";

export type Route = {
  start: string,
  destination: string,
  id: string,
  color: Color,
  path: { x: number, y: number, angle: number }[]
};