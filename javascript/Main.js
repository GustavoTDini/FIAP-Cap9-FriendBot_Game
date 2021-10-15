window.onload = async function () {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    preloadSounds(sounds, audioContext)
    preloadImages(images)
    setTimeout(function () {
        const GAME_CANVAS = document.getElementById("game_canvas")
        document.getElementById("canvas_div").style.display = "flex"
        GAME_CANVAS.width = CANVAS_WIDTH;
        GAME_CANVAS.height = CANVAS_HEIGHT;
        let game = new Game()
        // Listener para clique das teclas
        document.addEventListener('keyup', function (e) {
            //toggleFullScreen(GAME_CANVAS)
            game.player.handleInputUp(ALLOWED_KEYS[e.code], audioContext);
        });

        GAME_CANVAS.addEventListener("mousedown", function (e) {
            let rect = GAME_CANVAS.getBoundingClientRect();
            let x = e.clientX -  rect.left
            let y = e.clientY -  rect.top
            game.UI.handleMouseDown(x, y, audioContext)
        }, false);
        GAME_CANVAS.addEventListener("mouseup", function (e) {
            let rect = GAME_CANVAS.getBoundingClientRect();
            let x = e.clientX -  rect.left
            let y = e.clientY -  rect.top
            game.UI.handleMouseUp(x, y, audioContext)
        }, false);
        GameEngine.run({
            canvas: GAME_CANVAS,
            audio: audioContext,
            render: game.render,
            game: game,
            update: game.update,
            playerColor: BLUE,
            difficulty: MEDIUM
        })

    }, 3000)

}









