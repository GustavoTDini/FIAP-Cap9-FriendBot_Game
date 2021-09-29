// ---------------------------------------------------------------------------------
// Global Constants
// ---------------------------------------------------------------------------------

// Sizes
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const SPRITE_SIZE = 128;
const LARGE_SPRITE_SIZE = 4*SPRITE_SIZE
const UI_SPRITE_SIZE = 50
const CANVAS_CENTER_X = CANVAS_WIDTH/2;
const CANVAS_CENTER_Y = CANVAS_HEIGHT/2;
const FPS = 60;
const UPS = 120;
const FRAME_STEP = 1/FPS
const UPDATE_STEP = 1/UPS
const SEGMENT_LENGTH = 100;
const MAX_ROAD_WIDTH = 1000;
const MAX_SPEED = (SEGMENT_LENGTH/UPDATE_STEP)*4;


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
const DOG_SUB = 14
const CAT = 15
const COW = 16
const HORSE = 17
const DOG_CITY = 18
const CAPIVARA = 19
const TURTLE = 20
const DOG_BEACH = 21


// ---------------------------------------------------------------------------------
// Images & Sprites
// ---------------------------------------------------------------------------------

let images = {
    beach_sky: new Image(),
    beach_bc_1: new Image(),
    beach_bc_2: new Image(),
    beach_bc_3: new Image(),
    beach_texture_1: new Image(),
    beach_texture_2: new Image(),
    beach_texture_3: new Image(),
    beach_road_sprite_1: new Image(),
    beach_road_sprite_2: new Image(),
    beach_road_sprite_3: new Image(),
    beach_road_sprite_4: new Image(),
    beach_road_sprite_5: new Image(),
    city_sky: new Image(),
    city_bc_1: new Image(),
    city_bc_2: new Image(),
    city_bc_3: new Image(),
    city_texture_1: new Image(),
    city_texture_2: new Image(),
    city_texture_3: new Image(),
    city_road_sprite_1: new Image(),
    city_road_sprite_2: new Image(),
    city_road_sprite_3: new Image(),
    city_road_sprite_4: new Image(),
    city_road_sprite_5: new Image(),
    farm_sky: new Image(),
    farm_bc_1: new Image(),
    farm_bc_2: new Image(),
    farm_bc_3: new Image(),
    farm_texture_1: new Image(),
    farm_texture_2: new Image(),
    farm_texture_3: new Image(),
    farm_road_sprite_1: new Image(),
    farm_road_sprite_2: new Image(),
    farm_road_sprite_3: new Image(),
    farm_road_sprite_4: new Image(),
    farm_road_sprite_5: new Image(),
    forest_sky: new Image(),
    forest_bc_1: new Image(),
    forest_bc_2: new Image(),
    forest_bc_3: new Image(),
    forest_texture_1: new Image(),
    forest_texture_2: new Image(),
    forest_texture_3: new Image(),
    forest_road_sprite_1: new Image(),
    forest_road_sprite_2: new Image(),
    forest_road_sprite_3: new Image(),
    forest_road_sprite_4: new Image(),
    forest_road_sprite_5: new Image(),
    sub_sky: new Image(),
    sub_bc_1: new Image(),
    sub_bc_2: new Image(),
    sub_bc_3: new Image(),
    sub_texture_1: new Image(),
    sub_texture_2: new Image(),
    sub_texture_3: new Image(),
    sub_road_sprite_1: new Image(),
    sub_road_sprite_2: new Image(),
    sub_road_sprite_3: new Image(),
    sub_road_sprite_4: new Image(),
    sub_road_sprite_5: new Image(),
    racers_spritesheet: new Image(),
    GUI_Spritesheet: new Image(),
    items_spritesheet: new Image(),
    menu_spritesheet: new Image(),
    power_ups_icons_spritesheet: new Image(),
    explosions_spritesheet: new Image(),
    start_spritesheet: new Image(),
    game_over_spritesheet: new Image(),
    scenario_common_spritesheet: new Image(),
    beach_spritesheet: new Image(),
    scenario_beach_spritesheet: new Image(),
    city_spritesheet: new Image(),
    scenario_city_spritesheet: new Image(),
    farm_spritesheet: new Image(),
    scenario_farm_spritesheet: new Image(),
    forest_spritesheet: new Image(),
    scenario_forest_spritesheet: new Image(),
    suburb_spritesheet: new Image(),
    scenario_sub_spritesheet: new Image(),
}

let beachRoadTextures = [images.beach_road_sprite_1, images.beach_road_sprite_2, images.beach_road_sprite_3, images.beach_road_sprite_4, images.beach_road_sprite_5]
let cityRoadTextures = [images.city_road_sprite_1, images.city_road_sprite_2, images.city_road_sprite_3, images.city_road_sprite_4, images.city_road_sprite_5]
let farmRoadTextures = [images.farm_road_sprite_1, images.farm_road_sprite_2, images.farm_road_sprite_3, images.farm_road_sprite_4, images.farm_road_sprite_5]
let forestRoadTextures = [images.forest_road_sprite_1, images.forest_road_sprite_2, images.forest_road_sprite_3, images.forest_road_sprite_4, images.forest_road_sprite_5]
let subRoadTextures = [images.sub_road_sprite_1, images.sub_road_sprite_2, images.sub_road_sprite_3, images.sub_road_sprite_4, images.sub_road_sprite_5]
let beachSideTextures = [images.beach_texture_1, images.beach_texture_2, images.beach_texture_3]
let citySideTextures = [images.city_texture_1, images.city_texture_2, images.city_texture_3]
let farmSideTextures = [images.farm_texture_1, images.farm_texture_2, images.farm_texture_3]
let forestSideTextures = [images.forest_texture_1, images.forest_texture_2, images.forest_texture_3]
let subSideTextures = [images.sub_texture_1, images.sub_texture_2, images.sub_texture_3]

