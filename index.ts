import { BlackjackHand } from "./blackjack";
import { Deck } from "./Deck";
const prompt = require("prompt-sync")({ sigint: true });

let playing = false;
console.log("Welcome to Blackjack 🃏");
prompt("Press any key to begin...");
playing = true;

const deck = new Deck();

