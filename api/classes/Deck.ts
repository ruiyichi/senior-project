class Deck<T> {
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
    if (this.cards.length > 0) {
      return this.cards.pop();
    }

    if (this.discards.length > 0) {
      this.cards = this.discards;
      this.shuffle();
      this.discards = [];
      return this.cards.pop()
    }

    return undefined;
  }

  discard(card: T) {
    this.discards.push(card);
  }
}