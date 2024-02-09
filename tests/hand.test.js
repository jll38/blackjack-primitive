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
  hand.addCard(card);
  expect(hand.getHand().length).toBe(1);
});

test("should return hand", () => {
  hand.addCard(card2);
  expect(hand.getHand()).toEqual([card, card2]);
});

test("should return a string representation of the hand", () => {
  expect(hand.getHandToString()).toBe("Ace-Spades King-Spades ");
});


//Blackjack Hand Tests
test("should throw an error if the deck is empty when attempting to hit", () => {
  const deck = Deck.create();
  deck.clear();

  const player = BlackjackHand.create();
  expect(() => {
    player.hit(deck)
  }).toThrow("No cards in the deck to draw.")
});

test("should return the correct total hand in array", () => {
  const deck = new Deck();
  deck.clear();
  deck.addCard(new PlayingCard("Ace", "Spades"))
  deck.addCard(new PlayingCard("3", "Spades"))
  deck.addCard(new PlayingCard("1", "Spades"))
  const player = new BlackjackHand();
  player.hit(deck);
  expect(player.getTotalHand()).toEqual([1,1])
  player.hit(deck);
  expect(player.getTotalHand()).toEqual([4,4])
  player.hit(deck);
  expect(player.getTotalHand()).toEqual([5,15])
})

test("hitting an Ace should result in two decks incremented by 1 and 11 each", () => {
  const deck = Deck.create();
  deck.clear();
  deck.addCard(new PlayingCard("Ace", "Spades"))
  const player = BlackjackHand.create()
  player.hit(deck)
  expect(player.getTotalHand()).toEqual([1,11])
})

test("hitting a King, Jack, or Queen should result in both decks incremented by 10", () => {
  const deck = Deck.create()
  deck.clear();
  deck.addCard(new PlayingCard("King", "Spades"))
  deck.addCard(new PlayingCard("Jack", "Hearts"))
  deck.addCard(new PlayingCard("Queen", "Diamonds"))
  const player = BlackjackHand.create()
  const player2 = BlackjackHand.create()
  const player3 = BlackjackHand.create()
  player.hit(deck)
  player2.hit(deck)
  player3.hit(deck)
  expect(player.getTotalHand()).toEqual([10,10])
  expect(player2.getTotalHand()).toEqual([10,10])
  expect(player3.getTotalHand()).toEqual([10,10])
})

