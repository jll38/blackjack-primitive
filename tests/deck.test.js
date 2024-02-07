import { Deck } from "../Deck";

const deck = new Deck();

//Test Size and Initialization
test("should contain 52 cards", () => {
  expect(deck.size()).toBe(52);
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
