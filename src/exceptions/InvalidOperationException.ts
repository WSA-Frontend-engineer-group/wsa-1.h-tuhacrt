export class InvalidOperationException extends Error {
  constructor(message = 'Invalid operation!') {
    super(message);
    this.name = 'InvalidOperationException';
  }
}
