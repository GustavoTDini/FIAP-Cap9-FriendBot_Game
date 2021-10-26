class UI {

    UIHomeIcon = [UIHomeOff, UIHomeOn]
    UIConfigIcon = [UIConfigOff, UIConfigOn]
    UIReturnIcon = [UIReturnOff, UIReturnOn]
    UIPlusIcon = [UIPlusOff, UIPlusOn]
    UIMinusIcon = [UIMinusOff, UIMinusOn]

    homeIcon = this.UIHomeIcon[0]
    configIcon = this.UIConfigIcon[0]
    returnIcon = this.UIReturnIcon[0]
    soundPlusIcon = this.UIPlusIcon[0]
    soundMinusIcon = this.UIMinusIcon[0]
    musicPlusIcon = this.UIPlusIcon[0]
    musicMinusIcon = this.UIMinusIcon[0]
    resPlusIcon = this.UIPlusIcon[0]
    resMinusIcon = this.UIMinusIcon[0]

    resPositions = [STANDARD_CENTER_X - 100, STANDARD_CENTER_X - 40, STANDARD_CENTER_X +20 , STANDARD_CENTER_X +80]

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
        drawToCanvas (canvas, ctx, UIConfig, STANDARD_CENTER_X - 350, STANDARD_CENTER_Y - 250, 700, 600)

        drawToCanvas (canvas, ctx, UIMusic, STANDARD_CENTER_X - 270, STANDARD_CENTER_Y - 210, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.music? UISelectorOn: UISelectorOff, STANDARD_CENTER_X - 280, STANDARD_CENTER_Y-150, 100, 100)
        drawToCanvas (canvas, ctx, this.musicMinusIcon, STANDARD_CENTER_X - 170, STANDARD_CENTER_Y - 200, 100, 100)
        drawToCanvas (canvas, ctx, this.musicPlusIcon, STANDARD_CENTER_X + 230, STANDARD_CENTER_Y - 200, 100, 100)
        drawToCanvas (canvas, ctx, UIScale, STANDARD_CENTER_X - 60, STANDARD_CENTER_Y - 250, 300, 80)
        ctx.fillStyle = "#5c0000"
        drawRectToCanvas(canvas,ctx, STANDARD_CENTER_X - 60, STANDARD_CENTER_Y - 185, this.game.settings.musicVolume*28, 50)
        drawToCanvas (canvas, ctx, UIRedBar, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y - 210, 300, 100)

        drawToCanvas (canvas, ctx, UISound, STANDARD_CENTER_X - 290, STANDARD_CENTER_Y - 80, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.sounds? UISelectorOn: UISelectorOff, STANDARD_CENTER_X - 300, STANDARD_CENTER_Y -20, 100, 100)
        drawToCanvas (canvas, ctx, this.soundMinusIcon, STANDARD_CENTER_X - 190, STANDARD_CENTER_Y - 70, 100, 100)
        drawToCanvas (canvas, ctx, this.soundPlusIcon, STANDARD_CENTER_X + 210, STANDARD_CENTER_Y - 70, 100, 100)
        drawToCanvas (canvas, ctx, UIScale, STANDARD_CENTER_X - 80, STANDARD_CENTER_Y - 120, 300, 80)
        ctx.fillStyle = "#144c20"
        drawRectToCanvas(canvas,ctx, STANDARD_CENTER_X - 80, STANDARD_CENTER_Y - 55, this.game.settings.soundVolume*28, 50)
        drawToCanvas (canvas, ctx, UIGreenBar, STANDARD_CENTER_X - 90, STANDARD_CENTER_Y - 80, 300, 100)

        drawToCanvas (canvas, ctx, UIRes, STANDARD_CENTER_X - 310, STANDARD_CENTER_Y + 50, 100, 100)
        drawToCanvas (canvas, ctx, this.resMinusIcon, STANDARD_CENTER_X - 210, STANDARD_CENTER_Y + 60, 100, 100)
        drawToCanvas (canvas, ctx, this.resPlusIcon, STANDARD_CENTER_X + 190, STANDARD_CENTER_Y + 60, 100, 100)
        drawToCanvas (canvas, ctx, UIWhiteBar, STANDARD_CENTER_X - 110, STANDARD_CENTER_Y + 50, 300, 100)
        drawToCanvas (canvas, ctx, UIBarSelector, this.resPositions[this.game.settings.resolution], STANDARD_CENTER_Y + 47, 100, 100)

        drawToCanvas (canvas, ctx, UIControl, STANDARD_CENTER_X -260, STANDARD_CENTER_Y + 160, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.controls? UISelectorOn: UISelectorOff, STANDARD_CENTER_X -270, STANDARD_CENTER_Y + 220, 100, 100)
        drawToCanvas (canvas, ctx, UI3d, STANDARD_CENTER_X + 140, STANDARD_CENTER_Y + 160, 100, 100)
        drawToCanvas (canvas, ctx, this.game.settings.threeD? UISelectorOn: UISelectorOff, STANDARD_CENTER_X + 130, STANDARD_CENTER_Y + 220, 100, 100)
        drawToCanvas (canvas, ctx, this.returnIcon, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y + 180, 100, 100)
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


    handleMouseDown(x, y, audioCtx, fullscreen) {
        switch (this.game.gameState){
            case (PLAY_STATE):
                if (this.game.settings.controls && !this.game.player.start && !this.game.player.gameOver){
                    if (getMouseCanvasArea(x,y, 200, 10 ,100,100, fullscreen)){
                        this.game.player.setPause(audioCtx)
                    }
                    if (getMouseCanvasArea(x,y, 10, STANDARD_HEIGHT-130 ,120,120, fullscreen)){
                        this.game.player.moveLeftRight(audioCtx, -1)
                    }
                    if (getMouseCanvasArea(x,y, STANDARD_WIDTH-130, STANDARD_HEIGHT-130 ,120,120, fullscreen)){
                        this.game.player.moveLeftRight(audioCtx, 1)
                    }
                    if (getMouseCanvasArea(x,y, STANDARD_WIDTH - 130, STANDARD_HEIGHT-260 ,120,120, fullscreen)){
                        this.game.player.setJump(audioCtx)
                    }
                }

                break
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y - 80 ,200,200, fullscreen)){
                    this.game.player.setPause(audioCtx)
                    this.game.settings.setNewResolution()
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 250, STANDARD_CENTER_Y - 80 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.homeIcon = this.UIHomeIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y-20 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.configIcon = this.UIConfigIcon[1]
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 270, STANDARD_CENTER_Y - 210 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    if (this.game.settings.music){
                        this.game.stopMusic(this.game)
                    }else{
                        this.game.playMusic(this.game, audioCtx)
                    }
                    this.game.settings.music = !this.game.settings.music
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 170, STANDARD_CENTER_Y - 200 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.musicMinusIcon = this.UIMinusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 230, STANDARD_CENTER_Y - 200 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.musicPlusIcon = this.UIPlusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 290, STANDARD_CENTER_Y - 80 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.sounds = !this.game.settings.sounds
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 190, STANDARD_CENTER_Y - 70 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.soundMinusIcon = this.UIMinusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 210, STANDARD_CENTER_Y - 70 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.soundPlusIcon = this.UIPlusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 210, STANDARD_CENTER_Y + 60 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.resMinusIcon = this.UIMinusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 190, STANDARD_CENTER_Y +60 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.resPlusIcon = this.UIPlusIcon[1]
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X -260, STANDARD_CENTER_Y +160 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.controls = !this.game.settings.controls
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 140, STANDARD_CENTER_Y +160 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.threeD = !this.game.settings.threeD
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y +180 ,100,100, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.returnIcon = this.UIReturnIcon[1]
                }
                break
            case (GAME_OVER_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 100, STANDARD_CENTER_Y - 55 ,200,200, fullscreen)){
                    playTrack(contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.gameState = LOADING_STATE
                }
                break
        }

    }

    handleMouseUp(x, y, audioCtx, fullscreen) {
        this.homeIcon = this.UIHomeIcon[0]
        this.configIcon = this.UIConfigIcon[0]
        this.returnIcon = this.UIReturnIcon[0]
        switch (this.game.gameState){
            case (PAUSE_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 250, STANDARD_CENTER_Y - 80 ,100,100, fullscreen)){
                    this.game.gameState = LOADING_STATE
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 150, STANDARD_CENTER_Y-20 ,100,100, fullscreen)){
                    this.game.gameState = CONFIG_STATE
                }
                break
            case (CONFIG_STATE):
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 170, STANDARD_CENTER_Y - 200 ,100,100, fullscreen)){
                    this.musicMinusIcon = this.UIMinusIcon[0]
                    this.game.settings.musicVolume -= 1
                    if (this.game.settings.musicVolume < 0){
                        this.game.settings.musicVolume = 0
                    }
                    this.game.settings.setMusicVolume()
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 230, STANDARD_CENTER_Y - 200 ,100,100, fullscreen)){
                    this.musicPlusIcon = this.UIPlusIcon[0]
                    this.game.settings.musicVolume += 1
                    if (this.game.settings.musicVolume > 10){
                        this.game.settings.musicVolume = 10
                    }
                    this.game.settings.setMusicVolume()
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 190, STANDARD_CENTER_Y - 70 ,100,100, fullscreen)){
                    this.soundMinusIcon = this.UIMinusIcon[0]
                    this.game.settings.soundVolume -= 1
                    if (this.game.settings.soundVolume < 0){
                        this.game.settings.soundVolume = 0
                    }
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 210, STANDARD_CENTER_Y - 70 ,100,100, fullscreen)){
                    this.soundPlusIcon = this.UIPlusIcon[0]
                    this.game.settings.soundVolume += 1
                    if (this.game.settings.soundVolume > 10){
                        this.game.settings.soundVolume = 10
                    }
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 210, STANDARD_CENTER_Y + 60 ,100,100, fullscreen)){
                    this.resMinusIcon = this.UIMinusIcon[0]
                    this.game.settings.resolution --;
                    if (this.game.settings.resolution < 0){
                        this.game.settings.resolution = 0
                    }
                }
                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X + 190, STANDARD_CENTER_Y +60 ,100,100, fullscreen)){
                    this.resPlusIcon = this.UIPlusIcon[0]
                    this.game.settings.resolution ++;
                    if (this.game.settings.resolution > 3){
                        this.game.settings.resolution = 3
                    }
                }

                if (getMouseCanvasArea(x,y, STANDARD_CENTER_X - 70, STANDARD_CENTER_Y +180 ,100,100, fullscreen)){
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
