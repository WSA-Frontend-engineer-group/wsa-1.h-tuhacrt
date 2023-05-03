export enum Rank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A'
}

export enum Suit {
  CLUB = '\u2663',
  DIAMOND = '\u2666',
  HEART = '\u2665',
  SPADE = '\u2660'
}

export const RankToPoint = Object.freeze({
  [Rank.TWO]: 20,
  [Rank.THREE]: 30,
  [Rank.FOUR]: 40,
  [Rank.FIVE]: 50,
  [Rank.SIX]: 60,
  [Rank.SEVEN]: 70,
  [Rank.EIGHT]: 80,
  [Rank.NINE]: 90,
  [Rank.TEN]: 100,
  [Rank.JACK]: 110,
  [Rank.QUEEN]: 120,
  [Rank.KING]: 130,
  [Rank.ACE]: 140
});

export const SuitToPoint = Object.freeze({
  [Suit.CLUB]: 0,
  [Suit.DIAMOND]: 1,
  [Suit.HEART]: 2,
  [Suit.SPADE]: 3
});

export class Card {
  constructor(private readonly cardRank: Rank, private readonly cardSuit: Suit) {}

  public toString(): string {
    return ` ${this.cardSuit} ${this.cardRank}`;
  }

  public toPoint(): number {
    return RankToPoint[this.cardRank] + SuitToPoint[this.cardSuit];
  }
}
