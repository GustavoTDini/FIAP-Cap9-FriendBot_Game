window.onload = async function () {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    preloadSounds(sounds, audioContext)
    preloadImages(images)
    console.log(contextSounds)
    setTimeout(function () {
        const GAME_CANVAS = document.getElementById("game_canvas")
        document.getElementById("canvas_div").style.display = "flex"

        GAME_CANVAS.width = CANVAS_WIDTH;
        GAME_CANVAS.height = CANVAS_HEIGHT;
        console.log(images)
        let game = new Game()
        // Listener para clique das teclas
        document.addEventListener('keyup', function (e) {
            game.player.handleInputUp(ALLOWED_KEYS[e.code], audioContext);
        });

        // Listener para gerar o loop da musica de fundo
        // gameMusic.addEventListener('ended', function () {
        //     if (game.gameState === PLAY_STATE) {
        //         this.currentTime = 0;
        //         this.play();
        //     }
        // }, false);
        // let color = document.getElementById("colorSelect").value
        // let difficulty = document.getElementById("levelSelect").value
        GameEngine.run({
            canvas: GAME_CANVAS,
            audio: audioContext,
            render: game.render,
            game: game,
            update: game.update,
            playerColor: GREEN,
            difficulty: HARD
        })
    }, 1000)

}









