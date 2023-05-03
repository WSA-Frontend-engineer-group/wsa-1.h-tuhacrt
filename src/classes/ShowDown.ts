import { handleAsync } from '../utils/handleAsync.js';
import { Player } from './Player/Player.js';
import { Deck } from './Deck.js';
import { Card } from './Card.js';

export class ShowDown {
  public players: Player[] = [];

  public deck: Deck = new Deck();

  public roundExecuteOrder: Player[] = [];

  public showedCardByOrder: (Card | null)[] = new Array<Card>();

  public initializeGame = handleAsync(async (...players: Player[]) => {
    for (const player of players) {
      await player.nameSelf();
      player.initializePlayer();
      player.assignGameToPlayer(this);
      this.assignPlayerToGame(player);
    }

    this.initializeDeck();
    this.dealCardsToAllPlayers();
  });

  public startGame = handleAsync(async () => {
    while (this.deck.length < 52) {
      await this.executeOneRound();
      this.showRemainingCards();
      this.showPoints();
    }
  });

  public initializeDeck() {
    this.deck.initializeDeck();
    this.deck.shuffleDeck();
  }

  public executeOneRound = handleAsync(async () => {
    this.roundExecuteOrder = [...this.players];
    this.showedCardByOrder = this.players.map(() => null);
    [...this.players].reverse().map((player) => player.checkExchangeRemainingRound());

    while (this.roundExecuteOrder.length) {
      const currentPlayer = this.roundExecuteOrder.shift();
      const currentPlayerIndex = this.players.findIndex((player) => player === currentPlayer);
      const currentCard = await currentPlayer?.takeRound();

      if (currentCard instanceof Card) {
        this.showedCardByOrder[currentPlayerIndex] = currentCard;
        this.deck.addCardToDeck(currentCard);
      }
    }
    this.awardRoundWinner();
  });

  public assignPlayerToGame(player: Player) {
    this.players.push(player);
  }

  public dealCardsToAllPlayers() {
    for (let handCardCount = 0; handCardCount < 13; handCardCount += 1) {
      this.players.map((player) => player.addCardToHand(this.deck.drawCardFromDeck()));
    }
    this.players.map((player) => player.sortHands());
  }

  public awardRoundWinner() {
    const currentRoundPoint = this.showedCardByOrder.map((card) => Number(card?.toPoint()));
    const winnerIndex = currentRoundPoint.indexOf(Math.max(...currentRoundPoint));
    const winner = this.players[winnerIndex];

    console.log(currentRoundPoint);
    console.log(`Round Winner: ${winner.getName()}`);

    winner.point += 1;
  }

  public showRemainingCards() {
    this.players.map((player) =>
      console.log(`${player.getName()} ${player.hands.toString()} ${player.hands.length}`)
    );
  }

  public showPoints() {
    console.log(`[${this.players.map((player) => player.point).join(', ')}]`);
  }
}
