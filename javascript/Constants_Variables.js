const PI = Math.PI;
const SEMI_CIRCLE = 180;
const FULL_CIRCLE = 360;
const SPRITE_SIZE = 64;
const TILE_SIZE = 256;
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const RIGHT_DIR = 0, LEFT_DIR = 1, UP_DIR = 2, DOWN_DIR = 3;
const TEXT_TIME_START = 150;
const PLAIN_TEXT = 1;
const PENALTY_TEXT = 2;
const STAGE_TEXT = 3;
const FULL_TEXT = 4;
const CUT_SIZE = 8;
const CUT_CANVAS = CANVAS_WIDTH/64;


const ALLOWED_KEYS = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'

};


let spriteSheet = new Image();
let road = new Image();

// Player
const playerSpriteUp = [spriteSheet, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerSpriteRight = [spriteSheet, 64, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerSpriteDown = [spriteSheet, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerSpriteLeft = [spriteSheet, 192, 0, SPRITE_SIZE, SPRITE_SIZE]
// Fire
const playerFireSpriteUp1 = [spriteSheet, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteUp2 = [spriteSheet, 320, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteDown1 = [spriteSheet, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteDown2 = [spriteSheet, 576, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteRight1 = [spriteSheet, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteRight2 = [spriteSheet, 448, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteLeft1 = [spriteSheet, 640, 0, SPRITE_SIZE, SPRITE_SIZE]
const playerFireSpriteLeft2 = [spriteSheet, 704, 0, SPRITE_SIZE, SPRITE_SIZE]
// Meteors
const meteor1Sprite = [spriteSheet, 0, 64, SPRITE_SIZE, SPRITE_SIZE]
const meteor2Sprite = [spriteSheet, 64, 64, SPRITE_SIZE, SPRITE_SIZE]
const meteor3Sprite = [spriteSheet, 128, 64, SPRITE_SIZE, SPRITE_SIZE]
// Space
const space1Sprite = [spriteSheet, 0, 128, TILE_SIZE, TILE_SIZE]
const space2Sprite = [spriteSheet, 0, 384, TILE_SIZE, TILE_SIZE]
const space3Sprite = [spriteSheet, 256, 128, TILE_SIZE, TILE_SIZE]
const space4Sprite = [spriteSheet, 256, 384, TILE_SIZE, TILE_SIZE]
const space5Sprite = [spriteSheet, 512, 128, TILE_SIZE, TILE_SIZE]
// Explosion
const explosion1Sprite = [spriteSheet, 192, 64, SPRITE_SIZE, SPRITE_SIZE]
const explosion2Sprite = [spriteSheet, 256, 64, SPRITE_SIZE, SPRITE_SIZE]
const explosion3Sprite = [spriteSheet, 320, 64, SPRITE_SIZE, SPRITE_SIZE]
const explosion4Sprite = [spriteSheet, 384, 64, SPRITE_SIZE, SPRITE_SIZE]
const explosion5Sprite = [spriteSheet, 448, 64, SPRITE_SIZE, SPRITE_SIZE]

const METEORS_SIZES = [
    meteor1Sprite,
    meteor2Sprite,
    meteor3Sprite
]

const gameMusic = new Audio("sounds/blazing_stars.mp3");
const explosionSound = new Audio("sounds/explosion.ogg");
const fireSound = new Audio("sounds/fire.ogg");
const hitSound = new Audio("sounds/impact.ogg");
const passStageSound = new Audio("sounds/new_stage.ogg");
const loseSound = new Audio("sounds/fail.ogg");
const laserSound = new Audio("sounds/laser.ogg");

let stars1Count = 0;
let stars2Count = 0;
let stars3Count = 0;
let stars4Count = 0;
let stars5Count = 0;
let stars1X = 0;
let stars2X = 0;
let stars3X = 0;
let stars4X = 0;
let stars5X = 0;
let stars1Y = 0;
let stars2Y = 0;
let stars3Y = 0;
let stars4Y = 0;
let stars5Y = 0;

let gameRunning
let ctx
let player;
let explosion;
let penalties = 0;
let score = 0;
let meteors = [];
let texts = [];
let stage = 1;
let changedStage = false;
let elapsedTime = 0;
let gameStartScreen = true;
let gameStart = false;
let gameOver = false;
let gameOverTime = 0;
let initialTime = Date.now();
let penaltyInitialTime = initialTime;
let highScores = []
