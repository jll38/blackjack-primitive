import { Deck } from "../Deck";
import { PlayingCard } from "../PlayingCard";

const deck = new Deck();
const customDeck = new Deck([
  new PlayingCard("2", "Diamond"),
  new PlayingCard("5", "Heart"),
  new PlayingCard("King", "Diamond"),
]);

//Test Size and Initialization
test("should contain 52 cards", () => {
  expect(deck.size()).toBe(52);
});

//Test Size and Initialization
test("Custom Deck should contain 3 cards", () => {
  expect(customDeck.size()).toBe(3);
});

test("full deck check (True Condition)", () => {
  expect(deck.isFull()).toBe(true);
});

test("should be able to peek a card", () => {
  expect(typeof deck.peek()).toBe("object");
});

//Draw Card Test
test("should draw top card from the deck", () => {
  const topCard = deck.peek();
  const popped = deck.pop();
  expect(typeof popped).toBe("object");
  expect(topCard).toEqual(popped);
  expect(deck.size()).toBe(51);
});

test("full deck check (False Condition)", () => {
  expect(deck.isFull()).toBe(false);
});
