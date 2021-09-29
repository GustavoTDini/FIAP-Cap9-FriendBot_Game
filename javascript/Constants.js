// ---------------------------------------------------------------------------------
// Global Constants
// ---------------------------------------------------------------------------------

// Sizes
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const SPRITE_SIZE = 128;
const LARGE_SPRITE_SIZE = 2*SPRITE_SIZE
const UI_SPRITE_SIZE = 50
const CANVAS_CENTER_X = CANVAS_WIDTH/2;
const CANVAS_CENTER_Y = CANVAS_HEIGHT/2;
const FPS = 60;
const UPS = 120;
const FRAME_STEP = 1/FPS
const UPDATE_STEP = 1/UPS
const SEGMENT_LENGTH = 100;
const MAX_ROAD_WIDTH = 1000;
const MAX_SPEED = (SEGMENT_LENGTH/UPDATE_STEP);


//States
const LOADING_STATE = 0;
const SET_STATE = 1;
const PLAY_STATE = 2;
const PAUSE_STATE = 3;
const GAME_OVER_STATE = 4;

//Player Colors
const GREEN = "GREEN";
const BLUE = "BLUE";
const RED = "RED";

//Player Difficulties
const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

//Player Difficulties
const DIFFICULTIES_SETS = {
  EASY: {
      STARS_SCORES: [10000, 50000,100000],
      START_SPEED: MAX_SPEED/10,
      MAX_SPEED:  MAX_SPEED/2,
      MAX_CARS: 10,
      MAX_CARS_SPEEDS: MAX_SPEED/10
  } ,
    MEDIUM: {
        STARS_SCORES: [50000,150000,300000],
        START_SPEED: MAX_SPEED/8,
        MAX_SPEED:  MAX_SPEED*0.75,
        MAX_CARS: 20,
        MAX_CARS_SPEEDS: MAX_SPEED/3
    },
    HARD: {
        STARS_SCORES: [100000,300000,500000],
        START_SPEED: MAX_SPEED,
        MAX_SPEED:  MAX_SPEED,
        MAX_CARS: 50,
        MAX_CARS_SPEEDS: MAX_SPEED*0.75
    },
}


//kEYS
const ALLOWED_KEYS = {
    "ArrowLeft": 'left',
    "ArrowRight": 'right',
    "Space": 'pause',
    "ArrowUp": 'jump'
};

//Road Segments
const ROAD = {
    LENGTH: { NONE: 0, SHORT:  25, MEDIUM:  50, LONG:  100 },
    HILL:   { NONE: 0, LOW:    20, MEDIUM:  40, HIGH:   60 },
    CURVE:  { NONE: 0, EASY:    2, MEDIUM:   4, HARD:    6 }
};

//Road Lanes
const ROAD_LANES = [-0.65, -0.2, 0.2, 0.65]

// Power Ups
const TURBO = 8
const TRANSPARENT = 9
const DOUBLE = 10
const SHIELD = 11


// animals
const GUARA = 12
const JAGUAR = 13
const DOG_1 = 14
const CAT = 15
const COW = 16
const HORSE = 17
const DOG_2 = 18
const CAPIVARA = 19
const TURTLE = 20
const DOG_3 = 21


// ---------------------------------------------------------------------------------
// Images & Sprites
// ---------------------------------------------------------------------------------

let images = {
    spritesheet_road: new Image(),
    spritesheet_side_road: new Image(),
    spriteSheet_UI: new Image(),
    background_sky: new Image(),
    background_mountain: new Image(),
    background_trees: new Image(),
    road_sprite_1: new Image(),
    road_sprite_2: new Image(),
    road_sprite_3: new Image(),
    road_sprite_4: new Image(),
    road_sprite_5: new Image(),
    grass_texture_1: new Image(),
    grass_texture_2: new Image(),
    grass_texture_3: new Image(),
}

let roadTextures = [images.road_sprite_1, images.road_sprite_2, images.road_sprite_3, images.road_sprite_4, images.road_sprite_5]
let grassTextures = [images.grass_texture_1, images.grass_texture_2, images.grass_texture_3]

