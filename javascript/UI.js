class UI {

    UIHomeIcon = [UIHomeOff, UIHomeOn]
    UIConfigIcon = [UIConfigOff, UIConfigOn]
    UIReturnIcon = [UIReturnOff, UIReturnOn]

    homeIcon = this.UIHomeIcon[0]
    configIcon = this.UIConfigIcon[0]
    returnIcon = this.UIReturnIcon[0]

    constructor(game){
        this.game = game
        this.timer = 0
        this.ticker = 0
        this.beepControl = false
        this.score = new CanvasText( 160, 100, game.player.score, 45 , "#00712f")
        this.coins = new CanvasText( CANVAS_WIDTH - 165, 100, game.player.coins, 45 , "#fd6601")
    }

    renderGameUI(ctx){
        let player = this.game.player
        ctx.drawImage(...UIScore, 0, 10, 180, 100)
        this.score.render(ctx)
        ctx.drawImage(...UIStar, CANVAS_WIDTH-180, 10, 180, 100)
        this.coins.render(ctx)
        this.drawFuel(ctx)
        if (this.game.settings.controls){
            ctx.drawImage(...UIPauseButton, 200, 10, 100, 100)
            ctx.drawImage(...UILeftButton, 10, CANVAS_HEIGHT-130, 120, 120)
            ctx.drawImage(...UIRightButton, CANVAS_WIDTH-130, CANVAS_HEIGHT-130, 120, 120)
            ctx.drawImage(...UIJumpButton, CANVAS_WIDTH-130, CANVAS_HEIGHT-260, 120, 120)
        }
        this.renderPowerUpIcons(player, TURBO, ctx)
        this.renderPowerUpIcons(player, BOLT, ctx)
        this.renderPowerUpIcons(player, DOUBLE, ctx)
        this.renderPowerUpIcons(player, SHIELD, ctx)
        this.renderMiniMap(ctx)
    }

    renderPauseUI(ctx){
        ctx.drawImage(...UIPause, CANVAS_CENTER_X - 350, CANVAS_CENTER_Y - 200, 700, 400)
        ctx.drawImage(...UIResume, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 80, 200, 200)
        ctx.drawImage(...this.homeIcon, CANVAS_CENTER_X - 250, CANVAS_CENTER_Y -20, 100, 100)
        ctx.drawImage(...this.configIcon, CANVAS_CENTER_X + 150, CANVAS_CENTER_Y-20, 100, 100)
    }
    renderMiniMap(ctx){
        let spriteWidth = 20
        let spriteLenght = 4
        ctx.fillStyle = "rgba(47,47,47,0.58)"
        ctx.fillRect(CANVAS_WIDTH - 120, 140 , 100, 300 )
        ctx.fillStyle = this.setMapCarColor()
    }

    renderConfigUI(ctx){
        ctx.drawImage(...UIPause, CANVAS_CENTER_X - 350, CANVAS_CENTER_Y - 200, 700, 400)
        ctx.drawImage(...UIMusic, CANVAS_CENTER_X - 260, CANVAS_CENTER_Y - 60, 100, 100)
        ctx.drawImage(...this.game.settings.music? UISelectorOn: UISelectorOff, CANVAS_CENTER_X - 270, CANVAS_CENTER_Y, 100, 100)
        ctx.drawImage(...UISound, CANVAS_CENTER_X - 120, CANVAS_CENTER_Y - 60, 100, 100)
        ctx.drawImage(...this.game.settings.sounds? UISelectorOn: UISelectorOff, CANVAS_CENTER_X - 130, CANVAS_CENTER_Y, 100, 100)
        ctx.drawImage(...UIControl, CANVAS_CENTER_X + 20, CANVAS_CENTER_Y - 60, 100, 100)
        ctx.drawImage(...this.game.settings.controls? UISelectorOn: UISelectorOff, CANVAS_CENTER_X + 10, CANVAS_CENTER_Y, 100, 100)
        ctx.drawImage(...UI3d, CANVAS_CENTER_X + 160, CANVAS_CENTER_Y - 60, 100, 100)
        ctx.drawImage(...this.game.settings.threeD? UISelectorOn: UISelectorOff, CANVAS_CENTER_X + 150, CANVAS_CENTER_Y, 100, 100)
        ctx.drawImage(...this.returnIcon, CANVAS_CENTER_X - 70, CANVAS_CENTER_Y + 75, 100, 100)
    }

    renderGameOverUI(ctx){
        ctx.drawImage(...UIGameOver, CANVAS_CENTER_X - 350, CANVAS_CENTER_Y - 150, 700, 300)
        ctx.drawImage(...UIReturn, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y-55, 200, 200)
    }

    drawFuel(ctx, audioCtx){
        let fuel = this.game.player.fuel
        ctx.fillStyle = "#ff5a0a"
        let width = fuel*2.6

        ctx.fillRect(CANVAS_CENTER_X - 85, 32, width, 52)
        ctx.drawImage(...UIFuel, CANVAS_CENTER_X - 180, 10, 360, 100)
        if (fuel < 20){
            if (this.ticker%2 === 0){
                ctx.drawImage(...UIRedFuel, CANVAS_CENTER_X-162, 24, 65, 70)
            }
        }
    }

    setMapCarColor(){
        switch (this.game.player.color){
            case (PINK):
                return "#b300b3"
            case (BLUE):
                return "#0021c4"
            case (GREEN):
                return "#008000"
            default:
                return "rgba(47,47,47,0.58)"
        }
    }

    update(audioCtx){
        this.timer++
        if (this.timer > 15){
            this.ticker++
            this.timer = 0
        }
        this.score.update(Math.floor(this.game.player.score), true)
        this.coins.update(Math.floor(this.game.player.coins), false)
        if (this.game.player.fuel < 20){
            if (this.ticker%4 === 0 ){
                if (this.beepControl){
                    playTrack(contextSounds["fuel_beep"], audioCtx, this.game.settings.sounds)
                    this.beepControl = false
                }
            }
            if (this.ticker%4 !== 0){
                this.beepControl = true
            }
        }

    }

    renderPowerUpIcons(player, type, ctx){
        let icons = null
        let powerUpCounter = null
        let height = null
        switch (type){
            case (TURBO):
                icons = turboIcons
                powerUpCounter = player.turbo
                height = 100
                break;
            case (BOLT):
                icons = boltIcons
                powerUpCounter = player.transparent
                height = 210
                break;
            case (DOUBLE):
                icons = doubleIcons
                powerUpCounter = player.double
                height = 320
                break;
            case (SHIELD):
                icons = shieldIcons
                powerUpCounter = player.shield
                height = 430
                break;
        }
        if (powerUpCounter > 0){
            if (powerUpCounter >= 270){
                ctx.drawImage(...icons[0], 10, height, 100, 100)
            }
            if (powerUpCounter >= 240 && powerUpCounter < 270){
                ctx.drawImage(...icons[1], 10, height, 100, 100)
            }
            if (powerUpCounter >= 210 && powerUpCounter < 240){
                ctx.drawImage(...icons[2], 10, height, 100, 100)
            }
            if (powerUpCounter >= 180 && powerUpCounter < 210){
                ctx.drawImage(...icons[3], 10, height, 100, 100)
            }
            if (powerUpCounter >= 150 && powerUpCounter < 180){
                ctx.drawImage(...icons[4], 10, height, 100, 100)
            }
            if (powerUpCounter >= 120 && powerUpCounter < 150){
                ctx.drawImage(...icons[5], 10, height, 100, 100)
            }
            if (powerUpCounter >= 90 && powerUpCounter < 120){
                ctx.drawImage(...icons[6], 10, height, 100, 100)
            }
            if (powerUpCounter >= 60 && powerUpCounter < 90){
                ctx.drawImage(...icons[7], 10, height, 100, 100)
            }
            if (powerUpCounter >= 30 && powerUpCounter < 60){
                ctx.drawImage(...icons[8], 10, height, 100, 100)
            }
            if (powerUpCounter < 30){
                ctx.drawImage(...icons[9], 10, height, 100, 100)
            }
        }

}


    handleMouseDown(x, y, audioCtx) {
        switch (this.game.gameState){
            case (PLAY_STATE):
                if (this.game.settings.controls && !this.game.player.start && !this.game.player.gameOver){
                    if (getMouseCanvasArea(x,y, 200, 10 ,100,100)){
                        this.game.player.setPause(audioCtx)
                    }
                    if (getMouseCanvasArea(x,y, 10, CANVAS_HEIGHT-130 ,120,120)){
                        this.game.player.moveLeftRight(audioCtx, -1)
                    }
                    if (getMouseCanvasArea(x,y, CANVAS_WIDTH-130, CANVAS_HEIGHT-130 ,120,120)){
                        this.game.player.moveLeftRight(audioCtx, 1)
                    }
                    if (getMouseCanvasArea(x,y, CANVAS_WIDTH - 130, CANVAS_HEIGHT-260 ,120,120)){
                        this.game.player.setJump(audioCtx)
                    }
                }

                break
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 80 ,200,200)){
                    this.game.player.setPause(audioCtx)
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 250, CANVAS_CENTER_Y - 80 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.homeIcon = this.UIHomeIcon[1]
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X + 150, CANVAS_CENTER_Y-20 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.configIcon = this.UIConfigIcon[1]
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 260, CANVAS_CENTER_Y - 60 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    if (this.game.settings.music){
                        this.game.currentMusic.stop()
                    }else{
                        this.game.currentMusic = playMusic(contextSounds["passing_breeze"], audioCtx)
                        this.game.playingMusic = true
                    }
                    this.game.settings.music = !this.game.settings.music
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 120, CANVAS_CENTER_Y - 60 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.sounds = !this.game.settings.sounds
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X + 20, CANVAS_CENTER_Y - 60 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.controls = !this.game.settings.controls
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X + 160, CANVAS_CENTER_Y - 60 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.threeD = !this.game.settings.threeD
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 70, CANVAS_CENTER_Y +75 ,100,100)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.returnIcon = this.UIReturnIcon[1]
                }
                break
            case (GAME_OVER_STATE):
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 55 ,200,2020)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.gameState = LOADING_STATE
                }
                break
        }

    }

    handleMouseUp(x, y, audioCtx) {
        this.homeIcon = this.UIHomeIcon[0]
        this.configIcon = this.UIConfigIcon[0]
        this.returnIcon = this.UIReturnIcon[0]

        switch (this.game.gameState){
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 250, CANVAS_CENTER_Y - 80 ,100,100)){
                    this.game.gameState = LOADING_STATE
                }
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X + 150, CANVAS_CENTER_Y-20 ,100,100)){
                    this.game.gameState = CONFIG_STATE
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, CANVAS_CENTER_X - 70, CANVAS_CENTER_Y +75 ,100,100)){
                    this.game.gameState = PAUSE_STATE
                }
                break
        }

    }

}

//Classe com o texto para os Escores e Moedas
class CanvasText {
    constructor(x, y, text, size, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size
        this.color = color
    }

    render(ctx) {
        ctx.font = this.size + "px trebuchet MS";
        ctx.fillStyle = "black"
        ctx.strokeStyle = this.color
        ctx.fillText(this.text, this.x, this.y);
        ctx.strokeText(this.text, this.x, this.y);
    }

    update(newText, correction) {
        this.text = newText
        if (correction){
            this.x = 160 - (newText.toString().length*22)
        }

    }
}
