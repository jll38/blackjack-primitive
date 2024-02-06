
export class PlayingCard {
  private value: number;
  private color: string;
  private suit: string;

  constructor(value: number, color: string, suit: string) {
    this.value = value;
    this.color = color;
    this.suit = suit;
  }

  getValue() {
    return this.value;
  }

  getColor() {
    return this.color;
  }

  getSuit() {
    return this.color;
  }
  
}
