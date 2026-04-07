import { Board } from './Board.js';
import { MessageRotator } from './MessageRotator.js';
import { KeyboardController } from './KeyboardController.js';

// 404-spezifische Nachrichten — überschreiben NICHT die Startseite
const MESSAGES_404 = [
  [
    '',
    '',
    '404',
    '',
    'PAGE NOT FOUND',
    '',
    ''
  ],
  [
    '',
    '',
    'NOTHING TO SEE',
    'HERE',
    '',
    'MOVE ALONG',
    ''
  ],
  [
    '',
    '',
    'HAVE YOU TRIED',
    'TURNING IT OFF',
    'AND ON AGAIN?',
    '',
    ''
  ],
  [
    '',
    'THE PAGE YOU SEEK',
    'DOES NOT EXIST',
    '',
    'PERHAPS IT NEVER',
    'DID',
    ''
  ],
  [
    '',
    '',
    'ERROR 404',
    '',
    'PROUDLY COPIED',
    'FROM /DEV/NULL',
    ''
  ],
  [
    '',
    '',
    'THIS IS NOT',
    'THE PAGE',
    'YOU ARE',
    'LOOKING FOR',
    ''
  ],
  [
    '',
    '',
    'OOPS',
    '',
    'BLAME THE INTERN',
    '',
    ''
  ],
  [
    '',
    '',
    '// TODO:',
    'FIX THIS PAGE',
    '',
    '// PRIORITY: LOW',
    ''
  ]
];

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('board-container');
  const board = new Board(boardContainer);

  // Eigener MessageRotator mit 404-Messages
  const rotator = new MessageRotator(board);
  // Überschreibe die Messages
  rotator.messages = MESSAGES_404;

  const keyboard = new KeyboardController(rotator);
  rotator.start();
});
