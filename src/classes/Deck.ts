import { Card, Rank, Suit } from './Card.js';
import { checkIfDeckIsEmpty, shuffle } from '../services/deck.service.js';
import { InvalidOperationException } from '../exceptions/InvalidOperationException.js';

export class Deck extends Array<Card> {
  public initializeDeck(): void {
    const ranks = Object.values(Rank);
    const suits = Object.values(Suit);
    this.removeCardsFromDeck();
    ranks.map((rank) => suits.map((suit) => this.addCardToDeck(new Card(rank, suit))));
  }

  public addCardToDeck(card: Card): void {
    this.push(card);
  }

  public removeCardsFromDeck(): void {
    this.length = 0;
  }

  public shuffleDeck(times = 5): void {
    for (let i = 0; i < times; i += 1) {
      shuffle(this);
    }
  }

  public drawCardFromDeck(): Card {
    checkIfDeckIsEmpty(this);

    const currentCard = this.pop();
    if (!currentCard) throw new InvalidOperationException();

    return currentCard;
  }
}
