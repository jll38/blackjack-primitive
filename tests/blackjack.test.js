import { Deck } from "../Deck";
import { BlackjackHand } from "../blackjack";

const deck = new Deck();
const player = new BlackjackHand();

test("hit should add a new card to the deck", () => {
    player.hit(deck)
    expect(player.getHand().length).toBe(1)
})