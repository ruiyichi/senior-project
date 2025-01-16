import { Player } from "./Player";
import { v4 as uuid } from "uuid";
import { randomElementFromArr } from "../utils";
import { ACTION, NUM_FACE_UP_TRAIN_CAR_CARDS, NUM_PROPOSED_TICKET_CARDS, NUM_STARTING_TRAIN_CAR_CARDS, TRAIN_CAR_CARD_TYPES, TRAIN_ROUTES, TRAIN_TICKETS } from "../constants";
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
  routes: Route[];
  activePlayerId: string;
  turnTimer: number;
  startTime: number;
  turnStartTime: number;
  activePlayerAction: ACTION;
  activePlayerNumDrawnCards: number;
  activePlayerMaxNumDrawnCards: number;
  faceUpTrainCarCards: TrainCarCard[];
  status: GameStatus;
  
  constructor(players: Player[]) {
    this.id = uuid();
    this.trainCarCardDeck = this.initializeTrainCarCardDeck();
    this.ticketCardDeck = this.initializeTicketCardDeck();
    this.players = players;
    this.routes = TRAIN_ROUTES.map(route => ({ id: uuid(), ...route }));
    this.activePlayerId = randomElementFromArr(players).id;
    this.activePlayerAction = ACTION.NO_ACTION;
    this.activePlayerNumDrawnCards = 0;
    this.activePlayerMaxNumDrawnCards = 2;
    this.turnTimer = 0;
    this.startTime = 0;
    this.turnStartTime = 0;
    this.faceUpTrainCarCards = [] as TrainCarCard[];
    this.status = GameStatus.PENDING;
  }

  updateFaceUpTrainCarCards(replacements?: TrainCarCard[]) {
    if (!replacements) {
      for (let i = this.faceUpTrainCarCards.length; i < NUM_FACE_UP_TRAIN_CAR_CARDS; i++) {
        const card = this.trainCarCardDeck.deal();
        if (card === undefined) break;
        this.faceUpTrainCarCards.push(card);
      }
    } else {
      for (const replacement of replacements) {
        const replacement_idx = this.faceUpTrainCarCards.findIndex(c => c.id === replacement.id);
        if (replacement_idx === -1) continue;

        const card = this.trainCarCardDeck.deal();
        if (card === undefined) break;
        this.faceUpTrainCarCards[replacement_idx] = card;
      }
    }

    while (this.trainCarCardDeck.cards.length > 0 && this.faceUpTrainCarCards.filter(c => c.color === Color.Wild).length >= 3) {
      for (const card of this.trainCarCardDeck.cards) {
        this.trainCarCardDeck.discard(card);
      }
      this.faceUpTrainCarCards = [];
      this.updateFaceUpTrainCarCards();
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

  pointsFromRouteLength(routeLength: number) {
    const map = {
      1: 1,
      2: 2,
      3: 4,
      4: 7,
      5: 10,
      6: 15
    };
    return map[routeLength];
  }

  claimRoute(playerId: string, route_id: string, wild_route_color?: Color) {
    const player = this.getPlayerFromId(playerId);

    if (!player) return;
    if (playerId !== this.activePlayerId) return;

    const route = this.routes.find(r => r.id === route_id);
    if (!route) return;

    if (route.claimed_player_id) return;
    
    if (player.numTrainCars < route.path.length) return;

    // insufficient train cars
    if (player.numTrainCars < route.path.length) return;
    
    // no wild route color provided
    if (route.color === Color.Wild && wild_route_color === undefined) return;

    const route_cost = route.path.length;
    let route_color = route.color;

    // if claiming a wild route, set color to supplied route color
    if (route.color === Color.Wild) {
      route_color = wild_route_color as Color;
    }

    // not enough train cars of route color
    const player_cards_of_route_color = player.trainCarCards.filter(c => c.color === route_color);
    const num_player_wild_cards = player.trainCarCards.filter(c => c.color === Color.Wild).length;
    if (player_cards_of_route_color.length + num_player_wild_cards < route_cost) return;

    const num_wilds_to_use = Math.max(route_cost - player_cards_of_route_color.length, 0);
    const num_player_route_color_cards_to_use = route_cost - num_wilds_to_use;

    for (let i = 0; i < num_wilds_to_use; i++) {
      const idx_to_remove = player.trainCarCards.findIndex(c => c.color === Color.Wild);
      player.trainCarCards.splice(idx_to_remove, 1);
    }

    for (let i = 0; i < num_player_route_color_cards_to_use; i++) {
      const idx_to_remove = player.trainCarCards.findIndex(c => c.color === route_color);
      player.trainCarCards.splice(idx_to_remove, 1);
    }

    player.routes.push(route);
    player.points += this.pointsFromRouteLength(route.path.length);
    player.numTrainCars -= route.path.length;
    route.claimed_player_id = player.id;
    this.nextTurn();
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

  keepTicketCards(player_id: string, ticket_card_ids: string[]) {
    const player = this.getPlayerFromId(player_id);
    if (!player) return;

    const is_active_player_action = this.activePlayerAction === ACTION.DRAW_TICKETS && player_id === this.activePlayerId;
    const min_num_cards = is_active_player_action ? 1 : 2;

    const new_ticket_cards = [] as TicketCard[];

    for (const card_id of ticket_card_ids) {
      const card = player.proposedTicketCards.find(c => c.id === card_id);
      if (card) {
        new_ticket_cards.push(card);
      }
    }

    if (new_ticket_cards.length < min_num_cards) return;
    
    new_ticket_cards.forEach(card => player.ticketCards.push(card));
    for (const card of player.proposedTicketCards) {
      if (!ticket_card_ids.includes(card.id)) {
        this.ticketCardDeck.cards.unshift(card);
      }
    }

    player.proposedTicketCards = [];

    if (is_active_player_action) {
      this.nextTurn();
    }
  }

  keepTrainCarCard(player_id: string, card_id: string | undefined) {
    if (this.activePlayerId !== player_id) return;
    
    const player = this.getPlayerFromId(player_id);
    if (!player) return;

    if (this.activePlayerNumDrawnCards >= this.activePlayerMaxNumDrawnCards) return;

    if (!(this.activePlayerAction === ACTION.NO_ACTION || this.activePlayerAction === ACTION.DRAW_CARDS)) return;

    if (this.activePlayerAction === ACTION.NO_ACTION) {
      this.activePlayerAction = ACTION.DRAW_CARDS;
    }

    if (card_id === undefined) {
      const card = this.trainCarCardDeck.deal();
      if (!card) return;

      player.trainCarCards.push(card);
    } else {
      const card = this.faceUpTrainCarCards.find(c => c.id === card_id);
      if (!card) return;

      if (card.color === Color.Wild) {
        if (this.activePlayerNumDrawnCards > 0) return;
        this.activePlayerMaxNumDrawnCards = 1;
      }

      player.trainCarCards.push(card);
      this.updateFaceUpTrainCarCards([card]);
    }
    this.activePlayerNumDrawnCards += 1;

    if (this.activePlayerNumDrawnCards >= this.activePlayerMaxNumDrawnCards) {
      this.nextTurn();
    }
  }

  actionTicketCards(player_id: string) {
    if (this.activePlayerAction !== ACTION.NO_ACTION) return;
    if (player_id !== this.activePlayerId) return;

    this.activePlayerAction = ACTION.DRAW_TICKETS;
    this.proposeTicketCards(player_id);
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
      routes: this.routes,
      activePlayerId: this.activePlayerId,
      turnTimer: this.turnTimer,
      startTime: this.startTime,
      turnStartTime: this.turnStartTime,
      faceUpTrainCarCards: this.faceUpTrainCarCards,
      status: this.status,
      activePlayerAction: this.activePlayerAction
    };
  }

  nextTurn() {
    this.activePlayerNumDrawnCards = 0;
    this.activePlayerMaxNumDrawnCards = 2;
    this.activePlayerAction = ACTION.NO_ACTION;

    const currentPlayerIdIdx = this.players.findIndex(p => p.id === this.activePlayerId);
    this.activePlayerId = this.players[(currentPlayerIdIdx + 1) % this.players.length].id;
  }
}