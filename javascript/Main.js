window.onload = async function () {
    // TODO - Add HTML Page
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    await preloadImages(images)
    await preloadSounds(sounds, audioContext)
    const GAME_CANVAS = document.getElementById("game_canvas")
    document.getElementById("canvas_div").style.display = "flex"
    GAME_CANVAS.width = 800;
    GAME_CANVAS.height = 480;
    let game = new Game()
    // Listener para clique das teclas
    document.addEventListener('keyup', function (e) {
        toggleFullScreen(GAME_CANVAS)
        game.player.handleInputUp(ALLOWED_KEYS[e.code], audioContext);
    });
    GAME_CANVAS.addEventListener("touchstart", function (e) {
        let rect = GAME_CANVAS.getBoundingClientRect();
        let fullScreen = isGameInFullscreen(GAME_CANVAS.nodeName)
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log(x,y)
        game.UI.handleMouseDown(x, y, audioContext, fullScreen)
    }, false);
    swipeDetect(GAME_CANVAS, function(swipeDir){
        if (swipeDir === 'right'){
            game.player.moveLeftRight(audioContext,1)
        }
        if (swipeDir === 'left'){
            game.player.moveLeftRight(audioContext,-1)
        }
        if (swipeDir === 'up'){
            game.player.setJump(audioContext)
        }
        if (swipeDir === 'down'){
            game.player.setPause(audioContext)
        }
    })
    GAME_CANVAS.addEventListener("touchend", function (e) {
        let rect = GAME_CANVAS.getBoundingClientRect();
        let fullScreen = isGameInFullscreen(GAME_CANVAS.nodeName)
        let x = e.pageX -  rect.left
        let y = e.pageY -  rect.top
        console.log(x,y)
        game.UI.handleMouseUp(x, y, audioContext, fullScreen)
    }, false);
    GAME_CANVAS.addEventListener("mouseup", function (e) {
        let rect = GAME_CANVAS.getBoundingClientRect();
        let fullScreen = isGameInFullscreen(GAME_CANVAS.nodeName)
        let x = e.pageX -  rect.left
        let y = e.pageY -  rect.top
        game.UI.handleMouseUp(x, y, audioContext, fullScreen)
    }, false);
    GAME_CANVAS.addEventListener("mousedown", function (e) {
        let rect = GAME_CANVAS.getBoundingClientRect();
        let fullScreen = isGameInFullscreen(GAME_CANVAS.nodeName)
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        game.UI.handleMouseDown(x, y, audioContext, fullScreen)
    }, false);
    GameEngine.run({
        canvas: GAME_CANVAS,
        audio: audioContext,
        render: game.render,
        game: game,
        update: game.update,
        playerColor: BLUE,
        difficulty: HARD
    })
}









