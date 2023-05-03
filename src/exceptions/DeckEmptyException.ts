export class DeckEmptyException extends Error {
  constructor(message = 'The deck is empty, the pop() is not available') {
    super(message);
    this.name = 'DeckEmptyException';
  }
}
