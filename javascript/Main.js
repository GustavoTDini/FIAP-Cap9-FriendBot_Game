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
            game.player.handleInputUp(ALLOWED_KEYS[e.code], audioContext);
        });
        GameEngine.run({
            canvas: GAME_CANVAS,
            audio: audioContext,
            render: game.render,
            game: game,
            update: game.update,
            playerColor: GREEN,
            difficulty: HARD
        })
    }, 3000)

}









