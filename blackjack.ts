import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";

interface BlackjackHandProps {
  hit(deck: Deck): void;
  stand(deck: Deck): void;
  getTotalHand(): number[];
}

export class BlackjackHand extends Hand {
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
}

interface DealerHandProps {
  dealCard(deck: Deck, target: DealerHand | PlayerHand): void;
}

export class DealerHand extends Hand implements DealerHandProps {
  dealCard(deck: Deck, target: DealerHand | PlayerHand): void {}
}

export class PlayerHand extends Hand {}
