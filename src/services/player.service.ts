/* eslint-disable no-param-reassign */

import { Card } from '../classes/Card.js';
import { Exchange } from '../classes/Exchange.js';
import { Player } from '../classes/Player/Player.js';
import { ShowDown } from '../classes/ShowDown.js';

//* Common Helpers *//

export const findPlayerIndex = (game: ShowDown, receiver: Player): number =>
  Number(game?.players.findIndex((player) => player === receiver));

export const checkIfReceiverShowCardAlready = (game: ShowDown, receiver: Player): void => {
  const receiverIndex = findPlayerIndex(game, receiver);
  const receiverShowCard = game.showedCardByOrder[receiverIndex];

  if (receiverShowCard) {
    receiver.hands.push(receiverShowCard);
    receiver.sortHands();

    if (game?.showedCardByOrder[receiverIndex]) game.showedCardByOrder[receiverIndex] = null;
    game?.roundExecuteOrder.unshift(receiver);
  }
};

export const exchangeWithReceiver = (caller: Player, receiver: Player) => {
  caller.exchange = new Exchange(caller, receiver);
};

export const deleteCardFromHand = (hands: Card[], card: Card) => {
  hands.splice(
    hands.findIndex((hand) => hand === card),
    1
  );
};

//* AI Player Helpers*//
export const generateAIPlayerNumber = (): string => Math.floor(Math.random() * 1000).toString();

export const pickRandomCardFromHand = (hands: Card[]): Card =>
  hands[Math.floor(Math.random() * (hands.length - 1))];
