import { WebsocketUser } from "./WebsocketUser"

export type WebsocketLobby = {
  host: WebsocketUser,
  code: string,
  players: WebsocketUser[],
  createdAt: number,
  maxPlayers: number
}