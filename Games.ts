import chalk from "./node_modules/chalk/source/index";

import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";
import { DealerHand } from './blackjack';
import { BlackjackHand } from "./blackjack";

const prompt = require("prompt-sync")();

abstract class Game {
  game: string | null = null;
  playerWin = 0;
  dealerWin = 0;

  turn = 0;

  playing = false;

  start(): void {
    /*
    start()
    Starts the selected game, based off of the class which extends this class.
    */
    console.clear();
    console.log("------------------------------");
    console.log(`🃏 Welcome to ${chalk.green("Lechner Casino")} 🃏`);
    console.log("------------------------------");
    console.log(`Your are playing: ${chalk.yellow(this.game)}\n`);

    prompt("Press Enter to continue");

    this.playing = true;

    const { deck, dealer, player } = this.initObjects();
    while (this.playing) {
      this.initiateTurn(deck, dealer, player);
    }
  }

  //Handles each turn and increments the turn count. Overridden by the class that extends
  abstract initiateTurn(deck: Deck, dealer: DealerHand, player: BlackjackHand): void 

  protected abstract initObjects(): any 

  protected abstract update(hand: Hand): void

  endGame(player_win? : boolean): void {
    /*
    endGame()
    Ends the game, displays the winner and increments the win count for them.
     */
    if(player_win === undefined){
      console.log(chalk.green("PUSH"));
    }
    if (player_win) {
      console.log(`${chalk.bold("\nWinner:")} ${chalk.green("Player")}`);
      this.playerWin++;
    } else {
      console.log(`${chalk.bold("\nWinner:")} ${chalk.green("Dealer")}`);
      this.dealerWin++;
    }

    //Prompt user
    console.log("Thanks for playing!\n");
    this.playing = false;
    process.exit();
  }
}

export class Blackjack extends Game {
  game = "Blackjack";

  initiateTurn(deck: Deck, dealer: DealerHand, player: BlackjackHand): void {
    if (this.turn === 0) {
      dealer.hit(deck);
      dealer.hit(deck);

      player.hit(deck);
      player.hit(deck);

    } else {
      const input = this.hitOrStand();
      if (input === "s") {
        const finalVal =
          player.getTotalHand()[1] <= 21
            ? Math.max(...player.getTotalHand())
            : player.getTotalHand()[0];
        let maxDealerHand =
          dealer.getTotalHand()[1] <= 21
            ? Math.max(...dealer.getTotalHand())
            : dealer.getTotalHand()[0];

        console.log(`${player.name} stands at ${chalk.yellow(finalVal)}`);

        while (maxDealerHand < 17) {
          dealer.hit(deck);
          maxDealerHand =
            dealer.getTotalHand()[1] <= 21
              ? Math.max(...dealer.getTotalHand())
              : dealer.getTotalHand()[0];
        }

        if (finalVal > maxDealerHand) {
          this.endGame(true);
        } else if (finalVal === maxDealerHand) {
          this.endGame();
        } else {
          this.endGame(false);
        }
      } else {
        player.hit(deck);
      }
    }

    this.turn++;
  }

  protected hitOrStand() {
    console.log("");
    let response = prompt("Hit or Stand? (h/s): ");
    console.log("");
    switch (response) {
      default:
        console.log(chalk.red("Invalid response. Try again!"));
        response = this.hitOrStand();
        break;
      case "h":
      case "s":
    }
    return response;
  }

  protected checkValue(player: BlackjackHand): void {
    /*
    checkValue()
    Takes in the player who just hit from the deck and their opponent as parameters.
    Checks to see if the player hit a Blackjack or busted.
    */
    if (player.getTotalHand()[0] === 21 || player.getTotalHand()[1] === 21) {
      console.log(
        `${player.name} got ${chalk.green(
          this.turn === 0 ? "Blackjack!" : "21"
        )}`
      );
      this.endGame(true);
    } else
      console.log(
        `${player.name} showing ${chalk.yellow(player.getTotalHandString())}`
      );

    if (player.getTotalHand()[0] > 21) {
      console.log(chalk.red(`${player.name} Bust!`));
      this.endGame(false);
    }
  }

  protected initObjects(): any {
    const deck = new Deck();
    deck.shuffle();
    console.log(chalk.gray("Shuffling deck..."));
    const dealer = DealerHand.create();
    const player = BlackjackHand.create();
    dealer.addObserver(this);
    player.addObserver(this);
    return { deck, dealer, player };
  }

  protected update(player : BlackjackHand): void {
    this.checkValue(player);
  }

}
