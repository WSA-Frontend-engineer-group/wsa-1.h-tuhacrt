import {
  getCardFromCLI,
  pickPlayerNameFromCLI,
  getPlayerActionFromCLI,
  namePlayerNameFromCLI
} from '../../services/inquirer.service.js';
import { InvalidOperationException } from '../../exceptions/InvalidOperationException.js';
import { handleAsync } from '../../utils/handleAsync.js';
import { Player } from './Player.js';
import { Card } from '../Card.js';

export class HumanPlayer extends Player {
  public nameSelf = handleAsync(async (): Promise<void> => {
    this.name = await namePlayerNameFromCLI();
  });

  public takeRound = handleAsync(async (): Promise<Card> => this.askForPlayerAction());

  public askForPlayerAction = handleAsync(async (): Promise<Card> => {
    const action = await getPlayerActionFromCLI(this);

    if (action === 'ShowCard') {
      return this.pickCardToShow();
    }

    if (action === 'Exchange') {
      await this.pickPlayerToExchange();
      return this.takeRound();
    }

    throw new InvalidOperationException();
  });

  private pickCardToShow = handleAsync(async (): Promise<Card> => {
    const cardString = await getCardFromCLI(this);

    const showCardIndex = this.hands.findIndex((hand) => hand.toString() === cardString);
    const showCard = this.show(this.hands[showCardIndex]);
    console.log(`Card: ${showCard.toString()}, Point: ${showCard.toPoint()}`);

    return showCard;
  });

  private pickPlayerToExchange = handleAsync(async () => {
    if (!this.game) throw new InvalidOperationException();

    const receiverName = await pickPlayerNameFromCLI(this);
    const receiver = this.game.players.find((elem) => elem.getName() === receiverName);

    if (receiver instanceof Player) {
      this.exchangeHands(receiver);
    } else {
      throw new InvalidOperationException();
    }
  });
}
