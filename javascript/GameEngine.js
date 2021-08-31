requestAnimationFrame(gameLoop)

// Função principal para renderizar os elementos do canvas
function render(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    rideRoad()
    if (gameStart) {
        if (player) {
            player.render(ctx);
        }
    }
}

// função principal para atualizar os estados dos elementos do jogo
function update(currentTime) {
    if (!gameStartScreen) {
        elapsedTime = Math.floor((currentTime - initialTime) / 1000)
        if (player) {
            player.update();
        }
        if (explosion) {
            explosion.update()
        }
    }

}

function gameLoop() {
    if (gameRunning) {
        let now = Date.now()
        render(ctx)
        update(now)
    }
    requestAnimationFrame(gameLoop)
}

// Listenter para clique das teclas
document.addEventListener('keyup', function (e) {
    if (player) {
        player.handleInputUp(ALLOWED_KEYS[e.keyCode]);
    }
});

// Listenter para pressionar das teclas
document.addEventListener('keydown', function (e) {
    if (player) {
        penaltyTime = 0;
        player.handleInputDown(ALLOWED_KEYS[e.keyCode]);
    }
    penaltyInitialTime = Date.now();
});

// Listener para gerar o loop da musica de fundo
gameMusic.addEventListener('ended', function () {
    if (gameRunning && gameStart) {
        this.currentTime = 0;
        this.play();
    }
}, false);

