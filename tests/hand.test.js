import { Hand } from "../Hand";
import { Deck } from "../Deck";
import { PlayingCard } from "../PlayingCard";
import { BlackjackHand, DealerHand } from "../blackjack"

const hand = new Hand();

test("should be empty", () => {
  expect(hand.getHand().length).toBe(0);
});

const card = new PlayingCard("Ace", "Spades");
const card2 = new PlayingCard("King", "Spades");
test("should be able to add a card to the hand", () => {
  hand.push(card);
  expect(hand.getHand().length).toBe(1);
});

test("should return hand", () => {
  hand.push(card2);
  expect(hand.getHand()).toEqual([card, card2]);
});

test("should return a string representation of the hand", () => {
  expect(hand.getHandToString()).toBe("Ace-Spades King-Spades ");
});


//Blackjack Hand Tests
test("should throw an error if the deck is empty when attempting to hit", () => {
  const deck = new Deck();
  deck.clear();
  const player = new BlackjackHand()
  expect(() => {
    player.hit(deck)
  }).toThrow("No cards in the deck to draw.")
});

test("hitting an ace should result in two decks incremented by 1 and 11 each", () => {
  const deck = new Deck();
  deck.clear();
  deck.push(new PlayingCard("Ace", "King"))
  const player = new BlackjackHand()
  player.hit(deck)
  expect(player.getTotalHand()).toEqual([1,11])
})