import { Deck } from "../Deck";

const deck = new Deck();

//Test Size and Initialization
test("should contain 52 cards", () => {
  expect(deck.size()).toBe(52);
});

test("should ")