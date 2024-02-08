import { PlayingCard } from "../PlayingCard";

const card = new PlayingCard("1", "Hearts");

test("Should be about to retrieve rank", () => {
  expect(card.rank).toBe("1");
});

test("Should be about to retrieve suit", () => {
    expect(card.suit).toBe("Hearts");
  });
  
