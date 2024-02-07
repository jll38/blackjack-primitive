import { Deck } from "../Deck";
import { BlackjackHand } from "../blackjack";
import { PlayingCard } from "../PlayingCard";

const deck = new Deck();
const player = new BlackjackHand();

test("hit should add a new card to the deck", () => {
  player.hit(deck);
  expect(player.getHand().length).toBe(1);
});

test("should throw error if attempting to hit on an empty deck", () => {
  deck.clear();
  expect(() => {
    player.hit(deck);
  }).toThrow("No cards in the deck to draw.");
});

const aceDeck = new Deck([
  new PlayingCard("Ace", "Clubs"),
  new PlayingCard("Ace", "Clubs"),
]);

const player2 = new BlackjackHand();

test("should display two possible hand values", () => {
  player2.hit(aceDeck);
  player2.hit(aceDeck);
  const totalHand = player2.getTotalHand();
  expect(totalHand[1] - totalHand[0]).toBe(10);
});
