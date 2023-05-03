import { generateAIPlayerNumber, pickRandomCardFromHand } from '../../services/player.service.js';
import { Player } from './Player.js';
import { Card } from '../Card.js';

export class AIPlayer extends Player {
  public nameSelf(): void {
    const AIPlayerNumber = generateAIPlayerNumber();
    this.name = `Robot${AIPlayerNumber}`;
  }

  public takeRound(): Card {
    return this.show(pickRandomCardFromHand(this.hands));
  }
}
