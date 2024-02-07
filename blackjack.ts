import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";

interface BlackjackHandProps {
  hit(deck: Deck): void;
  getTotalHand(): number[];
  getTotalHandString(): string;
  getNumericalHand(): number[][];
}

export class BlackjackHand extends Hand implements BlackjackHandProps {
  totalHand = [0, 0];
  numericalHand: number[][] = [[], []];

  getTotalHand(): number[] {
    return this.totalHand;
  }

  getNumericalHand(): number[][] {
    return this.numericalHand;
  }

  getTotalHandString(): string {
    const hand = this.getTotalHand();
    return `${hand[0]}${hand[1] && hand[1] <= 21 ? ` or ${hand[1]}` : ``}`;
  }
  hit(deck: Deck): void {
    const card = deck.pop();
    if (card === undefined) throw new Error("No cards in the deck to draw.");
    this.push(card);
    switch (card.getRank()) {
      case "Ace":
        this.totalHand[1] += 11;
        this.numericalHand[1].push(11);
        if (this.totalHand[1] > 21 && this.totalHand[0] + 11 <= 21) {
          this.totalHand[0] += 11;
          this.numericalHand[0].push(11);
        } else {
          this.totalHand[0] += 1;
          this.numericalHand[0].push(1);
        }
        break;
      case "King":
      case "Queen":
      case "Jack":
        this.totalHand = this.totalHand.map((value) => value + 10);
        this.numericalHand[0].push(10);
        this.numericalHand[1].push(10);
        break;
      default:
        const convertedInt = Number.parseInt(card.getRank());
        this.totalHand = this.totalHand.map((value) => value + convertedInt);
        this.numericalHand[0].push(convertedInt);
        this.numericalHand[1].push(convertedInt);
        break;
    }
  }
}

export class DealerHand extends BlackjackHand {
  hidingCard = true;

  getNumericalHand(): number[][] {
    if (this.hidingCard)
      return [this.numericalHand[0].slice(1), this.numericalHand[1].slice(1)];
    return this.numericalHand;
  }

  showCard(): void {
    this.hidingCard = false;
  }

  getHandToString(): string {
    if (this.hidingCard)
      return `Dealer Showing ${
        this.numericalHand[0][1] !== this.numericalHand[1][1]
          ? `${this.numericalHand[1][1]} or ${this.numericalHand[0][1]}`
          : this.numericalHand[0][1]
      }`;
    return `${this.totalHand[0] !== this.totalHand[1] ? `Showing ${this.totalHand[0]} or ${this.totalHand[1]}` : `Showing ${this.totalHand[0]}`}`
  }
}
