class Game {

    constructor() {
        this.gameState = LOADING_STATE;
        this.gameCamera = null;
        this.player = null;
        this.road = null;
        this.UI = null
        this.background = null;
        this.settings = null
        this.playingMusic = false;
        this.musicName = null
        this.currentMusic = null
        this.currentStage = SUBURB
        this.nextRight = null
        this.nextLeft = null
        this.nextStage = null
        this.decideSegment = null
        this.newStageSegment = null
        this.yRoadStartSegment = null
        this.gameImage = new ImageData(STANDARD_WIDTH, STANDARD_HEIGHT)
    }

    // Função principal para renderizar os elementos do canvas
    render(game, ctx, canvas)  {
        switch(game.gameState){
            case LOADING_STATE:
                break;
            case SET_STATE:
                break;
            case PLAY_STATE:
                ctx.clearRect(0, 0, STANDARD_WIDTH, STANDARD_HEIGHT)
                game.background.render(ctx, canvas.width, canvas.height)
                game.road.render(ctx, canvas.width, canvas.height)
                game.player.render(ctx, canvas);
                game.UI.renderGameUI(ctx, canvas)
                game.gameImage = ctx.getImageData(0, 0, STANDARD_WIDTH, STANDARD_HEIGHT)
                break;
            case PAUSE_STATE:
                ctx.clearRect(0, 0, STANDARD_WIDTH, STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderPauseUI(ctx, canvas)
                break;
            case CONFIG_STATE:
                ctx.clearRect(0, 0, STANDARD_WIDTH, STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderConfigUI(ctx, canvas)
                break;
            case GAME_OVER_STATE:
                ctx.clearRect(0, 0, STANDARD_WIDTH, STANDARD_HEIGHT)
                ctx.putImageData(game.gameImage, 0,0)
                game.UI.renderGameOverUI(ctx, canvas)
                break;
        }
    }

    // função principal para atualizar os estados dos elementos do jogo
    update(game, dt, difficulty, playerColor, audioCtx, canvas) {
        switch(game.gameState){
            case LOADING_STATE:
                game.settings = new Settings(canvas, audioCtx)
                game.gameCamera = new Camera(game);
                game.road = new Road(game)
                game.player = new Player(game, playerColor, difficulty)
                game.background = new Background(game)
                game.UI = new UI(game)
                game.gameCamera.init()
                game.player.init()
                game.gameState = SET_STATE;
                game.currentStage = SUBURB
                game.currentMusic = null
                break;
            case SET_STATE:
                game.road.roadConstructor.createRoad()
                game.player.reset()
                game.gameState = PLAY_STATE;
                break;
            case PLAY_STATE:
                game.gameCamera.update(dt)
                game.player.update(dt, audioCtx)
                game.background.update(dt)
                game.road.update(dt, audioCtx)
                game.UI.update(audioCtx)
                game.playMusic(game, audioCtx);
                game.checkMusicEnd(game, audioCtx);
                break;
            case PAUSE_STATE:
                break;
            case CONFIG_STATE:
                break;
            case GAME_OVER_STATE:
                break;
        }
    }

    checkMusicEnd(game, audioCtx) {
        if (game.playingMusic && game.currentMusic !== null && game.settings.music && !game.player.gameOver) {
            game.currentMusic.onended = () => {
                game.musicName = stageObjects[game.currentStage].MUSIC[randomIntFromInterval(0, 3)]
                game.currentMusic = playMusic(contextSounds[game.musicName], audioCtx, game.settings.music, game.settings.musicNode)
            }
        }
    }

    playMusic(game, audioCtx) {
        if (!game.playingMusic && game.settings.music && !game.player.gameOver) {
            game.musicName = stageObjects[game.currentStage].MUSIC[randomIntFromInterval(0, 3)]
            if (contextSounds[game.musicName] !== null && contextSounds[game.musicName] !== undefined) {
                game.currentMusic = playMusic(contextSounds[game.musicName], audioCtx, game.settings.music, game.settings.musicNode)
                game.playingMusic = true
            }
        }
    }

    stopMusic(game) {
        if (contextSounds[game.musicName] !== null && contextSounds[game.musicName] !== undefined) {
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
            frameStep   = FRAME_STEP,
            updateStep = UPDATE_STEP,
            now    = null,
            last   = new Date().getTime(),
            dt     = 0,
            udt    = 0,
            fdt    = 0,
            ctx    = canvas.getContext("2d"),
            audioCtx = options.audio

        function frame() {
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
                update(game, updateStep, DIFFICULTIES_SETS[difficulty], playerColor, audioCtx, canvas);
            }
            requestAnimationFrame(frame);
        }
        frame();
    }
}

