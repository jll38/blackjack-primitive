import { PlayingCard } from "./PlayingCard";

interface HandProps {
  addCard(card: PlayingCard): void;
  getHand(): Array<PlayingCard>;
  toString(): string;
}

export abstract class Hand implements HandProps {
cards: Array<PlayingCard> = [];

  addCard(card: PlayingCard): void {
    this.cards.push(card);
  }

  getHand(): PlayingCard[] {
    return this.cards;
  }

  getHandToString(): string {
    let output : string= "";
    this.cards.map((card) => {
      output += `${card.rank}-${card.suit} `;
    });
    return output;
  }
}
