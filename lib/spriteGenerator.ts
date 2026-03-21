// ============================================================
// Pixel Art Sprite Generator - Original Retro Platformer Style
// Each sprite is drawn pixel-by-pixel on a canvas element
// ============================================================

type PixelMap = string[];
type ColorMap = Record<string, string>;

/**
 * Renders a pixel map onto a canvas at a given scale.
 * Each character in the pixel map maps to a color via colorMap.
 * '.' = transparent
 */
function renderPixelMap(
  pixelMap: PixelMap,
  colorMap: ColorMap,
  scale: number
): HTMLCanvasElement {
  const rows = pixelMap.length;
  const cols = pixelMap[0].length;
  const canvas = document.createElement('canvas');
  canvas.width = cols * scale;
  canvas.height = rows * scale;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const char = pixelMap[y][x];
      if (char === '.') continue;
      const color = colorMap[char];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  return canvas;
}

// ========================
// HERO CHARACTER (32x56) - LARGER, MORE DETAILED
// ========================
const heroColors: ColorMap = {
  R: '#E52521',
  r: '#A01010',
  R1: '#CC2218',
  S: '#FFB884',
  s: '#D4956B',
  S1: '#E89968',
  H: '#6B3A11',
  H1: '#8B4513',
  E: '#1A1A1A',
  E1: '#2A2A2A',
  W: '#FFFFFF',
  w: '#F5F5F5',
  B: '#1565C0',
  b: '#0D47A1',
  B1: '#2196F3',
  Y: '#FFD600',
  G: '#795548',
  g: '#4E342E',
  G1: '#6B5A47',
  K: '#1A1A1A',
};

const heroIdle: PixelMap = [
  '................KRRRRK............',
  '...............KRRRRRRK...........',
  '...............RRRRRRRRRK.........',
  '..............KRRRRRRRRRK.........',
  '..............KRRR1RRRR1RK........',
  '..............KRRR1RRRR1RK........',
  '..............KRRRRRRRRRK.........',
  '..............KHHH1SSHH1HK........',
  '.............KHHSHSSHSSHSHK.......',
  '.............KSHSSSSSS1SSHK.......',
  '.............KSSS1ESssES1SSK......',
  '.............KSSSSSSSSSSSK........',
  '............KSSSSSSSSSSK..........',
  '...........KSSSSSSSSSK...........',
  '.............KRRBRRRBRRRK.........',
  '............KSRRRBRRRBRRRSK.......',
  '............WSRRR1BRRR1BRRSW......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KYBBBBBBBBBBBBYK.......',
  '............KBBBBBBBBBBBK.........',
  '............KBBBBBBBBBBBK.........',
  '............KBBbKbBbKbBBK.........',
  '...........KBBBbKKbBbKbBBBK.......',
  '...........KBBbK..KbBbK.KbBBK.....',
  '...........KBBbK..KbBbK.KbBBK.....',
  '...........KGGK....KGGK..KGGK.....',
  '..........KGGGgK..KgGGGK.KgGGGK...',
  '..........KGGGgK..KgGGGK.KgGGGK...',
  '..........KGGGgK....gGGK.KgGGGK...',
  '...........KKK........KKK.KKK.....',
];

const heroWalk1: PixelMap = [
  '................KRRRRK............',
  '...............KRRRRRRK...........',
  '...............RRRRRRRRRK.........',
  '..............KRRRRRRRRRK.........',
  '..............KRRR1RRRR1RK........',
  '..............KRRR1RRRR1RK........',
  '..............KRRRRRRRRRK.........',
  '..............KHHH1SSHH1HK........',
  '.............KHHSHSSHSSHSHK.......',
  '.............KSHSSSSSS1SSHK.......',
  '.............KSSS1ESssES1SSK......',
  '.............KSSSSSSSSSSSK........',
  '............KSSSSSSSSSSK..........',
  '...........KSSSSSSSSSK...........',
  '.............KRRBRRRBRRRK.........',
  '............KSRRRBRRRBRRRSK.......',
  '............WSRRR1BRRR1BRRSW......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KYBBBBBBBBBBBBYK.......',
  '............KBBBBBBBBBBBK.........',
  '............KBBbBBBBBbBBK.........',
  '...........KBBBbKKBBBbKbBBBK......',
  '...........KBBbK...KBbK.KBK.......',
  '...........KGK..KGGK...........',
  '..........KGGK.KGGGgK...........',
  '.........KGGGgKKgGGGK..........',
  '.........KGGGgK....................',
  '.........KKK.......................',
  '..............................',
  '..............................',
];

