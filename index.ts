import { BlackjackHand, DealerHand } from "./blackjack";
import { Deck } from "./Deck";
const prompt = require("prompt-sync")({ sigint: true });
const win_count = [0, 0]; //[Dealer,Player]
let playing = false;

