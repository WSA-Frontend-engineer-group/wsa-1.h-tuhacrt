import { ConsoleColor, consoleTrace } from '../utils/consoleTrace.js';
import { Player } from './Player/Player.js';

export enum ExchangeStatus {
  Exchanged = 0,
  canExchange = 1
}

export class Exchange {
  public remainingRounds = 3;

  constructor(private caller: Player, private receiver: Player) {
    this.caller = caller;
    this.receiver = receiver;
    this.exchangeHands();
  }

  public checkRemainingRounds(): void {
    this.remainingRounds -= 1;
    if (this.remainingRounds === 0) {
      this.endExchange();
      return;
    }
    this.getRemainingRounds();
  }

  public endExchange(): void {
    consoleTrace(
      `${this.caller.getName()} exchange with ${this.receiver.getName()} is over.`,
      ConsoleColor.FgYellow
    );
    this.exchangeHands();
    this.caller.exchange = ExchangeStatus.Exchanged;
  }

  public getRemainingRounds(): void {
    consoleTrace(
      `${this.caller.getName()} exchange with ${this.receiver.getName()} remaining ${
        this.remainingRounds
      } Rounds.`,
      ConsoleColor.FgBlue
    );
  }

  public exchangeHands(): void {
    [this.caller.hands, this.receiver.hands] = [this.receiver.hands, this.caller.hands];
  }
}