const heroWalk2: PixelMap = [
  '................KRRRRK............',
  '...............KRRRRRRK...........',
  '...............RRRRRRRRRK.........',
  '..............KRRRRRRRRRK.........',
  '..............KRRR1RRRR1RK........',
  '..............KRRR1RRRR1RK........',
  '..............KRRRRRRRRRK.........',
  '..............KHHH1SSHH1HK........',
  '.............KHHSHSSHSSHSHK.......',
  '.............KSHSSSSSS1SSHK.......',
  '.............KSSS1ESssES1SSK......',
  '.............KSSSSSSSSSSSK........',
  '............KSSSSSSSSSSK..........',
  '...........KSSSSSSSSSK...........',
  '.............KRRBRRRBRRRK.........',
  '............KSRRRBRRRBRRRSK.......',
  '............WSRRR1BRRR1BRRSW......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KWSRRRRRRRRRRRSWK......',
  '...........KYBBBBBBBBBBBBYK.......',
  '............KBBBBBBBBBBBK.........',
  '............KbbBBBBBBbBBK.........',
  '...........KbbKKBBBBbK.KBBBK......',
  '...........KBK...KbbK...KbbK......',
  '...........KGK...KBK.......KGGK...',
  '..........KgGGGK.KGGK......KGGK...',
  '.........KGGGgKKGGGgK.....KGGK...',
  '.........KGGGgK......................',
  '.........KKK.......................',
  '..............................',
  '..............................',
];

// Mario jump (large 3/4 perspective)
const heroJump: PixelMap = [
  '................KRRRRK............',
  '...............KRRRRRRK...........',
  '...............RRRRRRRRRK.........',
  '..............KRRRRRRRRRK.........',
  '..............KRRR1RRRR1RK........',
  '..............KRRR1RRRR1RK........',
  '..............KRRRRRRRRRK.........',
  '..............KHHH1SSHH1HK........',
  '.............KHHSHSSHSSHSHK.......',
  '.............KSHSSSSSS1SSHK.......',
  'wK...........KSSS1ESssES1SSK......',
  'wK..........KSSSSSSSSSSSK........',
  '.wK.........KSSSSSSSSSSK..........',
  '..wKSSSSSSSSK...........',
  '...KRRBRRRBRRRK.........',
  '....KSRRRBRRRBRRRSK.......',
  '....WSRRR1BRRR1BRRSW......',
  '...KWSRRRRRRRRRRRSWK......',
  '...KWSRRRRRRRRRRRSWK......',
  '...KYBBBBBBBBBBBBYK.......',
  '....KBBBBBBBBBBBK.........',
  '....KBBBBBBBBBbK.........',
  '....KBBBBbKKbbK.....',
  '....KBBBbK..KKK.....',
  '....KBBbK...........',
  '....KGGgK...........',
  '...KgGGGK...........',
  '...KGGGgK...........',
  '...KKK...........',
  '.......................',
  '.......................',
];

// ========================
// LUCKY BLOCK (16x16)
// ========================
const boxColors: ColorMap = {
  K: '#1A1A1A',
  O: '#E68A00',
  o: '#B36B00',
  Y: '#FFB800',
  y: '#FFDD44',
  w: '#FFE88A',
  W: '#FFFFFF',
  D: '#996600',
  d: '#CC8800',
};

const luckyBox: PixelMap = [
  'KKKKKKKKKKKKKKKK',
  'KyyYYYYYYYYYYYDK',
  'KyYYYYYYYYYYYYDK',
  'KyYYYWWWWYYYYYDK',
  'KyYYWWYYWWYYYYDK',
  'KyYYYYYYWWYYYYDK',
  'KyYYYYYWWYYYYYDK',
  'KyYYYYWWYYYYYYDK',
  'KyYYYYWWYYYYYYDK',
  'KyYYYYYYYYYYYYDK',
  'KyYYYYWWYYYYYYDK',
  'KyYYYYWWYYYYYYDK',
  'KyYYYYYYYYYYYYDK',
  'KYYYYYYYYYYYYYdK',
  'KYDDDDDDDDDDDDdK',
  'KKKKKKKKKKKKKKKK',
];

