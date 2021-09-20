//addLoadEvent(preload);

window.onload = function(){
    spriteSheet_road.src = './images/spriteSheet_road.png'
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
    const GAME_CANVAS = document.getElementById("game_canvas")
    document.getElementById("canvas_div").style.display = "flex"
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    GAME_CANVAS.width = CANVAS_WIDTH;
    GAME_CANVAS.height = CANVAS_HEIGHT;
    console.log(images)
    let game = new Game()
    // Listener para clique das teclas
    document.addEventListener('keyup', function (e) {
        game.player.handleInputUp(ALLOWED_KEYS[e.code]);
    });

    // Listener para gerar o loop da musica de fundo
    gameMusic.addEventListener('ended', function () {
        if (game.gameState === PLAY_STATE) {
            this.currentTime = 0;
            this.play();
        }
    }, false);
    // let color = document.getElementById("colorSelect").value
    // let difficulty = document.getElementById("levelSelect").value
    GameEngine.run({ canvas: GAME_CANVAS,
                            audio: audioContext,
                            render: game.render,
                            game: game,
                            update: game.update,
                            playerColor: GREEN,
                            difficulty: HARD})
}









