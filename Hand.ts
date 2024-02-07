import { PlayingCard } from "./PlayingCard";

interface HandProps {
  push(card: PlayingCard): void;
  getHand(): Array<PlayingCard>;
  toString(): string;
}

export class Hand implements HandProps {
cards: Array<PlayingCard> = [];

  push(card: PlayingCard): void {
    this.cards.push(card);
  }

  getHand(): PlayingCard[] {
    return this.cards;
  }

  getHandToString(): string {
    let output : string= "";
    this.cards.map((card) => {
      output += `${card.getRank()}-${card.getSuit()} `;
    });
    return output;
  }
}
