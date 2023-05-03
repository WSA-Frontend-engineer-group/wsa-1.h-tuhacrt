import { ShowDown } from './classes/ShowDown.js';
import { HumanPlayer } from './classes/Player/HumanPlayer.js';
import { AIPlayer } from './classes/Player/AIPlayer.js';

const showDown = new ShowDown();

showDown
  .initializeGame(new HumanPlayer(), new HumanPlayer(), new AIPlayer(), new AIPlayer())
  .then(() => showDown.startGame())
  .finally(() => console.log('Game Over'));
