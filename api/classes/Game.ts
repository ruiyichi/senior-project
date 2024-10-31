import { Player } from "./Player";
import { v4 as uuid } from "uuid";
import { randomElementFromArr } from "../utils";
import { NUM_FACE_UP_TRAIN_CAR_CARDS, NUM_PROPOSED_TICKET_CARDS, NUM_STARTING_TRAIN_CAR_CARDS, TRAIN_CAR_CARD_TYPES, TRAIN_ROUTES, TRAIN_TICKETS } from "../constants";
import { Deck } from "./Deck";
import { Color, Route, TicketCard, TrainCarCard } from "../types";

export enum GameStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETE
};

export class Game {
  id: string;
  trainCarCardDeck: Deck<TrainCarCard>;
  ticketCardDeck: Deck<TicketCard>;
  players: Player[];
  unclaimedRoutes: Route[];
  activePlayerId: string;
  turnTimer: number;
  startTime: number;
  turnStartTime: number;
  faceUpTrainCarCards: TrainCarCard[];
  status: GameStatus;
  
  constructor(players: Player[]) {
    this.id = uuid();
    this.trainCarCardDeck = this.initializeTrainCarCardDeck();
    this.ticketCardDeck = this.initializeTicketCardDeck();
    this.players = players;
    this.unclaimedRoutes = TRAIN_ROUTES.map(route => ({ id: uuid(), ...route }));
    this.activePlayerId = randomElementFromArr(players).id;
    this.turnTimer = 0;
    this.startTime = 0;
    this.turnStartTime = 0;
    this.faceUpTrainCarCards = [] as TrainCarCard[];
    this.status = GameStatus.PENDING;
  }

  endActivePlayerTurn() {
    // set the next player to be the active player
    let activePlayerIdx = this.players.findIndex(p => p.id === this.activePlayerId);

    if (activePlayerIdx === -1) return;

    activePlayerIdx += 1;
    activePlayerIdx %= this.players.length;

    this.activePlayerId = this.players[activePlayerIdx].id;
  }

  updateFaceUpTrainCarCards() {
    for (let i = this.faceUpTrainCarCards.length; i < NUM_FACE_UP_TRAIN_CAR_CARDS; i++) {
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
        cards_of_type.push({ id: uuid(), type: type.type, color: type.color });
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

  getPlayerFromId(playerId: string) {
    return this.players.find(p => p.id === playerId);
  }

  claimRoute(playerId: string, route: Route, num_wilds_to_use: number, wild_route_color?: Color) {
    const player = this.getPlayerFromId(playerId);

    if (!player) return;
    if (playerId !== this.activePlayerId) return;

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

  claimFaceUpTrainCarCard(playerId: string, cardId: string) {
    const player = this.getPlayerFromId(playerId);

    if (!player) return;
    if (playerId !== this.activePlayerId) return;
    
    const card = this.faceUpTrainCarCards.find(c => c.id === cardId);
    if (!card) return;

    player.trainCarCards.push(card);
    this.faceUpTrainCarCards = this.faceUpTrainCarCards.filter(c => c.id !== cardId);
  }

  proposeTicketCards(player_id: string) {
    const player = this.getPlayerFromId(player_id);
    if (!player) return;

    const ticket_cards = [] as TicketCard[];
    for (let i = 0; i < NUM_PROPOSED_TICKET_CARDS; i++) {
      const card = this.ticketCardDeck.deal();
      if (card) {
        ticket_cards.push(card);
      }
    }

    player.proposedTicketCards = ticket_cards;
  }

  keepTicketCards(player_id: string, ticket_cards: TicketCard[]) {
    const player = this.getPlayerFromId(player_id);
    if (!player) return;

    for (const card of ticket_cards) {
      if (player.proposedTicketCards.find(c => c.id === card.id)) {
        player.ticketCards.push(card);
      }
    }
  }

  startGame() {
    this.status = GameStatus.IN_PROGRESS;
    this.dealInitialTrainCarCards();
    this.updateFaceUpTrainCarCards();

    this.players.forEach(p => this.proposeTicketCards(p.id));
  }

  getSanitizedGame() {
    return {
      id: this.id,
      numTrainCarCards: this.trainCarCardDeck.cards.length,
      numTicketCards: this.ticketCardDeck.cards.length,
      players: this.players.map(p => p.getSanitizedPlayer()),
      unclaimedRoutes: this.unclaimedRoutes,
      activePlayerId: this.activePlayerId,
      turnTimer: this.turnTimer,
      startTime: this.startTime,
      turnStartTime: this.turnStartTime,
      faceUpTrainCarCards: this.faceUpTrainCarCards,
      status: this.status
    };
  }
}