const BEACH_COLORS = {
    LIGHT:	{road: '#F5D890', grass: '#F5D890', grassTextures: 0, shoulder: '#F5D890', lane: '#4b3702'},
    DARK:	{road: '#a89263', grass: '#e1cfad', grassTextures: 1, shoulder: '#4b3702'},
    DARKER:	{road: '#947c3b', grass: '#a9a18a', grassTextures: 2, shoulder: '#F5D890'},
};
const CITY_COLORS = {
    LIGHT:	{road: '#888888', grass: '#5e5e5e', grassTextures: 0, shoulder: '#BCBCBC', lane: '#FFFFFF'},
    DARK:	{road: '#666666', grass: '#a2a2a2', grassTextures: 1, shoulder: '#FF0000'},
    DARKER:	{road: '#444444', grass: '#e5e5e5', grassTextures: 2, shoulder: '#BCBCBC'},
};
const FARM_COLORS = {
    LIGHT:	{road: '#888888', grass: '#48a15a', grassTextures: 0, shoulder: '#BCBCBC', lane: '#FFFFFF'},
    DARK:	{road: '#666666', grass: '#398246', grassTextures: 1, shoulder: '#FFFFFF'},
    DARKER:	{road: '#444444', grass: '#398246', grassTextures: 2, shoulder: '#BCBCBC'},
};
const FOREST_COLORS = {
    LIGHT:	{road: '#937545', grass: '#4C8924', grassTextures: 0, shoulder: '#725e2a', lane: '#261d01'},
    DARK:	{road: '#564428', grass: '#70c735', grassTextures: 1, shoulder: '#56da3d'},
    DARKER:	{road: '#3d311d', grass: '#2f5d18', grassTextures: 2, shoulder: '#725e2a'},
};
const SUB_COLORS = {
    LIGHT:	{road: '#646466', grass: '#B36820', grassTextures: 0, shoulder: '#078116', lane: '#000000'},
    DARK:	{road: '#484849', grass: '#e38b3a', grassTextures: 1, shoulder: '#ffcc00'},
    DARKER:	{road: '#333333', grass: '#8d5313', grassTextures: 2, shoulder: '#078116'},
};

