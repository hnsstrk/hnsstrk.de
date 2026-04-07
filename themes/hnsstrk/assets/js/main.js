import { Board } from './Board.js';
import { MessageRotator } from './MessageRotator.js';
import { KeyboardController } from './KeyboardController.js';

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('board-container');
  const board = new Board(boardContainer);
  const rotator = new MessageRotator(board);
  const keyboard = new KeyboardController(rotator);

  // Start message rotation automatically
  rotator.start();
});
