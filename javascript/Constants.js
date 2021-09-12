// ---------------------------------------------------------------------------------
// Global Constants
// ---------------------------------------------------------------------------------

// Sizes
const SPRITE_SIZE = 128;
const LARGE_SPRITE_SIZE = 2*SPRITE_SIZE
const UI_SPRITE_SIZE = 50
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const CANVAS_CENTER_X = CANVAS_WIDTH/2;
const CANVAS_CENTER_Y = CANVAS_HEIGHT/2;
const FPS = 60;
const STEP = 1/FPS
const SEGMENT_LENGTH = 100;
const MAX_ROAD_WIDTH = 1000;
const MAX_SPEED = (SEGMENT_LENGTH/STEP);


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

//Player Difficulties
const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

//Player Difficulties
const DIFFICULTIES_SETS = {
  EASY: {
      STARS_SCORES: [10000, 50000,100000],
      MAX_SPEED:  MAX_SPEED/2,
      MAX_CARS: 10,
      MAX_CARS_SPEEDS: MAX_SPEED/10
  } ,
    MEDIUM: {
        STARS_SCORES: [50000,150000,300000],
        MAX_SPEED:  MAX_SPEED*0.75,
        MAX_CARS: 20,
        MAX_CARS_SPEEDS: MAX_SPEED/3
    },
    HARD: {
        STARS_SCORES: [100000,300000,500000],
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

//Road Segments
const ROAD_LANES = [-0.6, -0.2, 0.2, 0.6]

// ---------------------------------------------------------------------------------
// Images & Sprites
// ---------------------------------------------------------------------------------

let spriteSheet_road = new Image();
let spriteSheet_road_side = new Image();
let spriteSheet_ui = new Image();
let background_sky = new Image();
let background_mountain = new Image();
let background_trees = new Image();
let road_sprite_1 = new Image();
let road_sprite_2 = new Image();
let road_sprite_3 = new Image();
let road_sprite_4 = new Image();
let road_sprite_5 = new Image();

let roadTextures = [road_sprite_1, road_sprite_2, road_sprite_3, road_sprite_4, road_sprite_5]

const COLORS = {
    LIGHT:	{road: '#888888', grass: '#48a15a', shoulder: '#BCBCBC', lane: '#FFFFFF'},
    DARK:	{road: '#666666', grass: '#398246', shoulder: '#FF0000'},
    DARKER:	{road: '#444444', grass: '#3b924c', shoulder: '#BCBCBC'},
    SKY: "#CFEFFC",
    GRASS: "#20BA75"
};


// ---------------------------------------------------------------------------------
// In Road Sprites
// ---------------------------------------------------------------------------------
const redCarMaxSteerLeft = [spriteSheet_road, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerLeft = [spriteSheet_road, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerLeft = [spriteSheet_road, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarCenter = [spriteSheet_road, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMinSteerRight = [spriteSheet_road, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMedSteerRight = [spriteSheet_road, 640, 0, SPRITE_SIZE, SPRITE_SIZE]
const redCarMaxSteerRight = [spriteSheet_road, 768, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerLeft = [spriteSheet_road, 0, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerLeft = [spriteSheet_road, 128, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerLeft = [spriteSheet_road, 256, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter = [spriteSheet_road, 384, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMinSteerRight = [spriteSheet_road, 512, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMedSteerRight = [spriteSheet_road, 640, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight = [spriteSheet_road, 768, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerLeft = [spriteSheet_road, 0, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerLeft = [spriteSheet_road, 128, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerLeft = [spriteSheet_road, 256, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter = [spriteSheet_road, 384, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMinSteerRight = [spriteSheet_road, 512, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMedSteerRight = [spriteSheet_road, 640, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight = [spriteSheet_road, 768, 256, SPRITE_SIZE, SPRITE_SIZE]
const racerShark = [spriteSheet_road, 0, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerGiraffe = [spriteSheet_road, 128, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerBear = [spriteSheet_road, 256, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerPolarBear = [spriteSheet_road, 384, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerMonkey = [spriteSheet_road, 512, 384, SPRITE_SIZE, SPRITE_SIZE]
const jeep = [spriteSheet_road, 640, 384, SPRITE_SIZE, SPRITE_SIZE]
const rock = [spriteSheet_road, 768, 384, SPRITE_SIZE, SPRITE_SIZE]
const coin1 = [spriteSheet_road, 0, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin2 = [spriteSheet_road, 128, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin3 = [spriteSheet_road, 256, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin4 = [spriteSheet_road, 384, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin5 = [spriteSheet_road, 512, 512, SPRITE_SIZE, SPRITE_SIZE]
const coin6 = [spriteSheet_road, 640, 512, SPRITE_SIZE, SPRITE_SIZE]
const log = [spriteSheet_road, 768, 512, SPRITE_SIZE, SPRITE_SIZE]
const jaguar1 = [spriteSheet_road, 0, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar2 = [spriteSheet_road, 128, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar3 = [spriteSheet_road, 256, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar4 = [spriteSheet_road, 384, 640, SPRITE_SIZE, SPRITE_SIZE]
const jaguar5 = [spriteSheet_road, 512, 640, SPRITE_SIZE, SPRITE_SIZE]
const transparent1 = [spriteSheet_road, 640, 640, SPRITE_SIZE, SPRITE_SIZE]
const transparent2 = [spriteSheet_road, 768, 640, SPRITE_SIZE, SPRITE_SIZE]
const guara1 = [spriteSheet_road, 0, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara2 = [spriteSheet_road, 128, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara3 = [spriteSheet_road, 256, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara4 = [spriteSheet_road, 384, 768, SPRITE_SIZE, SPRITE_SIZE]
const guara5 = [spriteSheet_road, 512, 768, SPRITE_SIZE, SPRITE_SIZE]
const turbo1 = [spriteSheet_road, 640, 768, SPRITE_SIZE, SPRITE_SIZE]
const turbo2 = [spriteSheet_road, 768, 768, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Side Road Sprites
// ---------------------------------------------------------------------------------
const tree = [spriteSheet_road_side, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cliff = [spriteSheet_road_side, 256, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const billboard1 = [spriteSheet_road_side, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const billboard2 = [spriteSheet_road_side, 768, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const animalSign = [spriteSheet_road_side, 0, 256, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const tunnel = [spriteSheet_road_side, 256, 256, 2*LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const palmTree = [spriteSheet_road_side, 768, 256, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// UI Sprites
// ---------------------------------------------------------------------------------
const UIWindow = [spriteSheet_ui, 0, 0, 300, 336]
const UIPause = [spriteSheet_ui, 300, 0, UI_SPRITE_SIZE*2, UI_SPRITE_SIZE*2]
const UICloseButton = [spriteSheet_ui, 400, 0, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIReturnButton = [spriteSheet_ui, 400, 50, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIEmptyStar = [spriteSheet_ui, 450, 0, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIFullStar = [spriteSheet_ui, 450, 50, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIRedLamp = [spriteSheet_ui, 500, 0, 260, 2*UI_SPRITE_SIZE]
const UIPanel = [spriteSheet_ui, 300, 100, 500, 2*UI_SPRITE_SIZE]
const UIStar = [spriteSheet_ui, 300, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI1 = [spriteSheet_ui, 350, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI2 = [spriteSheet_ui, 400, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI3 = [spriteSheet_ui, 450, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI4 = [spriteSheet_ui, 500, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI5 = [spriteSheet_ui, 550, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI6 = [spriteSheet_ui, 600, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI7 = [spriteSheet_ui, 650, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI8 = [spriteSheet_ui, 700, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI9 = [spriteSheet_ui, 750, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UI0 = [spriteSheet_ui, 800, 200, UI_SPRITE_SIZE, UI_SPRITE_SIZE]
const UIWin = [spriteSheet_ui, 300, 250, 220, UI_SPRITE_SIZE]
const UIScore = [spriteSheet_ui, 300, 300, 160, UI_SPRITE_SIZE]
const UIGreenLamp = [spriteSheet_ui, 550, 250, 260, 2*UI_SPRITE_SIZE]

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
const gameMusic = new Audio("sounds/passing_breeze.mp3");