// ---------------------------------------------------------------------------------
// Player Sprites
// ---------------------------------------------------------------------------------
const greenCarMaxSteerLeft_1 = [images.racers_spritesheet, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerLeft_2 = [images.racers_spritesheet, 0, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerLeft_3 = [images.racers_spritesheet, 0, 256, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerLeft_1 = [images.racers_spritesheet, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerLeft_2 = [images.racers_spritesheet, 128, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerLeft_3 = [images.racers_spritesheet, 128, 256, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter_1 = [images.racers_spritesheet, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter_2 = [images.racers_spritesheet, 256, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarCenter_3 = [images.racers_spritesheet, 256, 256, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerRight_1 = [images.racers_spritesheet, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerRight_2 = [images.racers_spritesheet, 384, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarSteerRight_3 = [images.racers_spritesheet, 384, 256, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight_1 = [images.racers_spritesheet, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight_2 = [images.racers_spritesheet, 512, 128, SPRITE_SIZE, SPRITE_SIZE]
const greenCarMaxSteerRight_3 = [images.racers_spritesheet, 512, 256, SPRITE_SIZE, SPRITE_SIZE]

const pinkCarMaxSteerLeft_1 = [images.racers_spritesheet, 0, 384, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarMaxSteerLeft_2 = [images.racers_spritesheet, 0, 512, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarMaxSteerLeft_3 = [images.racers_spritesheet, 0, 640, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerLeft_1 = [images.racers_spritesheet, 128, 384, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerLeft_2 = [images.racers_spritesheet, 128, 512, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerLeft_3 = [images.racers_spritesheet, 128, 640, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarCenter_1 = [images.racers_spritesheet, 256, 384, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarCenter_2 = [images.racers_spritesheet, 256, 512, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarCenter_3 = [images.racers_spritesheet, 256, 640, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerRight_1 = [images.racers_spritesheet, 384, 384, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerRight_2 = [images.racers_spritesheet, 384, 512, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarSteerRight_3 = [images.racers_spritesheet, 384, 640, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarMaxSteerRight_1 = [images.racers_spritesheet, 512, 384, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarMaxSteerRight_2 = [images.racers_spritesheet, 512, 512, SPRITE_SIZE, SPRITE_SIZE]
const pinkCarMaxSteerRight_3 = [images.racers_spritesheet, 512, 640, SPRITE_SIZE, SPRITE_SIZE]

const blueCarMaxSteerLeft_1 = [images.racers_spritesheet, 768, 384, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerLeft_2 = [images.racers_spritesheet, 768, 512, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerLeft_3 = [images.racers_spritesheet, 768, 640, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerLeft_1 = [images.racers_spritesheet, 640, 384, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerLeft_2 = [images.racers_spritesheet, 640, 512, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerLeft_3 = [images.racers_spritesheet, 640, 640, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter_1 = [images.racers_spritesheet, 640, 0, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter_2 = [images.racers_spritesheet, 640, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarCenter_3 = [images.racers_spritesheet, 640, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerRight_1 = [images.racers_spritesheet, 768, 0, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerRight_2 = [images.racers_spritesheet, 768, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarSteerRight_3 = [images.racers_spritesheet, 768, 256, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight_1 = [images.racers_spritesheet, 896, 0, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight_2 = [images.racers_spritesheet, 896, 128, SPRITE_SIZE, SPRITE_SIZE]
const blueCarMaxSteerRight_3 = [images.racers_spritesheet, 896, 256, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Racers Sprites
// ---------------------------------------------------------------------------------
const racerShark = [images.racers_spritesheet, 1024, 512, SPRITE_SIZE, SPRITE_SIZE]
const racerGiraffe = [images.racers_spritesheet, 896, 512, SPRITE_SIZE, SPRITE_SIZE]
const racerBear = [images.racers_spritesheet, 1024, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerPolarBear = [images.racers_spritesheet, 896, 384, SPRITE_SIZE, SPRITE_SIZE]
const racerMonkey = [images.racers_spritesheet, 896, 640, SPRITE_SIZE, SPRITE_SIZE]
const racerPanda1 = [images.racers_spritesheet, 1024, 0, SPRITE_SIZE, SPRITE_SIZE]
const racerPanda2 = [images.racers_spritesheet, 1024, 128, SPRITE_SIZE, SPRITE_SIZE]
const racerPanda3 = [images.racers_spritesheet, 1024, 256, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Items Sprites
// ---------------------------------------------------------------------------------
const coin1 = [images.items_spritesheet, 0, 0, SPRITE_SIZE, SPRITE_SIZE]
const coin2 = [images.items_spritesheet, 128, 0, SPRITE_SIZE, SPRITE_SIZE]
const coin3 = [images.items_spritesheet, 256, 0, SPRITE_SIZE, SPRITE_SIZE]
const coin4 = [images.items_spritesheet, 384, 0, SPRITE_SIZE, SPRITE_SIZE]
const coin5 = [images.items_spritesheet, 512, 0, SPRITE_SIZE, SPRITE_SIZE]
const coin6 = [images.items_spritesheet, 0, 128, SPRITE_SIZE, SPRITE_SIZE]
const gas1 = [images.items_spritesheet, 128, 128, SPRITE_SIZE, SPRITE_SIZE]
const gas2 = [images.items_spritesheet, 256, 128, SPRITE_SIZE, SPRITE_SIZE]
const gas3 = [images.items_spritesheet, 384, 128, SPRITE_SIZE, SPRITE_SIZE]
const gas4 = [images.items_spritesheet, 512, 128, SPRITE_SIZE, SPRITE_SIZE]
const gas5 = [images.items_spritesheet, 0, 256, SPRITE_SIZE, SPRITE_SIZE]
const gas6 = [images.items_spritesheet, 128, 256, SPRITE_SIZE, SPRITE_SIZE]
const boltItem1 = [images.items_spritesheet, 256, 256, SPRITE_SIZE, SPRITE_SIZE]
const boltItem2 = [images.items_spritesheet, 384, 256, SPRITE_SIZE, SPRITE_SIZE]
const turboItem1 = [images.items_spritesheet, 512, 256, SPRITE_SIZE, SPRITE_SIZE]
const turboItem2 = [images.items_spritesheet, 0, 384, SPRITE_SIZE, SPRITE_SIZE]
const shieldItem1 = [images.items_spritesheet, 128, 384, SPRITE_SIZE, SPRITE_SIZE]
const shieldItem2 = [images.items_spritesheet, 256, 384, SPRITE_SIZE, SPRITE_SIZE]
const doubleItem1 = [images.items_spritesheet, 384, 384, SPRITE_SIZE, SPRITE_SIZE]
const doubleItem2 = [images.items_spritesheet, 512, 384, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Start Sprites
// ---------------------------------------------------------------------------------
const go1 = [images.start_spritesheet, 0, 0, 750, 100]
const go2 = [images.start_spritesheet, 0, 100, 750, 100]
const lights_out = [images.start_spritesheet, 750, 0, 200, 100]
const lights_red = [images.start_spritesheet, 850, 0, 200, 100]
const lights_green = [images.start_spritesheet, 950, 0, 200, 100]

// ---------------------------------------------------------------------------------
// Effects Sprites
// ---------------------------------------------------------------------------------
const star1 = [images.explosions_spritesheet, 0, 0, 64, 64]
const star2 = [images.explosions_spritesheet, 64, 0, 64, 64]
const star3 = [images.explosions_spritesheet, 128, 0, 64, 64]
const star4 = [images.explosions_spritesheet, 192, 0, 64, 64]
const star5 = [images.explosions_spritesheet, 0,  64, 64, 64]
const star6 = [images.explosions_spritesheet, 64, 64, 64, 64]
const star7 = [images.explosions_spritesheet, 128, 64, 64, 64]
const star8 = [images.explosions_spritesheet, 192, 64, 64, 64]
const star9 = [images.explosions_spritesheet, 0,  128, 64, 64]
const star10 = [images.explosions_spritesheet,64, 128, 64, 64]
const star11 = [images.explosions_spritesheet,128, 128, 64, 64]
const star12 = [images.explosions_spritesheet,192, 128, 64, 64]
const star13 = [images.explosions_spritesheet, 0,  192, 64, 64]
const star14 = [images.explosions_spritesheet, 64, 192, 64, 64]
const star15 = [images.explosions_spritesheet, 128, 192, 64, 64]
const star16 = [images.explosions_spritesheet, 192, 192, 64, 64]
const explosion1 = [images.explosions_spritesheet, 256, 0, 128, 128]
const explosion2 = [images.explosions_spritesheet, 384, 0, 128, 128]
const explosion3 = [images.explosions_spritesheet, 512, 0, 128, 128]
const explosion4 = [images.explosions_spritesheet, 640, 0, 128, 128]
const explosion5 = [images.explosions_spritesheet, 768,  0, 128, 128]
const explosion6 = [images.explosions_spritesheet, 896 , 0, 128, 128]
const explosion7 = [images.explosions_spritesheet, 1024, 0, 128, 128]
const explosion8 = [images.explosions_spritesheet, 1152, 0, 128, 128]
const explosion9 = [images.explosions_spritesheet, 1280,  0, 128, 128]
const turbo1 = [images.explosions_spritesheet, 256, 128, 64, 64]
const turbo2 = [images.explosions_spritesheet, 320, 128, 64, 64]
const turbo3 = [images.explosions_spritesheet, 384, 128, 64, 64]
const turbo4 = [images.explosions_spritesheet, 448, 128, 64, 64]
const turbo5 = [images.explosions_spritesheet, 512, 128, 64, 64]
const turbo6 = [images.explosions_spritesheet, 576, 128, 64, 64]
const turbo7 = [images.explosions_spritesheet, 640, 128, 64, 64]
const turbo8 = [images.explosions_spritesheet, 704, 128, 64, 64]
const turbo9 = [images.explosions_spritesheet, 768, 128, 64, 64]
const fire1 = [images.explosions_spritesheet, 256, 192, 64, 64]
const fire2 = [images.explosions_spritesheet, 320, 192, 64, 64]
const fire3 = [images.explosions_spritesheet, 384, 192, 64, 64]
const fire4 = [images.explosions_spritesheet, 448, 192, 64, 64]
const fire5 = [images.explosions_spritesheet, 512, 192, 64, 64]
const fire6 = [images.explosions_spritesheet, 576, 192, 64, 64]
const fire7 = [images.explosions_spritesheet, 640, 192, 64, 64]
const fire8 = [images.explosions_spritesheet, 704, 192, 64, 64]
const fire9 = [images.explosions_spritesheet, 768, 192, 64, 64]
const shield1 = [images.explosions_spritesheet, 0, 256, 128, 128]
const shield2 = [images.explosions_spritesheet, 128, 256, 128, 128]
const shield3 = [images.explosions_spritesheet, 256, 256, 128, 128]
const shield4 = [images.explosions_spritesheet, 384, 256, 128, 128]
const shield5 = [images.explosions_spritesheet, 512, 256, 128, 128]
const shield6 = [images.explosions_spritesheet, 640, 256, 128, 128]
const shield7 = [images.explosions_spritesheet, 768, 256, 128, 128]
const shield8 = [images.explosions_spritesheet, 896, 256, 128, 128]
const glitter1 = [images.explosions_spritesheet, 896  , 128, 128, 128]
const glitter2 = [images.explosions_spritesheet, 1024, 128, 128, 128]
const glitter3 = [images.explosions_spritesheet, 1152, 128, 128, 128]
const glitter4 = [images.explosions_spritesheet, 1280, 128, 128, 128]
const glitter5 = [images.explosions_spritesheet, 1024, 256, 128, 128]
const glitter6 = [images.explosions_spritesheet, 1152, 256, 128, 128]
const game_over1 = [images.game_over_spritesheet, 0 , 0, 450, 100]
const game_over2 = [images.game_over_spritesheet, 450, 0, 450, 100]
const game_over3 = [images.game_over_spritesheet, 900, 0, 450, 100]
const game_over4 = [images.game_over_spritesheet, 1350, 0, 450, 100]
const game_over5 = [images.game_over_spritesheet, 1800, 0, 450, 100]
const game_over6 = [images.game_over_spritesheet, 2250, 0, 450, 100]
const game_over7 = [images.game_over_spritesheet, 0 , 100, 450, 100]
const game_over8 = [images.game_over_spritesheet, 450, 100, 450, 100]
const game_over9 = [images.game_over_spritesheet, 900, 100, 450, 100]
const game_over10 = [images.game_over_spritesheet, 1350, 100, 450, 100]
const game_over11 = [images.game_over_spritesheet, 1800, 100, 450, 100]
const game_over12 = [images.game_over_spritesheet, 2250, 100, 450, 100]
const game_over13 = [images.game_over_spritesheet, 0 , 200, 450, 100]
const game_over14 = [images.game_over_spritesheet, 450, 200, 450, 100]
const game_over15 = [images.game_over_spritesheet, 900, 200, 450, 100]
const game_over16 = [images.game_over_spritesheet, 1350, 200, 450, 100]
const game_over17 = [images.game_over_spritesheet, 1800, 200, 450, 100]
const game_over18 = [images.game_over_spritesheet, 2250, 200, 450, 100]
const game_over19 = [images.game_over_spritesheet, 0 , 300, 450, 100]
const game_over20 = [images.game_over_spritesheet, 450, 300, 450, 100]
const game_over21 = [images.game_over_spritesheet, 900, 300, 450, 100]
const game_over22 = [images.game_over_spritesheet, 1350, 300, 450, 100]
const game_over23 = [images.game_over_spritesheet, 1800, 300, 450, 100]
const game_over24 = [images.game_over_spritesheet, 2250, 300, 450, 100]
const game_over25 = [images.game_over_spritesheet, 0 , 400, 450, 100]
const game_over26 = [images.game_over_spritesheet, 450, 400, 450, 100]
const game_over27 = [images.game_over_spritesheet, 900, 400, 450, 100]
const game_over28 = [images.game_over_spritesheet, 1350, 400, 450, 100]

// ---------------------------------------------------------------------------------
// Forest Sprites Inroad
// ---------------------------------------------------------------------------------
const guara1Left = [images.forest_spritesheet   , 0  ,    0, SPRITE_SIZE, SPRITE_SIZE]
const guara2Left = [images.forest_spritesheet   , 128,    0, SPRITE_SIZE, SPRITE_SIZE]
const guara3Left = [images.forest_spritesheet   , 256,    0, SPRITE_SIZE, SPRITE_SIZE]
const guara4Left = [images.forest_spritesheet   , 384,    0, SPRITE_SIZE, SPRITE_SIZE]
const guaraStopped = [images.forest_spritesheet , 512,    0, SPRITE_SIZE, SPRITE_SIZE]
const guara1Right = [images.forest_spritesheet  , 0  ,  128, SPRITE_SIZE, SPRITE_SIZE]
const guara2Right = [images.forest_spritesheet  , 128,  128, SPRITE_SIZE, SPRITE_SIZE]
const guara3Right = [images.forest_spritesheet  , 256,  128, SPRITE_SIZE, SPRITE_SIZE]
const guara4Right = [images.forest_spritesheet  , 384,  128, SPRITE_SIZE, SPRITE_SIZE]
const jaguarStopped = [images.forest_spritesheet, 512,  128, SPRITE_SIZE, SPRITE_SIZE]
const jaguar1Left = [images.forest_spritesheet  , 0  ,  256, SPRITE_SIZE, SPRITE_SIZE]
const jaguar2Left = [images.forest_spritesheet  , 128,  256, SPRITE_SIZE, SPRITE_SIZE]
const jaguar3Left = [images.forest_spritesheet  , 256,  256, SPRITE_SIZE, SPRITE_SIZE]
const jaguar4Left = [images.forest_spritesheet  , 384,  256, SPRITE_SIZE, SPRITE_SIZE]
const rock = [images.forest_spritesheet         , 512,  256, SPRITE_SIZE, SPRITE_SIZE]
const jaguar1Right = [images.forest_spritesheet , 0  ,  384, SPRITE_SIZE, SPRITE_SIZE]
const jaguar2Right = [images.forest_spritesheet , 128,  384, SPRITE_SIZE, SPRITE_SIZE]
const jaguar3Right = [images.forest_spritesheet , 256,  384, SPRITE_SIZE, SPRITE_SIZE]
const jaguar4Right = [images.forest_spritesheet , 384,  384, SPRITE_SIZE, SPRITE_SIZE]
const tree = [images.forest_spritesheet         , 512,  384, SPRITE_SIZE, SPRITE_SIZE]
const jeep1 = [images.forest_spritesheet        , 0  ,  512, SPRITE_SIZE, SPRITE_SIZE]
const jeep2 = [images.forest_spritesheet        , 128,  512, SPRITE_SIZE, SPRITE_SIZE]
const jeep3 = [images.forest_spritesheet        , 256,  512, SPRITE_SIZE, SPRITE_SIZE]
const jeep4 = [images.forest_spritesheet        , 384,  512, SPRITE_SIZE, SPRITE_SIZE]
const jeep5 = [images.forest_spritesheet        , 512,  512, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Forest Side Road Sprites
// ---------------------------------------------------------------------------------
const forestScenarioHouse1 = [images.scenario_forest_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioHouse2 = [images.scenario_forest_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioHouse3 = [images.scenario_forest_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioRock1 = [images.scenario_forest_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioRock2 = [images.scenario_forest_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioRock3 = [images.scenario_forest_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree1 = [images.scenario_forest_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree2 = [images.scenario_forest_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree3 = [images.scenario_forest_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree4 = [images.scenario_forest_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree5 = [images.scenario_forest_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const forestScenarioTree6 = [images.scenario_forest_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Farm Sprites Inroad
// ---------------------------------------------------------------------------------
const bull1Left = [images.farm_spritesheet   , 0  ,    0, SPRITE_SIZE, SPRITE_SIZE]
const bull2Left = [images.farm_spritesheet   , 128,    0, SPRITE_SIZE, SPRITE_SIZE]
const bull3Left = [images.farm_spritesheet   , 256,    0, SPRITE_SIZE, SPRITE_SIZE]
const bull4Left = [images.farm_spritesheet   , 384,    0, SPRITE_SIZE, SPRITE_SIZE]
const bullStopped = [images.farm_spritesheet , 512,    0, SPRITE_SIZE, SPRITE_SIZE]
const bull1Right = [images.farm_spritesheet  , 0  ,  128, SPRITE_SIZE, SPRITE_SIZE]
const bull2Right = [images.farm_spritesheet  , 128,  128, SPRITE_SIZE, SPRITE_SIZE]
const bull3Right = [images.farm_spritesheet  , 256,  128, SPRITE_SIZE, SPRITE_SIZE]
const bull4Right = [images.farm_spritesheet  , 384,  128, SPRITE_SIZE, SPRITE_SIZE]
const horseStopped = [images.farm_spritesheet, 512,  128, SPRITE_SIZE, SPRITE_SIZE]
const horse1Left = [images.farm_spritesheet  , 0  ,  256, SPRITE_SIZE, SPRITE_SIZE]
const horse2Left = [images.farm_spritesheet  , 128,  256, SPRITE_SIZE, SPRITE_SIZE]
const horse3Left = [images.farm_spritesheet  , 256,  256, SPRITE_SIZE, SPRITE_SIZE]
const horse4Left = [images.farm_spritesheet  , 384,  256, SPRITE_SIZE, SPRITE_SIZE]
const log = [images.farm_spritesheet         , 512,  256, SPRITE_SIZE, SPRITE_SIZE]
const horse1Right = [images.farm_spritesheet , 0  ,  384, SPRITE_SIZE, SPRITE_SIZE]
const horse2Right = [images.farm_spritesheet , 128,  384, SPRITE_SIZE, SPRITE_SIZE]
const horse3Right = [images.farm_spritesheet , 256,  384, SPRITE_SIZE, SPRITE_SIZE]
const horse4Right = [images.farm_spritesheet , 384,  384, SPRITE_SIZE, SPRITE_SIZE]
const truck = [images.farm_spritesheet         , 512,  384, SPRITE_SIZE, SPRITE_SIZE]
const pickup1 = [images.farm_spritesheet        , 0  ,  512, SPRITE_SIZE, SPRITE_SIZE]
const pickup2 = [images.farm_spritesheet        , 128,  512, SPRITE_SIZE, SPRITE_SIZE]
const pickup3 = [images.farm_spritesheet        , 256,  512, SPRITE_SIZE, SPRITE_SIZE]
const pickup4 = [images.farm_spritesheet        , 384,  512, SPRITE_SIZE, SPRITE_SIZE]
const pickup5 = [images.farm_spritesheet        , 512,  512, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Farm Side Road Sprites
// ---------------------------------------------------------------------------------
const farmScenarioBush = [images.scenario_farm_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioCorn = [images.scenario_farm_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioFences = [images.scenario_farm_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioRock1 = [images.scenario_farm_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioRock2 = [images.scenario_farm_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioScarecrow = [images.scenario_farm_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioHay = [images.scenario_farm_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioWell = [images.scenario_farm_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioShed = [images.scenario_farm_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioWindmill = [images.scenario_farm_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioTree1 = [images.scenario_farm_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const farmScenarioTree2 = [images.scenario_farm_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// City Sprites Inroad
// ---------------------------------------------------------------------------------
const cityDog1Left = [images.city_spritesheet   , 0  ,    0, SPRITE_SIZE, SPRITE_SIZE]
const cityDog2Left = [images.city_spritesheet   , 128,    0, SPRITE_SIZE, SPRITE_SIZE]
const cityDog3Left = [images.city_spritesheet   , 256,    0, SPRITE_SIZE, SPRITE_SIZE]
const cityDog4Left = [images.city_spritesheet   , 384,    0, SPRITE_SIZE, SPRITE_SIZE]
const cityDogStopped = [images.city_spritesheet , 512,    0, SPRITE_SIZE, SPRITE_SIZE]
const cityDog1Right = [images.city_spritesheet  , 0  ,  128, SPRITE_SIZE, SPRITE_SIZE]
const cityDog2Right = [images.city_spritesheet  , 128,  128, SPRITE_SIZE, SPRITE_SIZE]
const cityDog3Right = [images.city_spritesheet  , 256,  128, SPRITE_SIZE, SPRITE_SIZE]
const cityDog4Right = [images.city_spritesheet  , 384,  128, SPRITE_SIZE, SPRITE_SIZE]
const capivaraStopped = [images.city_spritesheet, 512,  128, SPRITE_SIZE, SPRITE_SIZE]
const capivara1Left = [images.city_spritesheet  , 0  ,  256, SPRITE_SIZE, SPRITE_SIZE]
const capivara2Left = [images.city_spritesheet  , 128,  256, SPRITE_SIZE, SPRITE_SIZE]
const capivara3Left = [images.city_spritesheet  , 256,  256, SPRITE_SIZE, SPRITE_SIZE]
const capivara4Left = [images.city_spritesheet  , 384,  256, SPRITE_SIZE, SPRITE_SIZE]
const construction = [images.city_spritesheet         , 512,  256, SPRITE_SIZE, SPRITE_SIZE]
const capivara1Right = [images.city_spritesheet , 0  ,  384, SPRITE_SIZE, SPRITE_SIZE]
const capivara2Right = [images.city_spritesheet , 128,  384, SPRITE_SIZE, SPRITE_SIZE]
const capivara3Right = [images.city_spritesheet , 256,  384, SPRITE_SIZE, SPRITE_SIZE]
const capivara4Right = [images.city_spritesheet , 384,  384, SPRITE_SIZE, SPRITE_SIZE]
const trash = [images.city_spritesheet         , 512,  384, SPRITE_SIZE, SPRITE_SIZE]
const car1 = [images.city_spritesheet        , 0  ,  512, SPRITE_SIZE, SPRITE_SIZE]
const car2 = [images.city_spritesheet        , 128,  512, SPRITE_SIZE, SPRITE_SIZE]
const car3 = [images.city_spritesheet        , 256,  512, SPRITE_SIZE, SPRITE_SIZE]
const car4 = [images.city_spritesheet        , 384,  512, SPRITE_SIZE, SPRITE_SIZE]
const car5 = [images.city_spritesheet        , 512,  512, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// City Side Road Sprites
// ---------------------------------------------------------------------------------
const cityScenarioBuilding1 = [images.scenario_city_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding2 = [images.scenario_city_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding3 = [images.scenario_city_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding4 = [images.scenario_city_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding5 = [images.scenario_city_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding6 = [images.scenario_city_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioBuilding7 = [images.scenario_city_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioLamp = [images.scenario_city_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioTree1 = [images.scenario_city_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioTree2 = [images.scenario_city_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioTree3 = [images.scenario_city_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const cityScenarioTree4 = [images.scenario_city_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Beach Sprites Inroad
// ---------------------------------------------------------------------------------
const turtle1Left = [images.beach_spritesheet   , 0  ,    0, SPRITE_SIZE, SPRITE_SIZE]
const turtle2Left = [images.beach_spritesheet   , 128,    0, SPRITE_SIZE, SPRITE_SIZE]
const turtle3Left = [images.beach_spritesheet   , 256,    0, SPRITE_SIZE, SPRITE_SIZE]
const turtle4Left = [images.beach_spritesheet   , 384,    0, SPRITE_SIZE, SPRITE_SIZE]
const turtleStopped = [images.beach_spritesheet , 512,    0, SPRITE_SIZE, SPRITE_SIZE]
const turtle1Right = [images.beach_spritesheet  , 0  ,  128, SPRITE_SIZE, SPRITE_SIZE]
const turtle2Right = [images.beach_spritesheet  , 128,  128, SPRITE_SIZE, SPRITE_SIZE]
const turtle3Right = [images.beach_spritesheet  , 256,  128, SPRITE_SIZE, SPRITE_SIZE]
const turtle4Right = [images.beach_spritesheet  , 384,  128, SPRITE_SIZE, SPRITE_SIZE]
const beachDogStopped = [images.beach_spritesheet, 512,  128, SPRITE_SIZE, SPRITE_SIZE]
const beachDog1Left = [images.beach_spritesheet  , 0  ,  256, SPRITE_SIZE, SPRITE_SIZE]
const beachDog2Left = [images.beach_spritesheet  , 128,  256, SPRITE_SIZE, SPRITE_SIZE]
const beachDog3Left = [images.beach_spritesheet  , 256,  256, SPRITE_SIZE, SPRITE_SIZE]
const beachDog4Left = [images.beach_spritesheet  , 384,  256, SPRITE_SIZE, SPRITE_SIZE]
const sandCastle = [images.beach_spritesheet         , 512,  256, SPRITE_SIZE, SPRITE_SIZE]
const beachDog1Right = [images.beach_spritesheet , 0  ,  384, SPRITE_SIZE, SPRITE_SIZE]
const beachDog2Right = [images.beach_spritesheet , 128,  384, SPRITE_SIZE, SPRITE_SIZE]
const beachDog3Right = [images.beach_spritesheet , 256,  384, SPRITE_SIZE, SPRITE_SIZE]
const beachDog4Right = [images.beach_spritesheet , 384,  384, SPRITE_SIZE, SPRITE_SIZE]
const iceCreamCart = [images.beach_spritesheet         , 512,  384, SPRITE_SIZE, SPRITE_SIZE]
const beetle1 = [images.beach_spritesheet        , 0  ,  512, SPRITE_SIZE, SPRITE_SIZE]
const beetle2 = [images.beach_spritesheet        , 128,  512, SPRITE_SIZE, SPRITE_SIZE]
const beetle3 = [images.beach_spritesheet        , 256,  512, SPRITE_SIZE, SPRITE_SIZE]
const beetle4 = [images.beach_spritesheet        , 384,  512, SPRITE_SIZE, SPRITE_SIZE]
const beetle5 = [images.beach_spritesheet        , 512,  512, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Beach Side Road Sprites
// ---------------------------------------------------------------------------------
const beachScenarioBar = [images.scenario_beach_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioBoards1 = [images.scenario_beach_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioBoards2 = [images.scenario_beach_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioCoral = [images.scenario_beach_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioParasol1 = [images.scenario_beach_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioParasol2 = [images.scenario_beach_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioRock1 = [images.scenario_beach_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioRock2 = [images.scenario_beach_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioTree1 = [images.scenario_beach_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioTree2 = [images.scenario_beach_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioTree3 = [images.scenario_beach_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const beachScenarioTree4 = [images.scenario_beach_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Suburb Sprites Inroad
// ---------------------------------------------------------------------------------
const suburbDog1Left = [images.suburb_spritesheet   , 0  ,    0, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog2Left = [images.suburb_spritesheet   , 128,    0, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog3Left = [images.suburb_spritesheet   , 256,    0, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog4Left = [images.suburb_spritesheet   , 384,    0, SPRITE_SIZE, SPRITE_SIZE]
const suburbDogStopped = [images.suburb_spritesheet , 512,    0, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog1Right = [images.suburb_spritesheet  , 0  ,  128, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog2Right = [images.suburb_spritesheet  , 128,  128, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog3Right = [images.suburb_spritesheet  , 256,  128, SPRITE_SIZE, SPRITE_SIZE]
const suburbDog4Right = [images.suburb_spritesheet  , 384,  128, SPRITE_SIZE, SPRITE_SIZE]
const catStopped = [images.suburb_spritesheet, 512,  128, SPRITE_SIZE, SPRITE_SIZE]
const cat1Left = [images.suburb_spritesheet  , 0  ,  256, SPRITE_SIZE, SPRITE_SIZE]
const cat2Left = [images.suburb_spritesheet  , 128,  256, SPRITE_SIZE, SPRITE_SIZE]
const cat3Left = [images.suburb_spritesheet  , 256,  256, SPRITE_SIZE, SPRITE_SIZE]
const cat4Left = [images.suburb_spritesheet  , 384,  256, SPRITE_SIZE, SPRITE_SIZE]
const stairs = [images.suburb_spritesheet         , 512,  256, SPRITE_SIZE, SPRITE_SIZE]
const cat1Right = [images.suburb_spritesheet , 0  ,  384, SPRITE_SIZE, SPRITE_SIZE]
const cat2Right = [images.suburb_spritesheet , 128,  384, SPRITE_SIZE, SPRITE_SIZE]
const cat3Right = [images.suburb_spritesheet , 256,  384, SPRITE_SIZE, SPRITE_SIZE]
const cat4Right = [images.suburb_spritesheet , 384,  384, SPRITE_SIZE, SPRITE_SIZE]
const hotDogCart = [images.suburb_spritesheet         , 512,  384, SPRITE_SIZE, SPRITE_SIZE]
const motorcycle1 = [images.suburb_spritesheet        , 0  ,  512, SPRITE_SIZE, SPRITE_SIZE]
const motorcycle2 = [images.suburb_spritesheet        , 128,  512, SPRITE_SIZE, SPRITE_SIZE]
const motorcycle3 = [images.suburb_spritesheet        , 256,  512, SPRITE_SIZE, SPRITE_SIZE]
const motorcycle4 = [images.suburb_spritesheet        , 384,  512, SPRITE_SIZE, SPRITE_SIZE]
const motorcycle5 = [images.suburb_spritesheet        , 512,  512, SPRITE_SIZE, SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Suburb Side Road Sprites
// ---------------------------------------------------------------------------------
const subScenarioBuilding1 = [images.scenario_sub_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding2 = [images.scenario_sub_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding3 = [images.scenario_sub_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding4 = [images.scenario_sub_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding5 = [images.scenario_sub_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding6 = [images.scenario_sub_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBuilding7 = [images.scenario_sub_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioRock = [images.scenario_sub_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioBush = [images.scenario_sub_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioTree1 = [images.scenario_sub_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioTree2 = [images.scenario_sub_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const subScenarioTree3 = [images.scenario_sub_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Common Side Road Sprites
// ---------------------------------------------------------------------------------
const commomScenarioBillboardFiap = [images.scenario_commom_spritesheet, 0, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioBillboardTuring = [images.scenario_commom_spritesheet, 512, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioBillboardVacina = [images.scenario_commom_spritesheet, 1024, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioAnimalCrossingSign = [images.scenario_commom_spritesheet, 1536, 0, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioCityLeft = [images.scenario_commom_spritesheet, 0, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioFarmLeft = [images.scenario_commom_spritesheet, 512, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioBeachLeft = [images.scenario_commom_spritesheet, 1024, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioForestLeft = [images.scenario_commom_spritesheet, 1536, 512, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioCityRight = [images.scenario_commom_spritesheet, 0, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioFarmRight = [images.scenario_commom_spritesheet, 512, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioBeachRight = [images.scenario_commom_spritesheet, 1024, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]
const commomScenarioForestRight= [images.scenario_commom_spritesheet, 1536, 1024, LARGE_SPRITE_SIZE, LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// GUI Sprites
// ---------------------------------------------------------------------------------
const UIStar = [images.GUI_Spritesheet, 0, 0, 180, 100]
const UIScore = [images.GUI_Spritesheet, 180, 0, 180, 100]
const UIFuel = [images.GUI_Spritesheet, 0, 100, 100, 300]
const UIRedFuel = [images.GUI_Spritesheet, 360, 0, 63, 69]
const UIJumpButton = [images.GUI_Spritesheet, 100, 100, 150, 150]
const UILeftButton = [images.GUI_Spritesheet, 100, 250, 150, 150]
const UIRightButton = [images.GUI_Spritesheet, 250, 100, 150, 150]
const UIPauseButton = [images.GUI_Spritesheet, 250, 250, 100, 100]

// ---------------------------------------------------------------------------------
// Menu Sprites
// ---------------------------------------------------------------------------------
const UIGameOver = [images.menu_spritesheet, 0, 0, 700, 300]
const UIPause = [images.menu_spritesheet, 0, 300, 700, 400]
const UIMusic = [images.menu_spritesheet, 700, 0, 100, 100]
const UIControl = [images.menu_spritesheet, 800, 0, 100, 100]
const UISound = [images.menu_spritesheet, 700, 100, 100, 100]
const UI3d = [images.menu_spritesheet, 800, 250, 100, 100]
const UISelectorOff = [images.menu_spritesheet, 900, 0, 100, 100]
const UISelectorOn = [images.menu_spritesheet, 900, 100, 100, 100]
const UIResume = [images.menu_spritesheet, 700, 200, 200, 200]
const UIReturn = [images.menu_spritesheet, 700, 400, 200, 200]
const UIHomeOff = [images.menu_spritesheet, 900, 200, 100, 100]
const UIHomeOn = [images.menu_spritesheet, 900, 300, 100, 100]
const UIConfigOff = [images.menu_spritesheet, 900, 400, 100, 100]
const UIConfigOn = [images.menu_spritesheet, 900, 500, 100, 100]

// ---------------------------------------------------------------------------------
// PowerUp Icons Sprites
// ---------------------------------------------------------------------------------
const boltIcon0 = [images.power_ups_icons_spritesheet, 0, 0, 100, 100]
const boltIcon1 = [images.power_ups_icons_spritesheet, 100, 0, 100, 100]
const boltIcon2 = [images.power_ups_icons_spritesheet, 200, 0, 100, 100]
const boltIcon3 = [images.power_ups_icons_spritesheet, 300, 0, 100, 100]
const boltIcon4 = [images.power_ups_icons_spritesheet, 400, 0, 100, 100]
const boltIcon5 = [images.power_ups_icons_spritesheet, 500, 0, 100, 100]
const boltIcon6 = [images.power_ups_icons_spritesheet, 600, 0, 100, 100]
const boltIcon7 = [images.power_ups_icons_spritesheet, 700, 0, 100, 100]
const boltIcon8 = [images.power_ups_icons_spritesheet, 800, 0, 100, 100]
const boltIcon9 = [images.power_ups_icons_spritesheet, 900, 0, 100, 100]
const doubleIcon0 = [images.power_ups_icons_spritesheet, 0, 100, 100, 100]
const doubleIcon1 = [images.power_ups_icons_spritesheet, 100, 100, 100, 100]
const doubleIcon2 = [images.power_ups_icons_spritesheet, 200, 100, 100, 100]
const doubleIcon3 = [images.power_ups_icons_spritesheet, 300, 100, 100, 100]
const doubleIcon4 = [images.power_ups_icons_spritesheet, 400, 100, 100, 100]
const doubleIcon5 = [images.power_ups_icons_spritesheet, 500, 100, 100, 100]
const doubleIcon6 = [images.power_ups_icons_spritesheet, 600, 100, 100, 100]
const doubleIcon7 = [images.power_ups_icons_spritesheet, 700, 100, 100, 100]
const doubleIcon8 = [images.power_ups_icons_spritesheet, 800, 100, 100, 100]
const doubleIcon9 = [images.power_ups_icons_spritesheet, 900, 100, 100, 100]
const shieldIcon0 = [images.power_ups_icons_spritesheet, 0, 200, 100, 100]
const shieldIcon1 = [images.power_ups_icons_spritesheet, 100, 200, 100, 100]
const shieldIcon2 = [images.power_ups_icons_spritesheet, 200, 200, 100, 100]
const shieldIcon3 = [images.power_ups_icons_spritesheet, 300, 200, 100, 100]
const shieldIcon4 = [images.power_ups_icons_spritesheet, 400, 200, 100, 100]
const shieldIcon5 = [images.power_ups_icons_spritesheet, 500, 200, 100, 100]
const shieldIcon6 = [images.power_ups_icons_spritesheet, 600, 200, 100, 100]
const shieldIcon7 = [images.power_ups_icons_spritesheet, 700, 200, 100, 100]
const shieldIcon8 = [images.power_ups_icons_spritesheet, 800, 200, 100, 100]
const shieldIcon9 = [images.power_ups_icons_spritesheet, 900, 200, 100, 100]
const turboIcon0 = [images.power_ups_icons_spritesheet, 0, 300, 100, 100]
const turboIcon1 = [images.power_ups_icons_spritesheet, 100, 300, 100, 100]
const turboIcon2 = [images.power_ups_icons_spritesheet, 200, 300, 100, 100]
const turboIcon3 = [images.power_ups_icons_spritesheet, 300, 300, 100, 100]
const turboIcon4 = [images.power_ups_icons_spritesheet, 400, 300, 100, 100]
const turboIcon5 = [images.power_ups_icons_spritesheet, 500, 300, 100, 100]
const turboIcon6 = [images.power_ups_icons_spritesheet, 600, 300, 100, 100]
const turboIcon7 = [images.power_ups_icons_spritesheet, 700, 300, 100, 100]
const turboIcon8 = [images.power_ups_icons_spritesheet, 800, 300, 100, 100]
const turboIcon9 = [images.power_ups_icons_spritesheet, 900, 300, 100, 100]



// ---------------------------------------------------------------------------------
// Sprites Groups
// ---------------------------------------------------------------------------------
const greenPlayerSprites = {maxLeft: [greenCarMaxSteerLeft_1, greenCarMaxSteerLeft_2, greenCarMaxSteerLeft_3],
                            left: [greenCarSteerLeft_1, greenCarSteerLeft_2, greenCarSteerLeft_3],
                            center: [greenCarCenter_1, greenCarCenter_2, greenCarCenter_3],
                            right: [greenCarSteerRight_1, greenCarSteerRight_2, greenCarSteerRight_3],
                            maxRight: [greenCarMaxSteerRight_1, greenCarMaxSteerRight_2, greenCarMaxSteerRight_3]}

const pinkPlayerSprites = {maxLeft: [pinkCarMaxSteerLeft_1, pinkCarMaxSteerLeft_2, pinkCarMaxSteerLeft_3],
                           left: [pinkCarSteerLeft_1, pinkCarSteerLeft_2, pinkCarSteerLeft_3],
                           center: [pinkCarCenter_1, pinkCarCenter_2, pinkCarCenter_3],
                           right: [pinkCarSteerRight_1, pinkCarSteerRight_2, pinkCarSteerRight_3],
                           maxRight: [pinkCarMaxSteerRight_1, pinkCarMaxSteerRight_2, pinkCarMaxSteerRight_3]}

const bluePlayerSprites = {maxLeft: [blueCarMaxSteerLeft_1, blueCarMaxSteerLeft_2, blueCarMaxSteerLeft_3],
                           left: [blueCarSteerLeft_1, blueCarSteerLeft_2, blueCarSteerLeft_3],
                           center: [blueCarCenter_1, blueCarCenter_2, blueCarCenter_3],                          
                           right: [blueCarSteerRight_1, blueCarSteerRight_2, blueCarSteerRight_3],
                           maxRight: [blueCarMaxSteerRight_1, blueCarMaxSteerRight_2, blueCarMaxSteerRight_3]}

const racers = [racerShark, racerGiraffe, racerBear, racerPolarBear, racerMonkey, racerPanda1, racerPanda2, racerPanda3]


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

