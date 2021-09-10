// ---------------------------------------------------------------------------------
// Global Constants
// ---------------------------------------------------------------------------------

// Math
const PI = Math.PI;
const SEMI_CIRCLE = 180;
const FULL_CIRCLE = 360;

// Sizes
const SPRITE_SIZE = 128;
const LARGE_SPRITE_SIZE = 2*SPRITE_SIZE
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const CANVAS_CENTER_X = CANVAS_WIDTH/2;
const CANVAS_CENTER_Y = CANVAS_HEIGHT/2;
const FPS = 60;
const STEP = 1/FPS

//States
const LOADING_STATE = 0;
const SET_STATE = 1;
const PLAY_STATE = 2;
const PAUSE_STATE = 3;
const GAME_OVER_STATE = 4;

//Player Colors
const GREEN = 5;
const BLUE = 6;
const RED = 7;


//kEYS
const ALLOWED_KEYS = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

//Road Segments
const ROAD = {
    LENGTH: { NONE: 0, SHORT:  25, MEDIUM:  50, LONG:  100 },
    HILL:   { NONE: 0, LOW:    20, MEDIUM:  40, HIGH:   60 },
    CURVE:  { NONE: 0, EASY:    2, MEDIUM:   4, HARD:    6 }
};

//Road Segments
const ROAD_LANES = [-0.6, -0.2, 0.2, 0.6]

// ---------------------------------------------------------------------------------
// Images & Sprites
// ---------------------------------------------------------------------------------

let spriteSheet = new Image();
let road_sprite_1 = new Image();
let road_sprite_2 = new Image();
let road_sprite_3 = new Image();
let road_sprite_4 = new Image();
let road_sprite_5 = new Image();
let grass_sprite_1 = new Image();
let grass_sprite_2 = new Image();
let grass_sprite_3 = new Image();

let roadTextures = [road_sprite_1, road_sprite_2, road_sprite_3, road_sprite_4, road_sprite_5]
let grassTextures = [grass_sprite_1, grass_sprite_2, grass_sprite_3]

const COLORS = {
    LIGHT:	{road: '#888888', grass: '#48a15a', grassTexture: 0 , shoulder: '#BCBCBC', lane: '#FFFFFF'},
    DARK:	{road: '#666666', grass: '#398246', grassTexture: 1 , shoulder: '#FF0000'},
    DARKER:	{road: '#444444', grass: '#3b924c', grassTexture: 2 , shoulder: '#BCBCBC'}
};

const redCarMaxSteerLeft = [spriteSheet, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerLeft = [spriteSheet, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerLeft = [spriteSheet, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarCenter = [spriteSheet, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerRight = [spriteSheet, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerRight = [spriteSheet, 640, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMaxSteerRight = [spriteSheet, 768, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerLeft = [spriteSheet, 0, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerLeft = [spriteSheet, 128, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerLeft = [spriteSheet, 256, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter = [spriteSheet, 384, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerRight = [spriteSheet, 512, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerRight = [spriteSheet, 640, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight = [spriteSheet, 768, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerLeft = [spriteSheet, 0, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerLeft = [spriteSheet, 128, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerLeft = [spriteSheet, 256, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter = [spriteSheet, 384, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerRight = [spriteSheet, 512, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerRight = [spriteSheet, 640, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight = [spriteSheet, 768, 256, SPRITE_SIZE, SPRITE_SIZE]
const racerShark = [spriteSheet, 0, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerGiraffe = [spriteSheet, 128, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerBear = [spriteSheet, 256, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerPolarBear = [spriteSheet, 384, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerMonkey = [spriteSheet, 512, 384, SPRITE_SIZE, SPRITE_SIZE]
const jeep1 = [spriteSheet, 640, 384, SPRITE_SIZE, SPRITE_SIZE]
const jeep2 = [spriteSheet, 768, 384, SPRITE_SIZE, SPRITE_SIZE]

const greenPlayerSprites = {maxLeft: greenCarMaxSteerLeft, medLeft: greenCarMedSteerLeft,
                            minLeft: greenCarMinSteerLeft, center: greenCarCenter,
                            minRight: greenCarMinSteerRight, medRight: greenCarMedSteerRight,
                            maxRight: greenCarMaxSteerRight}

const redPlayerSprites = {maxLeft: redCarMaxSteerLeft, medLeft: redCarMedSteerLeft,
                            minLeft: redCarMinSteerLeft, center: redCarCenter,
                            minRight: redCarMinSteerRight, medRight: redCarMedSteerRight,
                            maxRight: redCarMaxSteerRight}

const bluePlayerSprites = {maxLeft: blueCarMaxSteerLeft, medLeft: blueCarMedSteerLeft,
                            minLeft: blueCarMinSteerLeft, center: blueCarCenter,
                            minRight: blueCarMinSteerRight, medRight: blueCarMedSteerRight,
                            maxRight: blueCarMaxSteerRight}

// ---------------------------------------------------------------------------------
// Music & Sounds
// ---------------------------------------------------------------------------------
const gameMusic = new Audio("sounds/passing_breeze.mp3");
