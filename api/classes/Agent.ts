import { PlayerColor, TicketCard } from "../types";
import { Game } from "./Game";
import { Player } from "./Player";

export class Agent extends Player {
  constructor(id: string, username: string, color: PlayerColor = PlayerColor.RED) {
    super(id, username, color);
    this.type = 'Agent';
  }

  wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectTicketCards(game: Game) {
    const is_short_route = (c: TicketCard) => {
      return c.points <= 9;
    }

    const is_medium_route = (c: TicketCard) => {
      return c.points > 9 && c.points <= 13
    }

    let num_short_routes = 0;
    let num_medium_routes = 0;
    let num_long_routes = 0;

    this.proposedTicketCards.forEach(c => {
      if (is_short_route(c)) num_short_routes += 1;
      if (is_medium_route(c)) num_medium_routes += 1;
      else num_long_routes += 1;
    });

    let ticket_card_ids_to_keep = [] as string[];

    if (num_short_routes === 3) {
      ticket_card_ids_to_keep = this.proposedTicketCards.map(c => c.id);
    } else if (num_medium_routes === 2) {
      ticket_card_ids_to_keep = this.proposedTicketCards.filter(c => is_medium_route(c)).map(c => c.id);
    } else {
      ticket_card_ids_to_keep = this.proposedTicketCards.map(c => c.id);
    }

    game.keepTicketCards(this.id, ticket_card_ids_to_keep);
  }

  async performTurn(game: Game) {
    await this.wait(5000);
    game.keepTrainCarCard(this.id);
    game.emit(game.id);
    await this.wait(5000);
    game.keepTrainCarCard(this.id);
    game.emit(game.id);
  }
}