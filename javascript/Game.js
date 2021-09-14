class Game {

    constructor() {
        this.gameState = LOADING_STATE;
        this.gameCamera = null;
        this.player = null;
        this.road = null;
        this.UI = null
        this.background = null;

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
            case GAME_OVER_STATE:
                game.UI.renderGameOverUI(ctx)
                break;
        }
    }

    // função principal para atualizar os estados dos elementos do jogo
    update(game, dt, difficulty, playerColor) {
        switch(game.gameState){
            case LOADING_STATE:
                game.gameCamera = new Camera(game);
                game.road = new Road(game)
                game.player = new Player(game, playerColor, difficulty)
                game.background = new Background(game)
                game.UI = new UI(game)
                spriteSheet_road.src = './images/SpriteSheet_road.png'
                spriteSheet_road_side.src = './images/SpriteSheet_side_road.png'
                spriteSheet_ui.src = './images/SpriteSheet_UI.png'
                background_sky.src = './images/background_sky.png'
                background_mountain.src = './images/background_mountain.png'
                background_trees.src = './images/background_trees.png'
                road_sprite_1.src = './images/road_sprite_1.png'
                road_sprite_2.src = './images/road_sprite_2.png'
                road_sprite_3.src = './images/road_sprite_3.png'
                road_sprite_4.src = './images/road_sprite_4.png'
                road_sprite_5.src = './images/road_sprite_5.png'
                grass_texture1.src = './images/grass_texture_1.png'
                grass_texture2.src = './images/grass_texture_2.png'
                grass_texture3.src = './images/grass_texture_3.png'
                game.gameState = SET_STATE;
                game.gameCamera.init()
                game.player.init()
                break;
            case SET_STATE:
                game.road.createRoad()
                game.player.reset()
                game.gameState = PLAY_STATE;
                break;
            case PLAY_STATE:
                game.player.update(dt)
                game.road.update(dt)
                game.gameCamera.update(dt)
                game.background.update(dt)
                gameMusic.play()
                break;
            case PAUSE_STATE:
                break;
            case GAME_OVER_STATE:
                break;
        }
    }
}

let GameEngine = {

    run: function(options) {
        console.log(options)

        let canvas = options.canvas,
            game   = options.game,
            update = options.update,
            render = options.render,
            difficulty = options.difficulty,
            playerColor = options.playerColor,
            step   = STEP,
            now    = null,
            last   = new Date().getTime(),
            dt     = 0,
            gdt    = 0,
            ctx    = canvas.getContext("2d")

        function frame() {
            now = new Date().getTime();
            dt  = Math.min(1, (now - last) / 1000);
            gdt = gdt + dt;
            while (gdt > step) {
                gdt = gdt - step;
                update(game, step, DIFFICULTIES_SETS[difficulty], playerColor);
            }
            render(game, ctx);
            last = now;
            requestAnimationFrame(frame);
        }
        frame();
    }
}