const luckyBoxHit: PixelMap = [
  'KKKKKKKKKKKKKKKK',
  'KDDDDDDDDDDDDDK',
  'KDoooooooooooodK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDooooooooooooDK',
  'KDDDDDDDDDDDDDK',
  'KKKKKKKKKKKKKKKK',
];

// ========================
// COIN (10x10)
// ========================
const coinColors: ColorMap = {
  K: '#1A1A1A',
  Y: '#FFD600',
  y: '#FFEE58',
  G: '#FFB800',
  g: '#CC8800',
  W: '#FFFFFF',
};

const coinFrame1: PixelMap = [
  '...KKKK...',
  '..KyyyYK..',
  '.KyyyYYYK.',
  'KyyWyYYYGK',
  'KyyWyYYYGK',
  'KyyyYYYYGK',
  'KyyyYYYGGK',
  '.KYYYYGGK.',
  '..KYYYYK..',
  '...KKKK...',
];

const coinFrame2: PixelMap = [
  '....KK....',
  '...KyYK...',
  '..KyYYK...',
  '.KyWYYGK..',
  '.KyWYYGK..',
  '.KyYYYGK..',
  '.KyYYGGK..',
  '..KYYGGK..',
  '...KYYK...',
  '....KK....',
];

const coinFrame3: PixelMap = [
  '.....K....',
  '....KYK...',
  '....KYK...',
  '...KYYGK..',
  '...KYYGK..',
  '...KYYGK..',
  '...KYYGK..',
  '....KGK...',
  '....KGK...',
  '.....K....',
];

// ========================
// CLOUD (16x10)
// ========================
const cloudColors: ColorMap = {
  W: '#FFFFFF',
  w: '#E8F4FD',
  K: '#D0E8F5',
};

const cloudMap: PixelMap = [
  '......WWWW......',
  '....WWWWWWWW....',
  '..WWWWWWWWWWW...',
  '.WWWWWWWWWWwwW..',
  'WWWWWWWWWWwwwWW.',
  'WwwWWWWWWWwwwWW.',
  'WwwwWWWWWWwwwWWW',
  'WwwwwwwwwwwwwwwW',
  '.WKKKKKKKKKKKw..',
  '..KKKKKKKKKK....',
];

// ========================
// BUSH/HILL (20x8)
// ========================
const bushColors: ColorMap = {
  G: '#4CAF50',
  g: '#388E3C',
  d: '#2E7D32',
  K: '#1B5E20',
};

const bushMap: PixelMap = [
  '........GGGG........',
  '......GGGGGgGG......',
  '....GGGGGGGGggGG....',
  '..GGGGGGGGGGGgggG...',
  '.GGGGGGGGGGGGgggGG..',
  'GGGgGGGGGGGGGGgggGGG',
  'GGggGGGGGGGGGGggggGG',
  'KKKKKKKKKKKKKKKKKKKd',
];

// ========================
// QUESTION BLOCK (16x16)
// ========================
const questionBlockColors: ColorMap = {
  K: '#1A1A1A',
  Y: '#FFD600',
  y: '#FFEE58',
  O: '#E68A00',
  o: '#B36B00',
  W: '#FFFFFF',
};

const questionBlock: PixelMap = [
  'KKKKKKKKKKKKKKKK',
  'KyyYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYY?YYYY?YYYYOk',
  'KyYY?YYYY?YYYYOk',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KyYYYYYYYYYYYYOK',
  'KYYYYYYYYYYYYYoK',
  'KYOOOOOOOOOOOOoK',
  'KKKKKKKKKKKKKKKK',
];

// ========================
// BRICK BLOCK (16x16)
// ========================
const brickBlockColors: ColorMap = {
  K: '#1A1A1A',
  R: '#C84C09',
  r: '#A03000',
  W: '#E06010',
  L: '#D4956B',
};

const brickBlock: PixelMap = [
  'KKKKKKKKKKKKKKKK',
  'KrrRRRRRRRRRRRRK',
  'KrRRRRRRRRRRRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRRRRRRRRRRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRRRRRRRRRRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRWWRRRRWWRRRK',
  'KrRRRRRRRRRRRRRK',
  'KrRRWWRRRRWWRRRK',
  'KRRRRRRRRRRRRRrK',
  'KRRRRRRRRRRRRRL K',
  'KKKKKKKKKKKKKKKK',
];

