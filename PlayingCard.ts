export class PlayingCard {
  private rank: string;
  private suit: string;

  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }
}
