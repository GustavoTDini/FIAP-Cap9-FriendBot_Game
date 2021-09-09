window.onload = function (){
    const GAME_CANVAS = document.getElementById("game_canvas")
    GAME_CANVAS.width = CANVAS_WIDTH;
    GAME_CANVAS.height = CANVAS_HEIGHT;
    let game = new Game()
    GameEngine.run({canvas: GAME_CANVAS, render: game.render, game: game, update: game.update})
}