const COLORS = {
    LIGHT:	{road: '#888888', grass: '#48a15a', grassTextures: 0, shoulder: '#BCBCBC', lane: '#FFFFFF'},
    DARK:	{road: '#666666', grass: '#398246', grassTextures: 1, shoulder: '#FF0000'},
    DARKER:	{road: '#444444', grass: '#398246', grassTextures: 2, shoulder: '#BCBCBC'},
    SKY: "#CFEFFC",
    GRASS: "#20BA75"
};


// ---------------------------------------------------------------------------------
// In Road Sprites
// ---------------------------------------------------------------------------------
const redCarMaxSteerLeft = [images.spritesheet_road, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerLeft = [images.spritesheet_road, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerLeft = [images.spritesheet_road, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarCenter = [images.spritesheet_road, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerRight = [images.spritesheet_road, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerRight = [images.spritesheet_road, 640, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMaxSteerRight = [images.spritesheet_road, 768, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerLeft = [images.spritesheet_road, 0, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerLeft = [images.spritesheet_road, 128, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerLeft = [images.spritesheet_road, 256, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter = [images.spritesheet_road, 384, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerRight = [images.spritesheet_road, 512, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerRight = [images.spritesheet_road, 640, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight = [images.spritesheet_road, 768, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerLeft = [images.spritesheet_road, 0, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerLeft = [images.spritesheet_road, 128, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerLeft = [images.spritesheet_road, 256, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter = [images.spritesheet_road, 384, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerRight = [images.spritesheet_road, 512, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerRight = [images.spritesheet_road, 640, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight = [images.spritesheet_road, 768, 256, SPRITE_SIZE, SPRITE_SIZE]
const racerShark = [images.spritesheet_road, 0, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerGiraffe = [images.spritesheet_road, 128, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerBear = [images.spritesheet_road, 256, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerPolarBear = [images.spritesheet_road, 384, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerMonkey = [images.spritesheet_road, 512, 384, SPRITE_SIZE, SPRITE_SIZE]
const jeep = [images.spritesheet_road, 640, 384, SPRITE_SIZE, SPRITE_SIZE]
const rock = [images.spritesheet_road, 768, 384, SPRITE_SIZE, SPRITE_SIZE]
const coin1 = [images.spritesheet_road, 0, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin2 = [images.spritesheet_road, 128, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin3 = [images.spritesheet_road, 256, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin4 = [images.spritesheet_road, 384, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin5 = [images.spritesheet_road, 512, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin6 = [images.spritesheet_road, 640, 512, SPRITE_SIZE, SPRITE_SIZE]
const log = [images.spritesheet_road, 768, 512, SPRITE_SIZE, SPRITE_SIZE]
const jaguar1Left = [images.spritesheet_road, 0, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar2Left = [images.spritesheet_road, 128, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar3Left = [images.spritesheet_road, 256, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar4Left = [images.spritesheet_road, 384, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar5Left = [images.spritesheet_road, 512, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar1Right = [images.spritesheet_road, 0, 896, SPRITE_SIZE, SPRITE_SIZE]
const jaguar2Right = [images.spritesheet_road, 128, 896, SPRITE_SIZE, SPRITE_SIZE]
const jaguar3Right = [images.spritesheet_road, 256, 896, SPRITE_SIZE, SPRITE_SIZE]
const jaguar4Right = [images.spritesheet_road, 384, 896, SPRITE_SIZE, SPRITE_SIZE]
const jaguar5Right = [images.spritesheet_road, 512, 896, SPRITE_SIZE, SPRITE_SIZE]
const turbo1 = [images.spritesheet_road, 640, 640, SPRITE_SIZE, SPRITE_SIZE]
const turbo2 = [images.spritesheet_road, 768, 640, SPRITE_SIZE, SPRITE_SIZE]
const guara1Left = [images.spritesheet_road, 0, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara2Left = [images.spritesheet_road, 128, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara3Left = [images.spritesheet_road, 256, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara4Left = [images.spritesheet_road, 384, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara5Left = [images.spritesheet_road, 512, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara1Right = [images.spritesheet_road, 0, 1024, SPRITE_SIZE, SPRITE_SIZE]
const guara2Right = [images.spritesheet_road, 128, 1024, SPRITE_SIZE, SPRITE_SIZE]
const guara3Right = [images.spritesheet_road, 256, 1024, SPRITE_SIZE, SPRITE_SIZE]
const guara4Right = [images.spritesheet_road, 384, 1024, SPRITE_SIZE, SPRITE_SIZE]
const guara5Right = [images.spritesheet_road, 512, 1024, SPRITE_SIZE, SPRITE_SIZE]
const transparent1 = [images.spritesheet_road, 640, 768, SPRITE_SIZE, SPRITE_SIZE]
const transparent2 = [images.spritesheet_road, 768, 768, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Side Road Sprites
// ---------------------------------------------------------------------------------
const tree = [images.spritesheet_side_road, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cliff = [images.spritesheet_side_road, 256, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const billboard1 = [images.spritesheet_side_road, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const billboard2 = [images.spritesheet_side_road, 768, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const animalSign = [images.spritesheet_side_road, 0, 256, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const tunnel = [images.spritesheet_side_road, 256, 256, 2*LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const palmTree = [images.spritesheet_side_road, 768, 256, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// UI Sprites
// ---------------------------------------------------------------------------------
const UIWindow = [images.spriteSheet_UI, 0, 0, 300, 336]
const UIPause = [images.spriteSheet_UI, 300, 0, UI_SPRITE_SIZE*2, UI_SPRITE_SIZE*2]
const UICloseButton = [images.spriteSheet_UI, 400, 0, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIReturnButton = [images.spriteSheet_UI, 400, 50, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIEmptyStar = [images.spriteSheet_UI, 450, 0, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIFullStar = [images.spriteSheet_UI, 450, 50, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UISemaphore = [images.spriteSheet_UI, 500, 0, 260, 2*UI_SPRITE_SIZE]
const UIPanel = [images.spriteSheet_UI, 300, 100, 500, 2*UI_SPRITE_SIZE]
const UIStar = [images.spriteSheet_UI, 300, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI1 = [images.spriteSheet_UI, 350, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI2 = [images.spriteSheet_UI, 400, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI3 = [images.spriteSheet_UI, 450, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI4 = [images.spriteSheet_UI, 500, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI5 = [images.spriteSheet_UI, 550, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI6 = [images.spriteSheet_UI, 600, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI7 = [images.spriteSheet_UI, 650, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI8 = [images.spriteSheet_UI, 700, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI9 = [images.spriteSheet_UI, 750, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI0 = [images.spriteSheet_UI, 800, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIWin = [images.spriteSheet_UI, 300, 250, 220, UI_SPRITE_SIZE]
const UIScore = [images.spriteSheet_UI, 300, 300, 160, UI_SPRITE_SIZE]
const UIGreenLamp = [images.spriteSheet_UI, 550, 250, 260, 2*UI_SPRITE_SIZE]
const UIRedLamp = [images.spriteSheet_UI, 500, 0, 260, 2*UI_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Sprites Groups
// ---------------------------------------------------------------------------------
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

const roadSidesSprites = [tree, cliff, billboard1, billboard2, animalSign, palmTree]

const racers = [racerShark, racerGiraffe, racerBear, racerPolarBear, racerMonkey]

const numbers = [UI0, UI1, UI2, UI3, UI4, UI5, UI6, UI7, UI8, UI9]

// ---------------------------------------------------------------------------------
// Music & Sounds
// ---------------------------------------------------------------------------------

let sounds = [
    "passing_breeze",
    "coin",
    "hit",
    "jump",
    "tire",
    "turbo",
    "fail",
    "pause"]

let contextSounds = {
}

