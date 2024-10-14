export type Lobby = {
  hostId: string,
  code: string,
  playerIds: string[],
  createdAt: number,
  maxPlayers: number
}