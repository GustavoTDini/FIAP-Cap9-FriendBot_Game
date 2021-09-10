window.onload = function (){
    const GAME_CANVAS = document.getElementById("game_canvas")
    GAME_CANVAS.width = CANVAS_WIDTH;
    GAME_CANVAS.height = CANVAS_HEIGHT;
    let game = new Game()
    // Listenter para clique das teclas
    document.addEventListener('keyup', function (e) {
        game.player.handleInputUp(ALLOWED_KEYS[e.keyCode]);
    });

    // Listenter para pressionar das teclas
    document.addEventListener('keydown', function (e) {
        game.player.handleInputDown(ALLOWED_KEYS[e.keyCode]);
    });
    GameEngine.run({canvas: GAME_CANVAS, render: game.render, game: game, update: game.update})
}






// Listener para gerar o loop da musica de fundo
gameMusic.addEventListener('ended', function () {
    if (gameRunning && gameStart) {
        this.currentTime = 0;
        this.play();
    }
}, false);


