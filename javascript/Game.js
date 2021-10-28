class Game {

    // Sizes
    static STANDARD_WIDTH = 1280;
    static STANDARD_HEIGHT = 720;
    static STANDARD_CENTER_X = Game.STANDARD_WIDTH/2;
    static STANDARD_CENTER_Y = Game.STANDARD_HEIGHT/2;
    static FPS = 60;
    static UPS = 120;
    static FRAME_STEP = 1/Game.FPS
    static UPDATE_STEP = 1/Game.UPS
    static SEGMENT_LENGTH = 100;
    static MAX_ROAD_WIDTH = 1000;
    static MAX_SPEED = (Game.SEGMENT_LENGTH/Game.UPDATE_STEP)*5;

//States
    static LOADING_STATE = 0;
    static SET_STATE = 1;
    static PLAY_STATE = 2;
    static PAUSE_STATE = 3;
    static CONFIG_STATE = 4;
    static GAME_OVER_STATE = 5;

//Player Colors
    static GREEN = "GREEN";
    static BLUE = "BLUE";
    static PINK = "PINK";

//Player Difficulties
    static EASY = "EASY";
    static MEDIUM = "MEDIUM";
    static HARD = "HARD";

//Stages
    static SUBURB = "SUBURB";
    static CITY = "CITY";
    static FARM = "FARM";
    static FOREST = "FOREST";
    static BEACH = "BEACH";

//Player Difficulties
// TODO - Adjust Difficulties
    static DIFFICULTIES_SETS = {
        EASY: {
            START_SPEED: 0.1*Game.MAX_SPEED,
            MAX_SPEED:  0.8*Game.MAX_SPEED,
            MAX_CARS: 100,
            MAX_OBSTACLES: 5,
            MAX_POWER_UPS: 20,
            GAS_CORRECTION: 4,
            MAX_CARS_SPEEDS: Game.MAX_SPEED/4
        } ,
        MEDIUM: {
            START_SPEED: 0.2*Game.MAX_SPEED,
            MAX_SPEED:  Game.MAX_SPEED,
            MAX_CARS: 200,
            MAX_OBSTACLES: 10,
            MAX_POWER_UPS: 20,
            GAS_CORRECTION: 3,
            MAX_CARS_SPEEDS: Game.MAX_SPEED/3
        },
        HARD: {
            START_SPEED: 0.5*Game.MAX_SPEED,
            MAX_SPEED:  1.5*Game.MAX_SPEED,
            MAX_CARS: 300,
            MAX_OBSTACLES: 15,
            MAX_POWER_UPS: 20,
            GAS_CORRECTION: 2,
            MAX_CARS_SPEEDS: Game.MAX_SPEED/2
        },
    }


//kEYS
    static ALLOWED_KEYS = {
        "ArrowLeft": 'left',
        "ArrowRight": 'right',
        "Space": 'pause',
        "ArrowUp": 'jump'
    };

    // Animals
    static GUARA = 10
    static JAGUAR = 11
    static DOG_SUB = 12
    static CAT = 13
    static BULL = 14
    static HORSE = 15
    static DOG_CITY = 16
    static CAPIVARA = 17
    static TURTLE = 18
    static DOG_BEACH = 19

    // ---------------------------------------------------------------------------------
    // Stage Constants
    // ---------------------------------------------------------------------------------

    static stageObjects = {
        SUBURB:{
            ROAD_TEXTURES: [Images.imageFiles.sub_road_sprite_1, Images.imageFiles.sub_road_sprite_2, Images.imageFiles.sub_road_sprite_3, Images.imageFiles.sub_road_sprite_4, Images.imageFiles.sub_road_sprite_5],
            SIDE_TEXTURES: [Images.imageFiles.sub_texture_1, Images.imageFiles.sub_texture_2, Images.imageFiles.sub_texture_3],
            SCENARIOS:[Images.subScenarioBuilding1, Images.subScenarioBuilding2, Images.subScenarioBuilding3, Images.subScenarioBuilding4, Images.subScenarioBuilding5, Images.subScenarioBuilding6, Images.subScenarioBuilding7, Images.subScenarioRock],
            SIDE_SCENARIOS:[Images.subScenarioBush, Images.subScenarioTree1, Images.subScenarioTree2, Images.subScenarioTree3],
            TRAFFIC:[Images.motorcycle1, Images.motorcycle2, Images.motorcycle3, Images.motorcycle4, Images.motorcycle5],
            OBSTACLES:[Images.hotDogCart, Images.stairs],
            ANIMALS:[Game.CAT, Game.DOG_SUB],
            MUSIC:[Sounds.sounds[39],Sounds.sounds[40],Sounds.sounds[41],Sounds.sounds[42]],
            COLORS:{
                LIGHT:	{road: '#646464', grass: '#B36820', grassTextures: 0, shoulder: '#078116', lane: '#000000'},
                DARK:	{road: '#5a5a5a', grass: '#e38b3a', grassTextures: 1, shoulder: '#ffcc00'},
                DARKER:	{road: '#505050', grass: '#8d5313', grassTextures: 2, shoulder: '#078116'},
            },
            TUNNEL: Images.commonScenarioCityTunnel
        },
        CITY:{
            ROAD_TEXTURES: [Images.imageFiles.city_road_sprite_1, Images.imageFiles.city_road_sprite_2, Images.imageFiles.city_road_sprite_3, Images.imageFiles.city_road_sprite_4, Images.imageFiles.city_road_sprite_5],
            SIDE_TEXTURES: [Images.imageFiles.city_texture_1, Images.imageFiles.city_texture_2, Images.imageFiles.city_texture_3],
            SCENARIOS:[Images.cityScenarioBuilding1, Images.cityScenarioBuilding2,Images.cityScenarioBuilding3,Images.cityScenarioBuilding4,Images.cityScenarioBuilding5,Images.cityScenarioBuilding6,Images.cityScenarioBuilding7,Images.cityScenarioLamp],
            SIDE_SCENARIOS:[Images.cityScenarioTree1,Images.cityScenarioTree2,Images.cityScenarioTree3,Images.cityScenarioTree4],
            TRAFFIC:[Images.car1, Images.car2, Images.car3, Images.car4, Images.car5],
            OBSTACLES:[Images.construction, Images.trash],
            ANIMALS:[Game.DOG_CITY, Game.CAPIVARA],
            MUSIC:[Sounds.sounds[27],Sounds.sounds[28],Sounds.sounds[29],Sounds.sounds[30]],
            COLORS:{
                LIGHT:	{road: '#969696', grass: '#5e5e5e', grassTextures: 0, shoulder: '#BCBCBC', lane: '#FFFFFF'},
                DARK:	{road: '#a0a0a0', grass: '#a2a2a2', grassTextures: 1, shoulder: '#FF0000'},
                DARKER:	{road: '#aaaaaa', grass: '#e5e5e5', grassTextures: 2, shoulder: '#BCBCBC'},
            },
            LEFT_SIGN: Images.commonScenarioCityLeft,
            RIGHT_SIGN: Images.commonScenarioCityRight,
            GUI_SIGN: Images.citySign,
            TUNNEL: Images.commonScenarioCityTunnel
        },
        FARM:{
            ROAD_TEXTURES: [Images.imageFiles.farm_road_sprite_1, Images.imageFiles.farm_road_sprite_2, Images.imageFiles.farm_road_sprite_3, Images.imageFiles.farm_road_sprite_4, Images.imageFiles.farm_road_sprite_5],
            SIDE_TEXTURES: [Images.imageFiles.farm_texture_1, Images.imageFiles.farm_texture_2, Images.imageFiles.farm_texture_3],
            SCENARIOS:[Images.farmScenarioBush, Images.farmScenarioCorn, Images.farmScenarioFences, Images.farmScenarioShed, Images.farmScenarioWindmill, Images.farmScenarioScarecrow, Images.farmScenarioHay, Images.farmScenarioWell],
            SIDE_SCENARIOS:[Images.farmScenarioRock1, Images.farmScenarioRock2, Images.farmScenarioTree1, Images.farmScenarioTree2],
            TRAFFIC:[Images.pickup1, Images.pickup2, Images.pickup3, Images.pickup4, Images.pickup5],
            OBSTACLES:[Images.truck, Images.log],
            ANIMALS:[Game.BULL, Game.HORSE],
            MUSIC:[Sounds.sounds[31],Sounds.sounds[32],Sounds.sounds[33],Sounds.sounds[34]],
            COLORS:{
                LIGHT:	{road: '#6e6e6e', grass: '#48a15a', grassTextures: 0, shoulder: '#BCBCBC', lane: '#FFFFFF'},
                DARK:	{road: '#787878', grass: '#398246', grassTextures: 1, shoulder: '#0344ce'},
                DARKER:	{road: '#828282', grass: '#398246', grassTextures: 2, shoulder: '#BCBCBC'},
            },
            LEFT_SIGN: Images.commonScenarioFarmLeft,
            RIGHT_SIGN: Images.commonScenarioFarmRight,
            GUI_SIGN: Images.farmSign,
            TUNNEL: Images.commonScenarioCityTunnel
        },
        FOREST:{
            ROAD_TEXTURES: [Images.imageFiles.forest_road_sprite_1, Images.imageFiles.forest_road_sprite_2, Images.imageFiles.forest_road_sprite_3, Images.imageFiles.forest_road_sprite_4, Images.imageFiles.forest_road_sprite_5],
            SIDE_TEXTURES: [Images.imageFiles.forest_texture_1, Images.imageFiles.forest_texture_2, Images.imageFiles.forest_texture_3],
            SCENARIOS:[Images.forestScenarioHouse1, Images.forestScenarioHouse2, Images.forestScenarioHouse3, Images.forestScenarioRock1, Images.forestScenarioRock2, Images.forestScenarioTree1, Images.forestScenarioTree2, Images.forestScenarioTree3],
            SIDE_SCENARIOS:[Images.forestScenarioTree4, Images.forestScenarioRock3, Images.forestScenarioTree5, Images.forestScenarioTree6],
            TRAFFIC:[Images.jeep1, Images.jeep2, Images.jeep3, Images.jeep4, Images.jeep5],
            OBSTACLES:[Images.rock, Images.tree],
            ANIMALS:[Game.GUARA, Game.JAGUAR],
            MUSIC:[Sounds.sounds[35],Sounds.sounds[36],Sounds.sounds[37],Sounds.sounds[38]],
            COLORS:{
                LIGHT:	{road: '#6a5330', grass: '#4C8924', grassTextures: 0, shoulder: '#725e2a', lane: '#261d01'},
                DARK:	{road: '#5f4c2d', grass: '#70c735', grassTextures: 1, shoulder: '#56da3d'},
                DARKER:	{road: '#5a432a', grass: '#2f5d18', grassTextures: 2, shoulder: '#725e2a'},
            },
            LEFT_SIGN: Images.commonScenarioForestLeft,
            RIGHT_SIGN: Images.commonScenarioForestRight,
            GUI_SIGN: Images.forestSign,
            TUNNEL: Images.commonScenarioGrassTunnel
        },
        BEACH:{
            ROAD_TEXTURES: [Images.imageFiles.beach_road_sprite_1, Images.imageFiles.beach_road_sprite_2, Images.imageFiles.beach_road_sprite_3, Images.imageFiles.beach_road_sprite_4, Images.imageFiles.beach_road_sprite_5],
            SIDE_TEXTURES: [Images.imageFiles.beach_texture_1, Images.imageFiles.beach_texture_2, Images.imageFiles.beach_texture_3],
            SCENARIOS:[Images.beachScenarioBar, Images.beachScenarioBoards1, Images.beachScenarioBoards2, Images.beachScenarioCoral, Images.beachScenarioParasol1, Images.beachScenarioParasol2, Images.beachScenarioRock1, Images.beachScenarioRock2],
            SIDE_SCENARIOS:[Images.beachScenarioTree1, Images.beachScenarioTree2, Images.beachScenarioTree3, Images.beachScenarioTree4],
            TRAFFIC:[Images.beetle1, Images.beetle2, Images.beetle3, Images.beetle4, Images.beetle5],
            OBSTACLES:[Images.sandCastle, Images.iceCreamCart],
            ANIMALS:[Game.TURTLE, Game.DOG_BEACH],
            MUSIC:[Sounds.sounds[23],Sounds.sounds[24],Sounds.sounds[25],Sounds.sounds[26]],
            COLORS:{
                LIGHT:	{road: '#fddd96', grass: '#F5D890', grassTextures: 0, shoulder: '#F5D890', lane: '#4b3702'},
                DARK:	{road: '#f5d890', grass: '#e1cfad', grassTextures: 1, shoulder: '#4b3702'},
                DARKER:	{road: '#eace88', grass: '#a9a18a', grassTextures: 2, shoulder: '#F5D890'},
            },
            LEFT_SIGN: Images.commonScenarioBeachLeft,
            RIGHT_SIGN: Images.commonScenarioBeachRight,
            GUI_SIGN: Images.beachSign,
            TUNNEL: Images.commonScenarioGrassTunnel
        },
    }


    constructor() {
        this.gameState = Game.LOADING_STATE;
        this.gameCamera = null;
        this.player = null;
        this.road = null;
        this.UI = null
        this.background = null;
        this.settings = null
        this.playingMusic = false;
        this.musicName = null
        this.currentMusic = null
        this.currentStage = Game.SUBURB
        this.nextRight = null
        this.nextLeft = null
        this.nextStage = null
        this.decideSegment = null
        this.newStageSegment = null
        this.yRoadStartSegment = null
        this.gameImage = new ImageData(Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
    }

    // Função principal para renderizar os elementos do canvas
    render(game, ctx, canvas)  {
        switch(game.gameState){
            case Game.LOADING_STATE:
                break;
            case Game.SET_STATE:
                break;
            case Game.PLAY_STATE:
                ctx.clearRect(0, 0, Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
                game.background.render(ctx, canvas.width, canvas.height)
                game.road.render(ctx, canvas.width, canvas.height)
                game.player.render(ctx, canvas);
                game.UI.renderGameUI(ctx, canvas)
                game.gameImage = ctx.getImageData(0, 0, Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
                break;
            case Game.PAUSE_STATE:
                ctx.clearRect(0, 0, Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderPauseUI(ctx, canvas)
                break;
            case Game.CONFIG_STATE:
                ctx.clearRect(0, 0, Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderConfigUI(ctx, canvas)
                break;
            case Game.GAME_OVER_STATE:
                ctx.clearRect(0, 0, Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderGameOverUI(ctx, canvas)
                break;
        }
    }

    // função principal para atualizar os estados dos elementos do jogo
    update(game, dt, difficulty, playerColor, audioCtx, canvas) {
        switch(game.gameState){
            case Game.LOADING_STATE:
                game.settings = new Settings(canvas, audioCtx)
                game.gameCamera = new Camera(game);
                game.road = new Road(game)
                game.player = new Player(game, playerColor, difficulty)
                game.background = new Background(game)
                game.UI = new UI(game)
                game.gameCamera.init()
                game.player.init()
                game.gameState = Game.SET_STATE;
                game.currentStage = Game.SUBURB
                game.currentMusic = null
                break;
            case Game.SET_STATE:
                game.road.roadConstructor.createRoad()
                game.player.reset()
                game.gameState = Game.PLAY_STATE;
                break;
            case Game.PLAY_STATE:
                game.gameCamera.update(dt)
                game.player.update(dt, audioCtx)
                game.background.update()
                game.road.update(dt, audioCtx)
                game.UI.update(audioCtx)
                game.playMusic(game, audioCtx);
                game.checkMusicEnd(game, audioCtx);
                break;
            case Game.PAUSE_STATE:
                break;
            case Game.CONFIG_STATE:
                break;
            case Game.GAME_OVER_STATE:
                break;
        }
    }

    checkMusicEnd(game, audioCtx) {
        if (game.playingMusic && game.currentMusic !== null && game.settings.music && !game.player.gameOver) {
            game.currentMusic.onended = () => {
                game.musicName = Game.stageObjects[game.currentStage].MUSIC[HelperMethods.math.randomIntFromInterval(0, 3)]
                game.currentMusic = HelperMethods.sound.playMusic(Sounds.contextSounds[game.musicName], audioCtx, game.settings.music, game.settings.musicNode)
            }
        }
    }

    playMusic(game, audioCtx) {
        if (!game.playingMusic && game.settings.music && !game.player.gameOver) {
            game.musicName = Game.stageObjects[game.currentStage].MUSIC[HelperMethods.math.randomIntFromInterval(0, 3)]
            if (Sounds.contextSounds[game.musicName] !== null && Sounds.contextSounds[game.musicName] !== undefined) {
                game.currentMusic = HelperMethods.sound.playMusic(Sounds.contextSounds[game.musicName], audioCtx, game.settings.music, game.settings.musicNode)
                game.playingMusic = true
            }
        }
    }

    stopMusic(game) {
        if (Sounds.contextSounds[game.musicName] !== null && Sounds.contextSounds[game.musicName] !== undefined) {
            game.currentMusic.stop()
            game.playingMusic = false
        }
    }
}

let GameEngine = {

    run: function(options) {

        let canvas = options.canvas,
            game   = options.game,
            update = options.update,
            render = options.render,
            difficulty = options.difficulty,
            playerColor = options.playerColor,
            frameStep   = Game.FRAME_STEP,
            updateStep = Game.UPDATE_STEP,
            now    = null,
            last   = new Date().getTime(),
            dt     = 0,
            udt    = 0,
            fdt    = 0,
            ctx    = canvas.getContext("2d"),
            audioCtx = options.audio

        function frame() {
            requestAnimationFrame(frame);
            now = new Date().getTime();
            dt  = Math.min(1, (now - last) / 1000);
            udt = udt + dt;
            fdt = fdt + dt;
            last = now;
            if (fdt > frameStep) {
                fdt = fdt - frameStep;
                render(game, ctx, canvas);
            }
            if (udt > updateStep) {
                udt = udt - updateStep;
                update(game, updateStep, Game.DIFFICULTIES_SETS[difficulty], playerColor, audioCtx, canvas);
            }
        }
        frame();
    }
}

