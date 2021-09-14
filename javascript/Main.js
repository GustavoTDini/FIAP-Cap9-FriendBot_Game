function startGame(){
    console.log("clik")
    const GAME_CANVAS = document.getElementById("game_canvas")
    document.getElementById("canvas_div").style.display = "flex"
    GAME_CANVAS.width = CANVAS_WIDTH;
    GAME_CANVAS.height = CANVAS_HEIGHT;
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
    let color = document.getElementById("colorSelect").value
    console.log(color)
    let difficulty = document.getElementById("levelSelect").value
    console.log(difficulty)
    GameEngine.run({canvas: GAME_CANVAS, render: game.render, game: game, update: game.update, playerColor: color, difficulty: difficulty})
}









