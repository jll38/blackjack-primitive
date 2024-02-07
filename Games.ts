import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";
import { DealerHand } from "./blackjack";
import { BlackjackHand } from "./blackjack";

class Game {
  game: string | null = null;
  playerWin = 0;
  dealerWin = 0;

  turn = 0;

  start(): void {
    console.clear();
    console.log("------------------------------");
    console.log("🃏 Welcome to Lechner Casino 🃏");
    console.log("------------------------------");
    console.log(`Your are playing: ${this.game}`);

    const { cards, dealer, player } = this.initObjects();
    this.initiateTurn(cards, dealer, player);
  }
  initiateTurn(cards: Deck, dealer: DealerHand, player: BlackjackHand): void {}

  protected initObjects(): any {
    return null;
  }
}

export class Blackjack extends Game {
  game = "Blackjack";

  initiateTurn(cards: Deck, dealer: DealerHand, player: BlackjackHand): void {
    if (this.turn === 0) {
        dealer.hit(cards);
        dealer.hit(cards);
        console.log(`Dealer showing ${dealer.getTotalHandString}`)
    }

    this.turn++;
  }

  protected initObjects(): any {
    const deck = new Deck();
    deck.shuffle();
    const dealer = new DealerHand();
    const player = new BlackjackHand();
    return { deck, dealer, player };
  }
}
