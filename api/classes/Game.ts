import { Route } from "./Route";
import { Player } from "./Player";

class Game {
  id: string;
  trainCarCardDeck: Deck<TrainCarCard>;
  ticketCardDeck: Deck<TicketCard>;
  players: Player[];
  unclaimedRoutes: Route[];
  
  constructor(id: string, trainCarCards: TrainCarCard[], ticketCards: TicketCard[], players: Player[], unclaimedRoutes: Route[]) {
    this.id = id;
    this.trainCarCardDeck = new Deck<TrainCarCard>(trainCarCards);
    this.ticketCardDeck = new Deck<TicketCard>(ticketCards);
    this.players = players;
    this.unclaimedRoutes = unclaimedRoutes;
  }
}