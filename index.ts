import { BlackjackHand, DealerHand } from "./blackjack";
import { Deck } from "./Deck";
const prompt = require("prompt-sync")({ sigint: true });
const win_count = [0, 0]; //[Dealer,Player]
let playing = false;
console.log("Welcome to Blackjack 🃏");
prompt("Press any key to begin...");
playing = true;

const deck = new Deck();
const dealer = new DealerHand();
const player = new BlackjackHand();

while (playing) {
  //Deal Initial Cards
  dealer.hit(deck);
  player.hit(deck);
  dealer.hit(deck);
  player.hit(deck);

  //Display Cards
  console.log(dealer.getHandToString());
  console.log(player.getHandToString());

  //Player Continue
  var continueHit = prompt("Hit or Stand? (y/n)");
  while (continueHit === "y") {
    player.hit(deck);
    console.log(player.getHandToString());
    continueHit = prompt("Hit or Stand? (y/n)");
  }

  dealer.showCard();
  dealer.getHandToString();
}
