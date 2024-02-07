import { BlackjackHand } from "./blackjack";
import { Deck } from "./Deck";
const prompt = require("prompt-sync")({ sigint: true });
const win_count = [0, 0]; //[Dealer,Player]
let playing = false;
console.log("Welcome to Blackjack 🃏");
prompt("Press any key to begin...");
playing = true;

const deck = new Deck();
const dealer = new BlackjackHand();
const player = new BlackjackHand();
