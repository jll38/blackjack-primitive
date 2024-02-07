import { Hand } from "./Hand";
import { Deck } from "./Deck";

interface BlackjackHandProps {
  hit(deck: Deck): void;
  getTotalHand(): number[];
}

export class BlackjackHand extends Hand implements BlackjackHandProps {
  getTotalHand(): number[] {
    let arr = [0];
    console.log(this.cards);
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      console.log(card.getRank());
      switch (card.getRank()) {
        case "Ace":
          arr[0] += 1;
          if (arr.length === 1) {
            arr.push(arr[0] + 11);
            break;
          }
          arr[1] += 11;
        case "King":
        case "Queen":
        case "Jack":
          arr = arr.map((value) => value + 10);
          break;
        default:
          arr = arr.map((value) => value + Number.parseInt(card.getRank()));
          break;
      }
    }
    return arr;
  }

  hit(deck: Deck): void {
      this.push(deck.pop())
  }
}