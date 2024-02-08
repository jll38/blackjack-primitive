import { Deck } from "../Deck";
import { PlayingCard } from "../PlayingCard";

//Test Size and Initialization
test("should contain 52 cards", () => {
  const deck = new Deck();
  expect(deck.size()).toBe(52);
});

//Test Size and Initialization
test("Custom Deck should contain 3 cards", () => {
  const customDeck = new Deck([
    new PlayingCard("King", "Spades"),
    new PlayingCard("Ace", "Spades"),
    new PlayingCard("4", "Spades"),
  ]);
  expect(customDeck.size()).toBe(3);
});

test("deck should be full", () => {
  const deck = new Deck();
  expect(deck.isFull()).toBe(true);
});

test("should return proper empty boolean", () => {
  const deck = new Deck();
  expect(deck.isEmpty()).toBe(false);
  deck.clear()
  expect(deck.isEmpty()).toBe(true);
  deck.push(new PlayingCard("6", "Clubs"))
  expect(deck.isEmpty()).toBe(false);
})

test("should be able to peek a card", () => {
  const deck = new Deck();
  expect(typeof deck.peek()).toBe("object");
});

test("should throw empty deck error", () => {
  const deck = new Deck();
  deck.clear();
  expect(() => {
    deck.peek();
  }).toThrow("No cards available.");
});

test("should throw empty deck error", () => {
  const deck = new Deck();
  deck.clear();
  expect(() => {
    deck.shuffle();
  }).toThrow("Too little cards to shuffle.");
});

test("should be able to push a card to the deck", () => {
  const deck = new Deck();
  const card = new PlayingCard("5", "Hearts");
  deck.clear();
  deck.push(card);
  expect(deck.peek()).toEqual(card);
});

test("should draw top card from the deck", () => {
  const deck = new Deck();
  const topCard = deck.peek();
  const popped = deck.pop();
  expect(typeof popped).toBe("object");
  expect(topCard).toEqual(popped);
  expect(deck.size()).toBe(51);
});

test("deck should NOT be full", () => {
  const deck = new Deck();
  deck.clear();
  expect(deck.isFull()).toBe(false);
});
