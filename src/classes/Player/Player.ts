import { InvalidOperationException } from '../../exceptions/InvalidOperationException.js';
import {
  checkIfReceiverShowCardAlready,
  deleteCardFromHand,
  exchangeWithReceiver
} from '../../services/player.service.js';
import { Card } from '../Card.js';
import { Exchange, ExchangeStatus } from '../Exchange.js';
import { ShowDown } from '../ShowDown.js';

export abstract class Player {
  public name = '';

  public game: ShowDown | null = null;

  public point = 0;

  public hands: Card[] = [];

  public exchange: Exchange | ExchangeStatus = ExchangeStatus.canExchange;

  public abstract nameSelf(): void | Promise<void>;
  public abstract takeRound(): Card | Promise<Card>;

  public assignGameToPlayer(game: ShowDown) {
    this.game = game;
  }

  public initializePlayer(): void {
    this.point = 0;
    this.hands.length = 0;
    this.exchange = ExchangeStatus.canExchange;
  }

  public getName(): string {
    return this.name;
  }

  public addCardToHand(card: Card): void {
    this.hands.push(card);
  }

  public sortHands(): void {
    this.hands.sort((a, b) => a.toPoint() - b.toPoint());
  }

  public show(card: Card): Card {
    deleteCardFromHand(this.hands, card);
    return card;
  }

  public checkExchangeRemainingRound() {
    if (this.exchange instanceof Exchange) {
      this.exchange.checkRemainingRounds();
    }
  }

  public exchangeHands(receiver: Player): void {
    if (!this.game) throw new InvalidOperationException();
    checkIfReceiverShowCardAlready(this.game, receiver);
    exchangeWithReceiver(this, receiver);
  }
}
