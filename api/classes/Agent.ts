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
    /*const items = Array.from({ length: this.proposedTicketCards.length }).map((_, i) => i + 1);
    const combinations = this.uniqueCombinations(items);

    combinations.forEach(combo => {
      // calculate the shortest path sequence that connects all vertices in combo
      // apply some threshold to select paths that are not too long or too short
    })*/

    
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

  uniqueCombinations(items: number[]) {
    const result: number[][] = [];
  
    for (let r = 1; r <= items.length; r++) {
      this.generateCombinations(items, r, 0, [], result);
    }
  
    return result;
  }
  
  generateCombinations(items: number[], r: number, start: number, current: number[], result: number[][]) {
    if (current.length === r) {
      result.push(current);
      return;
    }
  
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      this.generateCombinations(items, r, i + 1, current, result);
      current.pop();
    }
  }

  async performTurn(game: Game) {
    await this.wait(3000);
    let kept_card = game.keepTrainCarCard(this.id);
    game.emit(game.id);
    game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
    
    await this.wait(3000);
    kept_card = game.keepTrainCarCard(this.id);
    game.emit(game.id);
    game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);

    console.log(this.ticketCards);
    this.ticketCards.forEach(c => {
      console.log(c);
      console.log(game.shortestPath(c.start));
      console.log(game.shortestPath(c.destination));
    })
  }
}