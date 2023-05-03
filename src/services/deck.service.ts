import { Deck } from '../classes/Deck.js';
import { DeckEmptyException } from '../exceptions/DeckEmptyException.js';

export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = array;
  const { length } = array;

  for (let currentIndex = length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex]
    ];
  }

  return shuffledArray;
}

export const checkIfDeckIsEmpty = (deck: Deck) => {
  if (deck.length === 0) throw new DeckEmptyException();
};
