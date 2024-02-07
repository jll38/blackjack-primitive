import { BlackjackHand, DealerHand } from "./blackjack";
import { Deck } from "./Deck";
const prompt = require("prompt-sync")({ sigint: true });
const win_count = [0, 0]; //[Dealer,Player]
let playing = false;
console.log("\nWelcome to Blackjack 🃏");
prompt("Press any key to begin...");

const deck = new Deck();
deck.shuffle();

const dealer = new DealerHand();
const player = new BlackjackHand();

dealer.hit(deck);
dealer.hit(deck);

console.log("\nDealer's Hand")
console.log(dealer.getHand())
player.hit(deck);
player.hit(deck);

console.log("\nPlayer's Hand");
console.log(player.getHand())

console.log("Player Hit")
player.hit(deck);
console.log(player.getHand());
console.log(player.getTotalHand())