// ========================
// GREEN PIPE (12x16)
// ========================
const pipeColors: ColorMap = {
  K: '#1A1A1A',
  G: '#4CAF50',
  g: '#388E3C',
  d: '#2E7D32',
};

const pipe: PixelMap = [
  '....GGGG....',
  '...GggggG...',
  '..GggggggG..',
  '..GggggggG..',
  '..GggggggG..',
  '..GggggggG..',
  '.GgggddggG..',
  '.GgggddggG..',
  '.GgggddggG..',
  '.GgggddggG..',
  '.GgggddggG..',
  '.GgggddggG..',
  'GdddddddddG.',
  'GdddddddddG.',
  'KddddddddKKK',
  'KKKKKKKKKKKK',
];

// ========================
// GOOMBA ENEMY (12x12)
// ========================
const goombaColors: ColorMap = {
  K: '#1A1A1A',
  B: '#8B4513',
  b: '#5D2E0F',
  W: '#FFFFFF',
  E: '#1A1A1A',
};

const goomba: PixelMap = [
  '...BBBBBB...',
  '..BBBBBBBB..',
  '.BBBWWBWWBB.',
  '.BBBEWBEWBB.',
  '.BBBBBBBBBB.',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBKK.KKBB.',
  'BBK.BKBKBB.',
  'BBK.B.BKB.B',
  '.KBBBBBBK..',
];

// ========================
// KOOPA TROOPA (14x14)
// ========================
const koopaColors: ColorMap = {
  K: '#1A1A1A',
  R: '#E52521',
  r: '#A01010',
  G: '#4CAF50',
  g: '#2E7D32',
  S: '#FFB884',
  E: '#1A1A1A',
  W: '#FFFFFF',
};

const koopa: PixelMap = [
  '..RRRRRR....',
  '.RRRRRRRR...',
  'RRRGGGGRRR..',
  'RRGGGGGGRR..',
  'RGGGGGGGGR..',
  'RGGWWGWWGR..',
  'RGGEGEGEGR..',
  'RGGGGGGGGR..',
  'RRGGGGGGR...',
  'RRRGGGGRRR..',
  'RSRRSRRSRSR.',
  '.RSSSSSSSSR.',
  '.KSSSSSSSK..',
  '..KKSSSKK...',
];

// ========================
// STAR POWER (8x8)
// ========================
const starColors: ColorMap = {
  K: '#1A1A1A',
  Y: '#FFD600',
  y: '#FFEE58',
  W: '#FFFFFF',
};

const star: PixelMap = [
  '...KY...',
  '..KyYK..',
  'KKyYyYKK',
  'KyYWYyYK',
  'KyYWYyYK',
  'KKyYyYKK',
  '..KyYK..',
  '...KY...',
];

// ========================
// SHY GUY (12x14)
// ========================
const shyGuyColors: ColorMap = {
  K: '#1A1A1A',
  R: '#E52521',
  r: '#A01010',
  Y: '#FFD600',
  y: '#FFEE58',
  W: '#FFFFFF',
  E: '#1A1A1A',
  S: '#FFB884',
};

const shyGuy: PixelMap = [
  '....RRRRRR....',
  '...RRRRRRRR...',
  '..RRRyyRyyRR..',
  '.RRRWYERWYRR..',
  'RRRRWYERWYRRRR',
  'RRRRERRRRERRE.',
  'RRRRRRRRRRRR..',
  'RRRRRRRRRRRR..',
  '.RRSRSRSRSRR..',
  '.RRSRSRSRSRR..',
  '.RRSRSRSRSRR..',
  '..RRSRSRSRR...',
  '...RRSRSRR....',
  '....RRRRR.....',
];

// ========================
// FIRE FLOWER (12x12)
// ========================
const fireFlowerColors: ColorMap = {
  K: '#1A1A1A',
  R: '#E52521',
  r: '#A01010',
  Y: '#FFD600',
  y: '#FFEE58',
  G: '#4CAF50',
  g: '#2E7D32',
};

