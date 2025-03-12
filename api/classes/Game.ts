import { Player } from "./Player";
import { v4 as uuid } from "uuid";
import { randomElementFromArr } from "../utils";
import { ACTION, NUM_FACE_UP_TRAIN_CAR_CARDS, NUM_PROPOSED_TICKET_CARDS, NUM_STARTING_TRAIN_CAR_CARDS, ROUTE_LENGTH_TO_POINTS, TRAIN_CAR_CARD_TYPES, TRAIN_ROUTES, TRAIN_TICKETS } from "../constants";
import { Deck } from "./Deck";
import { Color, Route, TicketCard, TrainCarCard } from "../types";
import { Agent } from "./Agent";

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
  lastRoundPlayerId: null | string;
  standings: string[];
  emit: (game_id: string) => void;
  emitOnOtherPlayerKeepTrainCarCard: Function;
  
  constructor(players: Player[], emit: (game_id: string) => void, emitOnOtherPlayerKeepTrainCarCard: Function) {
    this.id = uuid();
    this.trainCarCardDeck = this.initializeTrainCarCardDeck();
    this.ticketCardDeck = this.initializeTicketCardDeck();
    this.players = players;
    this.routes = TRAIN_ROUTES.map(route => ({ ...route, id: uuid(), disabled: false }));
    this.activePlayerId = randomElementFromArr(players).id;
    this.activePlayerAction = ACTION.NO_ACTION;
    this.activePlayerNumDrawnCards = 0;
    this.activePlayerMaxNumDrawnCards = 2;
    this.turnTimer = 0;
    this.startTime = 0;
    this.turnStartTime = 0;
    this.faceUpTrainCarCards = [] as TrainCarCard[];
    this.status = GameStatus.PENDING;
    this.lastRoundPlayerId = null;
    this.standings = [];
    this.emit = emit;
    this.emitOnOtherPlayerKeepTrainCarCard = emitOnOtherPlayerKeepTrainCarCard;
  }

  updateFaceUpTrainCarCards(replacements?: TrainCarCard[]) {
    if (this.status === GameStatus.COMPLETE) return;
    if (!replacements) {
      for (let i = this.faceUpTrainCarCards.length; i < NUM_FACE_UP_TRAIN_CAR_CARDS; i++) {
        const card = this.trainCarCardDeck.deal();
        if (card === null) break;
        this.faceUpTrainCarCards.push(card);
      }
    } else {
      for (const replacement of replacements) {
        const replacement_idx = this.faceUpTrainCarCards.findIndex(c => c.id === replacement.id);
        if (replacement_idx === -1) continue;

        const card = this.trainCarCardDeck.deal();
        if (card === null) break;
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
        cards_of_type.push({ id: uuid(), color: type.color });
      }
      return cards_of_type;
    }).flat();

    const deck = new Deck(all_cards);
    deck.shuffle();

    return deck;
  }

  initializeTicketCardDeck() {
    const all_ticket_cards = TRAIN_TICKETS.map(ticket => ({ id: uuid(), complete: false, ...ticket }));
    
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
    return ROUTE_LENGTH_TO_POINTS[routeLength];
  }

  claimRoute(route_id: string, wild_route_color?: Color) {
    if (this.status === GameStatus.COMPLETE) {
      console.log('game is complete');
      return;
    }
    const player = this.getPlayerFromId(this.activePlayerId);

    if (!player) {
      console.log('no player');
      return;
    }
    const route = this.routes.find(r => r.id === route_id);
    if (!route) {
      console.log('no route');
      return;
    }
    if (route.claimed_player_id || route.disabled) {
      console.log('route already claimed or disabled')
      return;
    }
    // insufficient train cars
    if (player.numTrainCars < route.path.length) {
      console.log('not enough train cars')
      return;
    }
    
    // no wild route color provided
    if (route.color === Color.Wild && wild_route_color === undefined) {
      console.log('no wild route color')
      return;
    }
    const route_cost = route.path.length;
    let route_color = route.color;

    // if claiming a wild route, set color to supplied route color
    if (route.color === Color.Wild) {
      route_color = wild_route_color as Color;
    }

    // not enough train cars of route color
    const player_cards_of_route_color = player.trainCarCards.filter(c => c.color === route_color);
    const num_player_wild_cards = player.trainCarCards.filter(c => c.color === Color.Wild).length;
    if (player_cards_of_route_color.length + num_player_wild_cards < route_cost) {
      console.log('not enough train cars')
      return;
    }
    const num_wilds_to_use = Math.max(route_cost - player_cards_of_route_color.length, 0);
    const num_player_route_color_cards_to_use = route_cost - num_wilds_to_use;

    const removed_cards = [] as TrainCarCard[];
    for (let i = 0; i < num_wilds_to_use; i++) {
      const idx_to_remove = player.trainCarCards.findIndex(c => c.color === Color.Wild);
      removed_cards.push(player.trainCarCards[idx_to_remove]);
      player.trainCarCards.splice(idx_to_remove, 1);
    }

    for (let i = 0; i < num_player_route_color_cards_to_use; i++) {
      const idx_to_remove = player.trainCarCards.findIndex(c => c.color === route_color);
      removed_cards.push(player.trainCarCards[idx_to_remove]);
      player.trainCarCards.splice(idx_to_remove, 1);
    }

    removed_cards.forEach(c => this.trainCarCardDeck.discard(c));
    player.routes.push(route);
    player.points += this.pointsFromRouteLength(route.path.length);
    player.numTrainCars -= route.path.length;
    player.routeGraph.addRoute(route.start, route.destination);
    player.ticketCards.filter(c => !c.complete).forEach(c => {
      if (player.routeGraph.hasPath(c.start, c.destination)) {
        c.complete = true;
      }
    });
    route.claimed_player_id = player.id;
    
    if (this.players.length < 4) {
      const duplicate_route = this.routes.find(r => route.id !== r.id && (r.start === route.start && r.destination === route.destination) || (route.destination === r.start && route.start === r.destination));
      if (duplicate_route) {
        duplicate_route.disabled = true;
      }
    }
    
    this.nextTurn();

    if (this.lastRoundPlayerId === null && player.numTrainCars <= 2) {
      this.lastRoundPlayerId = player.id;
    }
  }

  proposeTicketCards(player_id: string) {
    if (this.status === GameStatus.COMPLETE) return;

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

  isInitialTicketSelection() {
    return this.players.some(p => p.ticketCards.length === 0);
  }

  keepTicketCards(player_id: string, ticket_card_ids: string[]) {
    if (this.status === GameStatus.COMPLETE) return;
    
    const player = this.getPlayerFromId(player_id);
    if (!player) return;

    const is_initial_ticket_selection = this.isInitialTicketSelection();
    const min_num_cards_to_keep = is_initial_ticket_selection ? 2 : 1;

    const new_ticket_cards = [] as TicketCard[];

    for (const card_id of ticket_card_ids) {
      const card = player.proposedTicketCards.find(c => c.id === card_id);
      if (card) {
        new_ticket_cards.push(card);
      }
    }

    if (new_ticket_cards.length < min_num_cards_to_keep) return;
    
    new_ticket_cards.forEach(card => player.ticketCards.push(card));
    for (const card of player.proposedTicketCards) {
      if (!ticket_card_ids.includes(card.id)) {
        this.ticketCardDeck.cards.unshift(card);
      }
    }

    player.proposedTicketCards = [];

    if (!is_initial_ticket_selection) {
      this.nextTurn();
    }

    if (!this.isInitialTicketSelection()) {
      this.performBotActions();
    }
  }

  keepTrainCarCard(player_id: string, card_id?: string | undefined) {
    let res: null | TrainCarCard = null;

    if (this.status === GameStatus.COMPLETE) return res;
    if (this.activePlayerId !== player_id) return res;
    
    const player = this.getPlayerFromId(player_id);
    if (!player) return res;

    if (this.activePlayerNumDrawnCards >= this.activePlayerMaxNumDrawnCards) return res;

    if (!(this.activePlayerAction === ACTION.NO_ACTION || this.activePlayerAction === ACTION.DRAW_CARDS)) return res;

    if (this.activePlayerAction === ACTION.NO_ACTION) {
      this.activePlayerAction = ACTION.DRAW_CARDS;
    }

    if (card_id === undefined) {
      const card = this.trainCarCardDeck.deal();
      res = card;
      if (!card) return res;

      player.trainCarCards.push(card);
    } else {
      const card = this.faceUpTrainCarCards.find(c => c.id === card_id);
      if (!card) return res;

      if (card.color === Color.Wild) {
        if (this.activePlayerNumDrawnCards > 0) return res;
        this.activePlayerMaxNumDrawnCards = 1;
      }

      res = card;
      player.trainCarCards.push(card);
      this.updateFaceUpTrainCarCards([card]);
    }
    this.activePlayerNumDrawnCards += 1;

    if (this.activePlayerNumDrawnCards >= this.activePlayerMaxNumDrawnCards) {
      this.nextTurn();
    }

    return res;
  }

  actionTicketCards(player_id: string) {
    if (this.status === GameStatus.COMPLETE) return;
    if (this.activePlayerAction !== ACTION.NO_ACTION) return;
    if (player_id !== this.activePlayerId) return;

    this.activePlayerAction = ACTION.DRAW_TICKETS;
    this.proposeTicketCards(player_id);
  }

  async startGame() {
    if (this.status === GameStatus.COMPLETE) return;

    this.status = GameStatus.IN_PROGRESS;
    this.dealInitialTrainCarCards();
    this.updateFaceUpTrainCarCards();

    this.players.forEach(p => this.proposeTicketCards(p.id));

    this.emit(this.id);

    for (const player of this.players.filter(p => p.type === 'Agent')) {
      await (player as Agent).selectTicketCards(this);
    }

    this.emit(this.id);
  }

  getSanitizedGame() {
    return {
      id: this.id,
      numTrainCarCards: this.trainCarCardDeck.cards.length,
      numTicketCards: this.ticketCardDeck.cards.length,
      players: this.players.map(p => p.getSanitizedPlayerForGame()),
      routes: this.routes,
      activePlayerId: this.activePlayerId,
      turnTimer: this.turnTimer,
      startTime: this.startTime,
      turnStartTime: this.turnStartTime,
      faceUpTrainCarCards: this.faceUpTrainCarCards,
      status: this.status,
      activePlayerAction: this.activePlayerAction,
      lastRoundPlayerId: this.lastRoundPlayerId,
      standings: this.standings
    };
  }

  gameEnd() {
    this.players.forEach(p => {
      p.ticketCards.forEach(ticket_card => {
        if (ticket_card.complete) {
          p.points += ticket_card.points;
        } else {
          p.points -= ticket_card.points;
        }
      });
    });

    const player_id_to_longest_path_length = this.players.reduce((res, player) => {
      res[player.id] = player.routeGraph.longestPathLength();
      return res;
    }, {} as Record<string, number>);

    const longest_path_length = Math.max(...Object.values(player_id_to_longest_path_length));
    this.players.forEach(p => {
      if (player_id_to_longest_path_length[p.id] === longest_path_length) {
        p.points += 10;
        p.longestContinuousPath = true;
      }
    });

    const player_ids = this.players.map(p => p.id);
    this.standings = player_ids.sort((a, b) => {
      const player_a = this.players.find(p => p.id === a) as Player;
      const player_b = this.players.find(p => p.id === b) as Player;
  
      if (player_b.points !== player_a.points) {
        return player_b.points - player_a.points;
      }
  
      const num_completed_tickets_a = player_a.ticketCards.filter(c => c.complete).length;
      const num_completed_tickets_b = player_b.ticketCards.filter(c => c.complete).length;
  
      if (num_completed_tickets_a !== num_completed_tickets_b) {
          return num_completed_tickets_b - num_completed_tickets_a;
      }
  
      return Number(player_b.longestContinuousPath) - Number(player_a.longestContinuousPath);
    });

    this.status = GameStatus.COMPLETE;
  }

  async nextTurn() {
    if (this.status === GameStatus.COMPLETE) return;
    if (this.lastRoundPlayerId === this.activePlayerId) {
      this.gameEnd();
      return;
    }

    this.activePlayerNumDrawnCards = 0;
    this.activePlayerMaxNumDrawnCards = 2;
    this.activePlayerAction = ACTION.NO_ACTION;

    const currentPlayerIdIdx = this.players.findIndex(p => p.id === this.activePlayerId);
    this.activePlayerId = this.players[(currentPlayerIdIdx + 1) % this.players.length].id;

    await this.performBotActions();
  }

  async performBotActions() {
    const player = this.getPlayerFromId(this.activePlayerId);
    if (!player) return;

    if (player.type === 'Agent') {
      console.log('perform turn');
      await (player as Agent).performTurn(this);
    }
  }
}