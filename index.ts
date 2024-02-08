import { BlackjackHand, DealerHand } from "./blackjack";
import { Deck } from "./Deck";
import chalk from "./node_modules/chalk/source/index";
import { Blackjack } from "./Games";

const prompt = require('prompt-sync')();

const BlackjackGame = new Blackjack();
class initScreen {
  
  start(){
    console.clear();
    console.log(chalk.yellow("Select the game you want to play:"));
    console.log("Blackjack");
    console.log(chalk.gray("Ride the Bus"));
    console.log(chalk.gray("Poker"))
    console.log(chalk.gray("Texas Hold Em'"))
    const selection = prompt(``)
    switch (selection) {
      case "Blackjack":
        BlackjackGame.start();
        break;
      default:
        console.log(chalk.red("Invalid selection. Closing program."))
        break;
    }
  }
}

const screen = new initScreen();

screen.start();


