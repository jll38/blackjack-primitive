export class PlayingCard {
  readonly rank: string;
  readonly suit: string;

  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
  }

  static create(rank: string, suit: string){
    return new PlayingCard(rank, suit);
  }
}
