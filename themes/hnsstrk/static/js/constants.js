export const GRID_COLS = 20;
export const GRID_ROWS = 7;

export const SCRAMBLE_DURATION = 800;
export const FLIP_DURATION = 300;
export const STAGGER_DELAY = 25;
export const TOTAL_TRANSITION = 3800;
export const MESSAGE_INTERVAL = 4000;

export const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,-!?\'/: ';

// Lese Farben aus CSS Custom Properties (theme-aware)
function getCSSColor(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

export function getScrambleColors() {
  return [
    getCSSColor('--scramble-1'),
    getCSSColor('--scramble-2'),
    getCSSColor('--scramble-3'),
    getCSSColor('--scramble-4'),
    getCSSColor('--scramble-5'),
    getCSSColor('--scramble-6'),
  ];
}

export function getAccentColors() {
  return [
    getCSSColor('--accent-bar-1'),
    getCSSColor('--accent-bar-2'),
    getCSSColor('--accent-bar-3'),
    getCSSColor('--accent-bar-4'),
    getCSSColor('--accent-bar-5'),
  ];
}

export const MESSAGES = [
  [
    '',
    '',
    'HANS JUERGEN STARK',
    '',
    'AI ENTHUSIAST',
    'MAKER // GAMER',
    ''
  ],
  [
    '',
    '',
    'BUILDING THINGS',
    'SINCE 2013',
    '',
    '',
    ''
  ],
  [
    '',
    '',
    '',
    'hnsstrk',
    '',
    '',
    ''
  ]
];