const fireFlower: PixelMap = [
  '....RRRR.....',
  '...RRYYRRR...',
  '..RRYYRRYYRR.',
  '.RRRyRRyRRyR.',
  '.RRRyRRyRRyR.',
  '.RRRyRRyRRyR.',
  '..RRYYRRYYRR.',
  '...RRRRRRR...',
  '...RRRRRRRR..',
  '....GGGGG....',
  '....GGGGG....',
  '....GGGGG....',
];

// ========================
// PUBLIC API
// ========================

export function generateMarioSprite(): HTMLCanvasElement {
  return renderPixelMap(heroIdle, heroColors, 4);
}

export function generateMarioWalk1(): HTMLCanvasElement {
  return renderPixelMap(heroWalk1, heroColors, 4);
}

export function generateMarioWalk2(): HTMLCanvasElement {
  return renderPixelMap(heroWalk2, heroColors, 4);
}

export function generateMarioJump(): HTMLCanvasElement {
  return renderPixelMap(heroJump, heroColors, 4);
}

export function generateMario3DIdle(): HTMLCanvasElement {
  return renderPixelMap(heroIdle, heroColors, 4);
}

export function generateMario3DWalk1(): HTMLCanvasElement {
  return renderPixelMap(heroWalk1, heroColors, 4);
}

export function generateMario3DWalk2(): HTMLCanvasElement {
  return renderPixelMap(heroWalk2, heroColors, 4);
}

export function generateShyGuy(): HTMLCanvasElement {
  return renderPixelMap(shyGuy, shyGuyColors, 3);
}

export function generateFireFlower(): HTMLCanvasElement {
  return renderPixelMap(fireFlower, fireFlowerColors, 3);
}

export function generateLuckyBoxSprite(): HTMLCanvasElement {
  return renderPixelMap(luckyBox, boxColors, 3);
}

export function generateLuckyBoxHitSprite(): HTMLCanvasElement {
  return renderPixelMap(luckyBoxHit, boxColors, 3);
}

export function generateCoinFrames(): HTMLCanvasElement[] {
  return [
    renderPixelMap(coinFrame1, coinColors, 3),
    renderPixelMap(coinFrame2, coinColors, 3),
    renderPixelMap(coinFrame3, coinColors, 3),
    renderPixelMap(coinFrame2, coinColors, 3),
  ];
}

export function generateCloudSprite(): HTMLCanvasElement {
  return renderPixelMap(cloudMap, cloudColors, 3);
}

export function generateBushSprite(): HTMLCanvasElement {
  return renderPixelMap(bushMap, bushColors, 3);
}

export function generateGroundTile(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 48;
  canvas.height = 48;
  const ctx = canvas.getContext('2d')!;

  // Main brick color
  ctx.fillStyle = '#C84C09';
  ctx.fillRect(0, 0, 48, 48);

  // Brick pattern mortar lines
  ctx.fillStyle = '#A03000';
  ctx.fillRect(0, 23, 48, 2);
  ctx.fillRect(0, 47, 48, 1);
  ctx.fillRect(23, 0, 2, 23);
  ctx.fillRect(0, 0, 2, 2);
  ctx.fillRect(46, 0, 2, 2);
  ctx.fillRect(11, 24, 2, 24);
  ctx.fillRect(35, 24, 2, 24);

  // Highlight
  ctx.fillStyle = '#E06010';
  ctx.fillRect(2, 1, 21, 2);
  ctx.fillRect(25, 1, 21, 2);
  ctx.fillRect(2, 25, 9, 2);
  ctx.fillRect(13, 25, 22, 2);
  ctx.fillRect(37, 25, 9, 2);

  return canvas;
}

export function generateQuestionBlock(): HTMLCanvasElement {
  return renderPixelMap(questionBlock, questionBlockColors, 3);
}

export function generateBrickBlock(): HTMLCanvasElement {
  return renderPixelMap(brickBlock, brickBlockColors, 3);
}

export function generatePipe(): HTMLCanvasElement {
  return renderPixelMap(pipe, pipeColors, 3);
}

export function generateGoomba(): HTMLCanvasElement {
  return renderPixelMap(goomba, goombaColors, 3);
}

export function generateKoopa(): HTMLCanvasElement {
  return renderPixelMap(koopa, koopaColors, 2);
}

export function generateStar(): HTMLCanvasElement {
  return renderPixelMap(star, starColors, 4);
}
