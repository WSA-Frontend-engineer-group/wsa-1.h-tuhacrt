import inquirer, { Answers } from 'inquirer';
import { handleAsync } from '../utils/handleAsync.js';
import { Player } from '../classes/Player/Player.js';
import { InvalidOperationException } from '../exceptions/InvalidOperationException.js';
import { ExchangeStatus } from '../classes/Exchange.js';

export const namePlayerNameFromCLI = handleAsync(async (): Promise<string> => {
  const { playerName }: Answers = await inquirer.prompt({
    name: 'playerName',
    type: 'input',
    message: 'Please input Player Name'
  });

  return String(playerName);
});

export const getPlayerActionFromCLI = handleAsync(async (player: Player): Promise<string> => {
  const answers =
    player.exchange === ExchangeStatus.canExchange ? ['ShowCard', 'Exchange'] : ['ShowCard'];
  const { action } = (await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: `${player.getName()} please pick your action.`,
    choices: answers
  })) as Answers;

  return String(action);
});

export const getCardFromCLI = handleAsync(async (player: Player): Promise<string> => {
  const { hands } = player;
  const handsString = hands.map((card) => card.toString());
  const { card } = (await inquirer.prompt({
    name: 'card',
    type: 'rawlist',
    message: `${player.getName()} please pick the card to be showed.`,
    choices: handsString
  })) as Answers;

  return String(card);
});

export const pickPlayerNameFromCLI = handleAsync(async (player: Player): Promise<string> => {
  if (!player.game) throw new InvalidOperationException();
  const players = player.game.players.filter((elem) => elem.getName() !== player.getName());
  const playersString = players.map((elem) => elem.getName());
  const { playerName }: Answers = (await inquirer.prompt({
    name: 'playerName',
    type: 'rawlist',
    message: `${player.getName()} please pick the player to be exchanged.`,
    choices: playersString
  })) as Answers;

  return String(playerName);
});
