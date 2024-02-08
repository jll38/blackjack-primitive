import chalk from "./node_modules/chalk/source/index";

import { Hand } from "./Hand";
import { Deck } from "./Deck";
import { PlayingCard } from "./PlayingCard";
import { DealerHand } from "./blackjack";
import { BlackjackHand } from "./blackjack";

const prompt = require("prompt-sync")();

class Game {
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

  endGame(winner?: BlackjackHand): void {
    /*
    endGame()
    Ends the game, displays the winner and increments the win count for them.
     */
    if (winner) {
      console.log(`${chalk.bold("\nWinner:")} ${chalk.green(winner.name)}`);
      winner.name === "Dealer" ? this.dealerWin++ : this.playerWin++;
    } else {
      console.log(chalk.green("PUSH"));
    }

    //Prompt user
    console.log("Thanks for playing!\n")
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

      this.checkValue(dealer, player);

      player.hit(deck);
      player.hit(deck);

      this.checkValue(player, dealer);
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
          console.log(
            `Dealer hit ${dealer
              .getHand()
              [dealer.getHand().length - 1].getRank()}`
          );
          maxDealerHand =
            dealer.getTotalHand()[1] <= 21
              ? Math.max(...dealer.getTotalHand())
              : dealer.getTotalHand()[0];
          this.checkValue(dealer, player);
        }

        if (finalVal > maxDealerHand) {
          this.endGame(player);
        } else if (finalVal === maxDealerHand) {
          this.endGame();
        } else {
          this.endGame(dealer);
        }
      } else {
        player.hit(deck);
        console.log(
          `${player.name} recieves ${chalk.yellow(
            `${player.getHand()[player.getHand().length - 1].getRank()}`
          )}`
        );
        console.log(this.checkValue(player, dealer));
      }
    }

    this.turn++;
  }

  dealerHitOrSand() {}
  protected hitOrStand() {
    let response = prompt("Hit or Stand? (h/s): ");
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

  protected checkValue(player: BlackjackHand, opponent: BlackjackHand): void {
    /*
    checkValue()
    Takes in the player who just hit from the deck and their opponent as parameters.
    Checks to see if the player hit a Blackjack or busted.
    */
    if (player.getTotalHand()[0] === 21 || player.getTotalHand()[1] === 21) {
      console.log(`${player.name} got ${chalk.green("Blackjack!")}`);
      this.endGame(player);
    } else
      console.log(
        `${player.name} showing ${chalk.yellow(player.getTotalHandString())}`
      );

    if (player.getTotalHand()[0] > 21) {
      console.log(chalk.red(`${player.name} Bust!`));
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
