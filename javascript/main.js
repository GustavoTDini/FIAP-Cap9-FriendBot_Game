$(document).ready(function () {
    let gameCanvas = document.getElementById("game_canvas")
    gameCanvas.width = CANVAS_WIDTH;
    gameCanvas.height = CANVAS_HEIGHT;
    ctx = gameCanvas.getContext("2d");
    spriteSheet.onload = function () {
        gameRunning = true
        $("#high_score_div").hide();
    }
    spriteSheet.src = './images/SpriteSheet.png'
    road.src = './images/road_city.png'
    $("#start_game").click(function () {
        startGame()
        $("#start_game").hide();
    })
})

function endGame() {
    gameOverTime = 0;
    explosion = new Explosion(player.x, player.y)
    explosionSound.play();
    fireSound.pause();
    player = undefined;
    texts = []
    texts = texts.filter(text => text.type !== PLAIN_TEXT)
    texts.push(new CanvasText(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "GAME OVER", FULL_TEXT))
    gameOver = true;
    $("#start_game").show();
    gameMusic.pause();
    $("#high_score_div").show();
    $("#high_score_controls").show();
    $("#high_score_value").val(score)
}

function startGame() {
    gameMusic.volume = 0.1;
    gameMusic.play();
    initialTime = Date.now();
    penaltyInitialTime = initialTime;
    penalties = 0;
    score = 0;
    meteors = [];
    texts = [];
    stage = 1;
    changedStage = false;
    elapsedTime = 0;
    gameStartScreen = false;
    gameStart = true;
    gameOver = false;
    player = new Player((CANVAS_WIDTH - SPRITE_SIZE) / 2, (CANVAS_HEIGHT - SPRITE_SIZE) / 2, playerSpriteUp)
    meteors.push(new Meteor(-50, (Math.random() * 400), (METEORS_SIZES[(Math.floor(Math.random() * (3)))])))
    texts.push(new CanvasText(20, 20, score, PLAIN_TEXT))
}

function addHighScore() {
    if ($("#high_score_input").val() !== "") {
        let highScore = '{"name":"' + $("#high_score_input").val() + '","score":"' + score + '"}';
        let highScoreJson = JSON.parse(highScore)
        highScores.push(highScoreJson)
        $("#high_score_controls").hide();
        $("#high_score_input").val("");
    }
    highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score))
    $("#high_score").empty();
    let scoreindex = 1
    highScores.map(a => {
        let row = "<tr><th>" + scoreindex + "</th><th>" + a.name + "</th><th>" + a.score + "</th></tr>"
        $("#high_score").append(row)
        scoreindex++
    })

}
