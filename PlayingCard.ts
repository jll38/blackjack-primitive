export class PlayingCard {
  private value: string;
  private suit: string;

  constructor(value: string, suit: string) {
    this.value = value;
    this.suit = suit;
  }

  getValue() {
    return this.value;
  }

  getSuit() {
    return this.suit;
  }
}
