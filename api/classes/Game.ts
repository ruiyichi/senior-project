import { Player } from "./Player";
import { v4 as uuid } from "uuid";
import { randomElementFromArr } from "../utils";
import { NUM_PROPOSED_TICKET_CARDS, NUM_STARTING_TRAIN_CAR_CARDS, TRAIN_CAR_CARD_TYPES, TRAIN_ROUTES, TRAIN_TICKETS } from "../constants";
import { Deck } from "./Deck";
import { Color, Route, TicketCard, TrainCarCard } from "../types";

export class Game {
  id: string;
  trainCarCardDeck: Deck<TrainCarCard>;
  ticketCardDeck: Deck<TicketCard>;
  players: Player[];
  unclaimedRoutes: Route[];
  activePlayer: Player;
  turnTimer: number;
  startTime: number;
  turnStartTime: number;
  faceUpTrainCarCards: TrainCarCard[];
  
  constructor(players: Player[]) {
    this.id = uuid();
    this.trainCarCardDeck = this.initializeTrainCarCardDeck();
    this.ticketCardDeck = this.initializeTicketCardDeck();
    this.players = players;
    this.unclaimedRoutes = TRAIN_ROUTES.map(route => ({ id: uuid(), ...route }));
    this.activePlayer = randomElementFromArr(players);
    this.turnTimer = 0;
    this.startTime = Date.now();
    this.turnStartTime = Date.now();
    this.faceUpTrainCarCards = [] as TrainCarCard[];

    this.dealInitialTrainCarCards();
    this.updateFaceUpTrainCarCards();
  }

  updateFaceUpTrainCarCards() {
    for (let i = this.faceUpTrainCarCards.length; i < 5; i++) {
      const card = this.trainCarCardDeck.deal();
      if (card === undefined) {
        break;
      }
      this.faceUpTrainCarCards.push(card);
    }
  }

  initializeTrainCarCardDeck() {
    const all_cards = TRAIN_CAR_CARD_TYPES.map(type => {
      const cards_of_type = [] as TrainCarCard[];
      for (let i = 0; i < type.numCards; i++) {
        cards_of_type.push({ id: uuid(), ...type });
      }
      return cards_of_type;
    }).flat();

    const deck = new Deck(all_cards);
    deck.shuffle();

    return deck;
  }

  initializeTicketCardDeck() {
    const all_ticket_cards = TRAIN_TICKETS.map(ticket => ({ id: uuid(), ...ticket }));
    
    const deck = new Deck(all_ticket_cards);
    deck.shuffle();
    
    return deck;
  }

  dealInitialTrainCarCards() {
    this.players.forEach(p => {
      for (let i = 0; i < NUM_STARTING_TRAIN_CAR_CARDS; i++) {
        const card = this.trainCarCardDeck.deal();
        if (card) {
          p.trainCarCards.push(card);
        }
      }
    });
  }

  claimRoute(player: Player, route: Route, num_wilds_to_use: number, wild_route_color?: Color) {
    // insufficient train cars
    if (player.numTrainCars < route.numTrainCars) {
      return;
    }

    // no wild route color provided
    if (route.color === Color.Wild && wild_route_color === undefined) {
      return;
    }

    const route_cost = route.numTrainCars;
    let route_color = route.color;

    // if claiming a wild route, set color to supplied route color
    if (route.color === Color.Wild) {
      route_color = wild_route_color as Color;
    }

    // not enough wild cards
    const player_wild_cards = player.trainCarCards.filter(c => c.color === Color.Wild);
    if (player_wild_cards.length < num_wilds_to_use) {
      return;
    }

    // not enough train cars of route color
    const player_cards_of_route_color = player.trainCarCards.filter(c => c.color === route_color);
    if (player_cards_of_route_color.length + num_wilds_to_use < route_cost) {
      return;
    }

    player.routes.push(route);
    this.unclaimedRoutes = this.unclaimedRoutes.filter(r => r.id !== route.id);
  }

  proposeTicketCards() {
    const ticket_cards = [] as TicketCard[];
    for (let i = 0; i < NUM_PROPOSED_TICKET_CARDS; i++) {
      const card = this.ticketCardDeck.deal();
      if (card) {
        ticket_cards.push(card);
      }
    }

    return ticket_cards;
  }
}