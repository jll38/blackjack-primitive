import { Hand } from "../Hand";
import { PlayingCard } from "../PlayingCard";

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
    expect(hand.getHand()).toEqual([card,card2])
});

test("should return a string representation of the hand", () => {
    expect(hand.getHandToString()).toBe("Ace-Spades King-Spades ")
})
