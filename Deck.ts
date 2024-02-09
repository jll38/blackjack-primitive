import { PlayingCard } from "./PlayingCard";

interface Stack {
  push(playingCard: PlayingCard): void | null;
  pop(): PlayingCard | null | undefined;
  peek(): Object | null;
  isEmpty(): boolean;
  isFull(): boolean;
  size(): number;
  clear(): void;
}

export class Deck implements Stack {
  private data: Array<PlayingCard> = [];
  private static readonly suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  private static readonly ranks = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  
  constructor(props?: Partial<PlayingCard[]>) {
    if (props && Object.keys(props).length > 0) {
      //If given a custom array/deck of cards
      props.forEach((card) => {
        if (card !== undefined) {
          this.data.push(card);
        }
      });
    } else {
      //Default
      Deck.suits.forEach((suit) => {
        Deck.ranks.forEach((rank) => {
          const card = new PlayingCard(rank, suit);
          this.data.push(card);
        });
      });
    }
  }

  //Factory Method
  static create(): Deck {
    return new Deck();
  }
  
  push(card: PlayingCard) {
    if (this.isFull()) return null;
    this.data.push(card);
  }

  pop(): any {
    return this.data.pop();
  }

  isFull() {
    return this.data.length === 52 ? true : false;
  }

  peek() {
    if(this.data.length === 0) throw new Error("No cards available.")
    let card = this.data[this.data.length - 1];
    return card;
  }
  isEmpty(): boolean {
    return this.data.length == 0 ? true : false;
  }
  size(): number {
    return this.data.length;
  }

  clear(): void {
    this.data = [];
  }

  shuffle(): void {
    if(this.data.length < 2) throw new Error("Too little cards to shuffle.")
    for (let i = this.data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
  }
}
