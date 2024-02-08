import chalk from "./node_modules/chalk/source/index";

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
    /*
    start()
    Starts the selected game, based off of the class which extends this class.
    */
    console.clear();
    console.log("------------------------------");
    console.log(`🃏 Welcome to ${chalk.green("Lechner Casino")} 🃏`);
    console.log("------------------------------");
    console.log(`Your are playing: ${chalk.yellow(this.game)}`);

    const { deck, dealer, player } = this.initObjects();
    this.initiateTurn(deck, dealer, player);
  }

  initiateTurn(deck: Deck, dealer: DealerHand, player: BlackjackHand): void {
    /*
    Handles each turn and increments the turn count. Overridden by the class that extends
    */
  }

  protected initObjects(): any {
    /*
    initObjects()
    Initializes the game objects needed for each game, overridden by the class that extends this.
     */
    return null;
  }

  endGame(winner: BlackjackHand): void {
    /*
    endGame()
    Ends the game, displays the winner and increments the win count for them.
     */
    console.log(`Winner: ${winner.name}`);
    winner.name === "Dealer" ? this.dealerWin++ : this.playerWin++;
    console.log("Play again?");
    //Prompt user
    console.log("Thanks for playing!");
    process.exit();
  }
}

export class Blackjack extends Game {
  game = "Blackjack";

  initiateTurn(deck: Deck, dealer: DealerHand, player: BlackjackHand): void {
    if (this.turn === 0) {
      dealer.hit(deck);
      dealer.hit(deck);

      this.checkValue(dealer, player);

      player.hit(deck);
      player.hit(deck);

      this.checkValue(player, dealer);

      console.log("Hit or Stand? (H/S)");
    }

    this.turn++;
  }

  protected checkValue(player: BlackjackHand, opponent: BlackjackHand): void {
    /*
    checkValue()
    Takes in the player who just hit from the deck and their opponent as parameters.
    Checks to see if the player hit a Blackjack or busted.
    */
    if (player.getTotalHand()[0] === 21 || player.getTotalHand()[1] === 21) {
      console.log(`${player.name} got Blackjack!`);
      this.endGame(player);
    } else
      console.log(
        `${player.name} showing ${chalk.yellow(player.getTotalHandString())}`
      );

    if (player.getTotalHand()[0] > 21) {
      console.log(`${player.name} Bust!`);
      this.endGame(opponent);
    }
  }

  protected initObjects(): any {
    const deck = new Deck();
    deck.shuffle();
    console.log(chalk.gray("Shuffling deck..."));
    const dealer = new DealerHand();
    const player = new BlackjackHand();

    return { deck, dealer, player };
  }
}
