import { PlayingCard } from "./PlayingCard";

interface HandProps {
  addCard(card: PlayingCard): void;
  getHand(): Array<PlayingCard>;
  toString(): string;
  observers: any[];
}

export abstract class Hand implements HandProps {
  cards: Array<PlayingCard> = [];
  observers: any[];

  constructor() {
    this.observers = [];
  }

  addObserver(observer: any) {
    this.observers.push(observer);
  }

  notifyObservers() {
    for (let observer of this.observers) {
      observer.update(this);
    }
  }

  addCard(card: PlayingCard): void {
    this.cards.push(card);
  }

  getHand(): PlayingCard[] {
    return this.cards;
  }

  getHandToString(): string {
    let output: string = "";
    this.cards.map((card) => {
      output += `${card.rank}-${card.suit} `;
    });
    return output;
  }
}
