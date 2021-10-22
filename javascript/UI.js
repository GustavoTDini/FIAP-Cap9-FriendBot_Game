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
        this.coins = new CanvasText( STANDARD_WIDTH - 165, 100, game.player.coins, 45 , "#fd6601")
    }

    renderGameUI(ctx, canvas){
        drawToCanvas (canvas, ctx, UIScore, 0 ,10, 180, 100)
        this.score.render(ctx, canvas)
        drawToCanvas (canvas, ctx, UIStar, STANDARD_WIDTH-180 ,10, 180, 100)
        this.coins.render(ctx, canvas)
        this.drawFuel(ctx, canvas)
        if (this.game.settings.controls){
            drawToCanvas (canvas, ctx, UIPauseButton, 200, 10, 100, 100)
            drawToCanvas (canvas, ctx, UILeftButton, 10, STANDARD_HEIGHT-130, 120, 120)
            drawToCanvas (canvas, ctx, UIRightButton, STANDARD_WIDTH-140, STANDARD_HEIGHT-130, 120, 120)
            drawToCanvas (canvas, ctx, UIJumpButton, STANDARD_WIDTH-140, STANDARD_HEIGHT-260, 120, 120)
        }
        this.renderPowerUpIcons(TURBO, ctx, canvas)
        this.renderPowerUpIcons(BOLT, ctx, canvas)
        this.renderPowerUpIcons(DOUBLE, ctx, canvas)
        this.renderPowerUpIcons(SHIELD, ctx, canvas)
        this.renderMiniMap(ctx, canvas)
    }

    renderPauseUI(ctx, canvas){
        drawToCanvas (canvas, ctx, UIPause, STANDARD_CENTER_X - 350, STANDARD_CENTER_Y - 200, 700, 400)
        drawToCanvas (canvas, ctx, UIResume, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y - 80, 200, 200)
        drawToCanvas (canvas, ctx, this.homeIcon, STANDARD_CENTER_X - 250, STANDARD_CENTER_Y -20, 100, 100)
        drawToCanvas (canvas, ctx, this.configIcon, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y-20, 100, 100)
    }
    renderMiniMap(ctx, canvas){
        let road = this.game.road
        let spriteWidth = 20
        let spriteLength = 8
        let startSegment = this.game.player.currentSegment.index
        let finalSegment = startSegment + this.game.gameCamera.drawDistance
        let startZ = this.game.player.z
        let finalZ = startZ + this.game.gameCamera.drawDistance*SEGMENT_LENGTH
        ctx.fillStyle = "rgba(47,47,47,0.58)"
        drawRectToCanvas(canvas, ctx, STANDARD_WIDTH - 140, 140 , 120, 300)
        ctx.fillStyle = this.setMapCarColor()
        drawRectToCanvas(canvas, ctx, this.setMapX(this.game.player.x), 420 , spriteWidth, spriteLength)
        for (let n = startSegment; n < finalSegment; n++){
            let roadObjects = road.segments[n].inRoadObjects
            if (roadObjects.length > 0){
                for (let index in roadObjects){
                    let object = roadObjects[index]
                    if (object instanceof Cars){
                        ctx.fillStyle = "#ff0000"
                        drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    } else if (object instanceof Traffic){
                        ctx.fillStyle = "#05e5bc"
                        drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }else if (object instanceof Animals){
                        ctx.fillStyle = "#e9f500"
                        drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }else if (object instanceof Obstacles){
                        ctx.fillStyle = "#ff8f00"
                        drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }
                }
            }
        }
    }

    renderConfigUI(ctx, canvas){
        drawToCanvas (canvas, ctx, UIPause, STANDARD_CENTER_X - 350, STANDARD_CENTER_Y - 200, 700, 400)
        drawToCanvas (canvas, ctx, UIMusic, STANDARD_CENTER_X - 260, STANDARD_CENTER_Y - 60, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.music? UISelectorOn: UISelectorOff, STANDARD_CENTER_X - 270, STANDARD_CENTER_Y, 100, 100)
        drawToCanvas (canvas, ctx, UISound, STANDARD_CENTER_X - 120, STANDARD_CENTER_Y - 60, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.sounds? UISelectorOn: UISelectorOff, STANDARD_CENTER_X - 130, STANDARD_CENTER_Y, 100, 100)
        drawToCanvas (canvas, ctx, UIControl, STANDARD_CENTER_X + 20, STANDARD_CENTER_Y - 60, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.controls? UISelectorOn: UISelectorOff, STANDARD_CENTER_X + 10, STANDARD_CENTER_Y, 100, 100)
        drawToCanvas (canvas, ctx, UI3d, STANDARD_CENTER_X + 160, STANDARD_CENTER_Y - 60, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.threeD? UISelectorOn: UISelectorOff, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y, 100, 100)
        drawToCanvas (canvas, ctx, this.returnIcon, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y + 75, 100, 100)
    }

    renderGameOverUI(ctx, canvas){
        drawToCanvas (canvas, ctx, UIGameOver, STANDARD_CENTER_X - 350, STANDARD_CENTER_Y - 150, 700, 300)
        drawToCanvas (canvas, ctx, UIReturn, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y-55, 200, 200)
    }

    drawFuel(ctx, canvas){
        let fuel = this.game.player.fuel
        ctx.fillStyle = "#ff5a0a"
        let width = fuel*2.6
        drawRectToCanvas(canvas, ctx, STANDARD_CENTER_X - 85, 32 , width, 52)
        drawToCanvas (canvas, ctx, UIFuel, STANDARD_CENTER_X - 180, 10, 360, 100)
        if (fuel < 20){
            if (this.ticker%2 === 0){
                drawToCanvas (canvas, ctx, UIRedFuel, STANDARD_CENTER_X-162, 24, 65, 70)
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


    setMapX(x){
        return interpolate(-0.8,1.2,STANDARD_WIDTH - 140,STANDARD_WIDTH - 20, x)
    }

    setMapY(z, startZ, finalZ){
        return interpolate(startZ,finalZ,420,140, z)
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

    renderPowerUpIcons(type, ctx, canvas){
        let icons = null
        let powerUpCounter = null
        let height = null
        switch (type){
            case (TURBO):
                icons = turboIcons
                powerUpCounter = this.game.player.turbo
                height = 100
                break;
            case (BOLT):
                icons = boltIcons
                powerUpCounter = this.game.player.transparent
                height =210
                break;
            case (DOUBLE):
                icons = doubleIcons
                powerUpCounter = this.game.player.double
                height = 320
                break;
            case (SHIELD):
                icons = shieldIcons
                powerUpCounter = this.game.player.shield
                height = 430
                break;
        }
        if (powerUpCounter > 0){
            drawToCanvas (canvas, ctx, icons[Math.max(0,9-Math.floor(powerUpCounter/30))], 10, height, 100, 100)
        }

}


    handleMouseDown(x, y, audioCtx, canvasWidth, canvasHeight) {
        switch (this.game.gameState){
            case (PLAY_STATE):
                if (this.game.settings.controls && !this.game.player.start && !this.game.player.gameOver){
                    if (getMouseCanvasArea(x,y, 200, 10 ,100,100, canvasWidth, canvasHeight)){
                        this.game.player.setPause(audioCtx)
                    }
                    if (getMouseCanvasArea(x,y, 10, STANDARD_HEIGHT-130 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.moveLeftRight(audioCtx, -1)
                    }
                    if (getMouseCanvasArea(x,y, STANDARD_WIDTH-130, STANDARD_HEIGHT-130 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.moveLeftRight(audioCtx, 1)
                    }
                    if (getMouseCanvasArea(x,y, STANDARD_WIDTH - 130, STANDARD_HEIGHT-260 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.setJump(audioCtx)
                    }
                }

                break
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y - 80 ,200,200, canvasWidth, canvasHeight)){
                    this.game.player.setPause(audioCtx)
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 250, STANDARD_CENTER_Y - 80 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.homeIcon = this.UIHomeIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y-20 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.configIcon = this.UIConfigIcon[1]
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 260, STANDARD_CENTER_Y - 60 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    if (this.game.settings.music){
                        this.game.stopMusic(this.game)
                    }else{
                        this.game.playMusic(this.game, audioCtx)
                    }
                    this.game.settings.music = !this.game.settings.music
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 120, STANDARD_CENTER_Y - 60 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.sounds = !this.game.settings.sounds
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 20, STANDARD_CENTER_Y - 60 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.controls = !this.game.settings.controls
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 160, STANDARD_CENTER_Y - 60 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.settings.threeD = !this.game.settings.threeD
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y +75 ,100,100, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.returnIcon = this.UIReturnIcon[1]
                }
                break
            case (GAME_OVER_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y - 55 ,200,200, canvasWidth, canvasHeight)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds)
                    this.game.gameState = LOADING_STATE
                }
                break
        }

    }

    handleMouseUp(x, y, audioCtx, canvasWidth, canvasHeighht) {
        this.homeIcon = this.UIHomeIcon[0]
        this.configIcon = this.UIConfigIcon[0]
        this.returnIcon = this.UIReturnIcon[0]

        switch (this.game.gameState){
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 250, STANDARD_CENTER_Y - 80 ,100,100, canvasWidth, canvasHeighht)){
                    this.game.gameState = LOADING_STATE
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y-20 ,100,100, canvasWidth, canvasHeighht)){
                    this.game.gameState = CONFIG_STATE
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y +75 ,100,100, canvasWidth, canvasHeighht)){
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

    render(ctx, canvas) {
        ctx.font = scaleYDraw(canvas.height,this.size) + "px trebuchet MS";
        ctx.fillStyle = "black"
        ctx.strokeStyle = this.color
        ctx.fillText(this.text, scaleXDraw(canvas.width, this.x), scaleYDraw(canvas.height, this.y));
        ctx.strokeText(this.text, scaleXDraw(canvas.width, this.x), scaleYDraw(canvas.height, this.y));
    }

    update(newText, correction) {
        this.text = newText
        if (correction){
            this.x = 160 - (newText.toString().length*this.size/2)
        }

    }
}
