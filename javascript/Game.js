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
        this.currentMusic = null
        this.currentStage = SUBURB
        this.nextRight = null
        this.nextLeft = null
        this.nextStage = null
        this.decideSegment = null
        this.newStageSegment = null
        this.yRoadStartSegment = null
    }

    // Função principal para renderizar os elementos do canvas
    render(game, ctx)  {
        switch(game.gameState){
            case LOADING_STATE:
                break;
            case SET_STATE:
                break;
            case PLAY_STATE:
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
                game.background.render(ctx)
                game.road.render(ctx)
                game.player.render(ctx);
                game.UI.renderGameUI(ctx)
                break;
            case PAUSE_STATE:
                game.UI.renderPauseUI(ctx)
                break;
            case CONFIG_STATE:
                game.UI.renderConfigUI(ctx)
                break;
            case GAME_OVER_STATE:
                game.UI.renderGameOverUI(ctx)
                break;
        }
    }

    // função principal para atualizar os estados dos elementos do jogo
    update(game, dt, difficulty, playerColor, audioCtx) {
        switch(game.gameState){
            case LOADING_STATE:
                game.settings = new Settings()
                game.gameCamera = new Camera(game);
                game.road = new Road(game)
                game.player = new Player(game, playerColor, difficulty)
                game.background = new Background(game)
                game.UI = new UI(game)
                game.gameCamera.init()
                game.player.init()
                game.gameState = SET_STATE;
                game.currentStage = SUBURB
                break;
            case SET_STATE:
                game.road.roadConstructor.createRoad()
                game.player.reset()
                game.gameState = PLAY_STATE;
                break;
            case PLAY_STATE:
                game.player.update(dt, audioCtx)
                game.road.update(dt)
                game.gameCamera.update(dt)
                game.background.update(dt)
                game.UI.update(audioCtx)
                if (!game.playingMusic && game.settings.music){
                    game.currentMusic = playMusic(contextSounds["passing_breeze"], audioCtx)
                    game.playingMusic = true
                }
                break;
            case PAUSE_STATE:
                break;
            case CONFIG_STATE:
                break;
            case GAME_OVER_STATE:
                break;
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
                render(game, ctx);
            }
            if (udt > updateStep) {
                udt = udt - updateStep;
                update(game, updateStep, DIFFICULTIES_SETS[difficulty], playerColor, audioCtx);
            }
            requestAnimationFrame(frame);
        }
        frame();
    }
}

