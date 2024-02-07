import { PlayingCard } from "../PlayingCard";

const card = new PlayingCard("1", "Hearts");

test("Should be about to retrieve rank", () => {
  expect(card.getRank()).toBe("1");
});

test("Should be about to retrieve suit", () => {
    expect(card.getSuit()).toBe("Hearts");
  });
  
