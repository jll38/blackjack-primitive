import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";

interface BlackjackHandProps {
  hit(deck: Deck): void;
  getTotalHand(): number[];
  getTotalHandString(): string;
}

export class BlackjackHand extends Hand implements BlackjackHandProps {
  readonly name: string = "Player";
  totalHand: number[] = [0, 0];
  numericalHand: number[][] = [[], []];

  
  //Factory Method
  static create(): BlackjackHand {
    return new BlackjackHand();
  }

  getTotalHand(): number[] {
    return this.totalHand;
  }

  getTotalHandString(): string {
    const hand = this.getTotalHand();
    return `${hand[0]}${
      hand[1] && hand[1] <= 21 && hand[0] !== hand[1] ? ` or ${hand[1]}` : ``
    }`;
  }

  hit(deck: Deck): void {
    const card = deck.draw();
    if (card === undefined) throw new Error("No cards in the deck to draw.");
    this.addCard(card);
    switch (card.rank) {
      case "Ace":
        this.totalHand[1] += 11;
        if (this.totalHand[1] > 21 && this.totalHand[0] + 11 <= 21) {
          this.totalHand[0] += 11;
        } else {
          this.totalHand[0] += 1;
        }
        break;
      case "King":
      case "Queen":
      case "Jack":
        this.totalHand = this.totalHand.map((value) => value + 10);
        break;
      default:
        const convertedInt = Number.parseInt(card.rank);
        this.totalHand = this.totalHand.map((value) => value + convertedInt);
        break;
    }
    console.log(this.name + " hit " + card.rank)
    this.notifyObservers();
  }
}

export class DealerHand extends BlackjackHand {

  static instance: DealerHand;

  private constructor(){
    super();
  }

  static create(): DealerHand { 
    if(!DealerHand.instance){
      DealerHand.instance = new DealerHand();
    }
    return DealerHand.instance;
  }

  name: string = "Dealer";
  hidingCard: boolean = true;

  getHand(): PlayingCard[] {
    return this.hidingCard ? this.cards.slice(1) : this.cards;
  }

  showHand(): void {
    this.hidingCard = false;
  }
}
