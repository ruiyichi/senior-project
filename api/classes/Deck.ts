export class Deck<T> {
  cards: T[];
  discards: T[];

  constructor(cards: T[]) {
    this.cards = cards;
    this.discards = [];
  }

  shuffle() {
    let idx = this.cards.length;

    while (idx != 0) {
      const randomIndex = Math.floor(Math.random() * idx);
      idx--;

      [this.cards[idx], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[idx]];
    }
  }

  deal() {
    let card_to_return: null | T = null;
    
    if (this.cards.length > 0) {
      card_to_return = this.cards.pop() ?? null;
    }

    if (this.cards.length === 0 && this.discards.length > 0) {
      this.cards = this.discards;
      this.shuffle();
      this.discards = [];
      if (!card_to_return) {
        return this.cards.pop() ?? null
      }
    }

    return card_to_return;
  }

  discard(card: T) {
    this.discards.push(card);
  }
}