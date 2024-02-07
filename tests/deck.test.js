import { Deck } from "../Deck";

const deck = new Deck();

test("should contain 52 cards", () => {
  expect(deck.size()).toBe(52);
});
