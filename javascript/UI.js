class UI {

    UIHomeIcon = [Images.UIHomeOff, Images.UIHomeOn]
    UIConfigIcon = [Images.UIConfigOff, Images.UIConfigOn]
    UIReturnIcon = [Images.UIReturnOff, Images.UIReturnOn]
    UIPlusIcon = [Images.UIPlusOff, Images.UIPlusOn]
    UIMinusIcon = [Images.UIMinusOff, Images.UIMinusOn]

    homeIcon = this.UIHomeIcon[0]
    configIcon = this.UIConfigIcon[0]
    returnIcon = this.UIReturnIcon[0]
    soundPlusIcon = this.UIPlusIcon[0]
    soundMinusIcon = this.UIMinusIcon[0]
    musicPlusIcon = this.UIPlusIcon[0]
    musicMinusIcon = this.UIMinusIcon[0]
    resPlusIcon = this.UIPlusIcon[0]
    resMinusIcon = this.UIMinusIcon[0]

    resPositions = [Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_X - 40, Game.STANDARD_CENTER_X +20 , Game.STANDARD_CENTER_X +80]

    constructor(game){
        this.game = game
        this.timer = 0
        this.ticker = 0
        this.beepControl = false
        this.score = new CanvasText( 160, 100, game.player.score, 45 , "#00712f")
        this.coins = new CanvasText( Game.STANDARD_WIDTH - 165, 100, game.player.coins, 45 , "#fd6601")
    }

    renderGameUI(ctx, canvas){
        let HMDraw = HelperMethods.draw
        HMDraw.drawToCanvas (canvas, ctx, Images.UIScore, 0 ,10, 180, 100)
        this.score.render(ctx, canvas)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIStar, Game.STANDARD_WIDTH-180 ,10, 180, 100)
        this.coins.render(ctx, canvas)
        this.drawFuel(ctx, canvas)
        if (this.game.settings.controls){
            HMDraw.drawToCanvas (canvas, ctx, Images.UIPauseButton, 200, 10, 100, 100)
            HMDraw.drawToCanvas (canvas, ctx, Images.UILeftButton, 10, Game.STANDARD_HEIGHT-130, 120, 120)
            HMDraw.drawToCanvas (canvas, ctx, Images.UIRightButton, Game.STANDARD_WIDTH-140, Game.STANDARD_HEIGHT-130, 120, 120)
            HMDraw.drawToCanvas (canvas, ctx, Images.UIJumpButton, Game.STANDARD_WIDTH-140, Game.STANDARD_HEIGHT-260, 120, 120)
        }
        this.renderPowerUpIcons(PowerUps.TURBO, ctx, canvas)
        this.renderPowerUpIcons(PowerUps.BOLT, ctx, canvas)
        this.renderPowerUpIcons(PowerUps.DOUBLE, ctx, canvas)
        this.renderPowerUpIcons(PowerUps.SHIELD, ctx, canvas)
        this.renderMiniMap(ctx, canvas)
    }

    renderPauseUI(ctx, canvas){
        let HMDraw = HelperMethods.draw
        HMDraw.drawToCanvas (canvas, ctx, Images.UIPause, Game.STANDARD_CENTER_X - 350, Game.STANDARD_CENTER_Y - 200, 700, 400)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIResume, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 80, 200, 200)
        HMDraw.drawToCanvas (canvas, ctx, this.homeIcon, Game.STANDARD_CENTER_X - 250, Game.STANDARD_CENTER_Y -20, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.configIcon, Game.STANDARD_CENTER_X + 150, Game.STANDARD_CENTER_Y-20, 100, 100)
    }
    renderMiniMap(ctx, canvas){
        let HMDraw = HelperMethods.draw
        let road = this.game.road
        let spriteWidth = 20
        let spriteLength = 8
        let startSegment = this.game.player.currentSegment.index
        let finalSegment = startSegment + this.game.gameCamera.drawDistance
        let startZ = this.game.player.z
        let finalZ = startZ + this.game.gameCamera.drawDistance*Game.SEGMENT_LENGTH
        ctx.fillStyle = "rgba(47,47,47,0.58)"
        HMDraw.drawRectToCanvas(canvas, ctx, Game.STANDARD_WIDTH - 140, 140 , 120, 300)
        ctx.fillStyle = this.setMapCarColor()
        HMDraw.drawRectToCanvas(canvas, ctx, this.setMapX(this.game.player.x), 420 , spriteWidth, spriteLength)
        for (let n = startSegment; n < finalSegment; n++){
            let roadObjects = road.segments[n].inRoadObjects
            if (roadObjects.length > 0){
                for (let index in roadObjects){
                    let object = roadObjects[index]
                    if (object instanceof Cars){
                        ctx.fillStyle = "#ff0000"
                        HMDraw.drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    } else if (object instanceof Traffic){
                        ctx.fillStyle = "#05e5bc"
                        HMDraw.drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }else if (object instanceof Animals){
                        ctx.fillStyle = "#e9f500"
                        HMDraw.drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }else if (object instanceof Obstacles){
                        ctx.fillStyle = "#ff8f00"
                        HMDraw.drawRectToCanvas(canvas, ctx, this.setMapX(object.x), this.setMapY(object.z, startZ, finalZ) , spriteWidth, spriteLength)
                    }
                }
            }
        }
    }

    renderConfigUI(ctx, canvas){
        let HMDraw = HelperMethods.draw
        HMDraw.drawToCanvas (canvas, ctx, Images.UIConfig, Game.STANDARD_CENTER_X - 350, Game.STANDARD_CENTER_Y - 250, 700, 600)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIMusic, Game.STANDARD_CENTER_X - 270, Game.STANDARD_CENTER_Y - 210, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.game.settings.music? Images.UISelectorOn: Images.UISelectorOff, Game.STANDARD_CENTER_X - 280, Game.STANDARD_CENTER_Y-150, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.musicMinusIcon, Game.STANDARD_CENTER_X - 170, Game.STANDARD_CENTER_Y - 200, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.musicPlusIcon, Game.STANDARD_CENTER_X + 230, Game.STANDARD_CENTER_Y - 200, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIScale, Game.STANDARD_CENTER_X - 60, Game.STANDARD_CENTER_Y - 250, 300, 80)
        ctx.fillStyle = "#5c0000"
        HMDraw.drawRectToCanvas(canvas,ctx, Game.STANDARD_CENTER_X - 60, Game.STANDARD_CENTER_Y - 185, this.game.settings.musicVolume*140, 50)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIRedBar, Game.STANDARD_CENTER_X - 70, Game.STANDARD_CENTER_Y - 210, 300, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UISound, Game.STANDARD_CENTER_X - 290, Game.STANDARD_CENTER_Y - 80, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.game.settings.sounds? Images.UISelectorOn: Images.UISelectorOff, Game.STANDARD_CENTER_X - 300, Game.STANDARD_CENTER_Y -20, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.soundMinusIcon, Game.STANDARD_CENTER_X - 190, Game.STANDARD_CENTER_Y - 70, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.soundPlusIcon, Game.STANDARD_CENTER_X + 210, Game.STANDARD_CENTER_Y - 70, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIScale, Game.STANDARD_CENTER_X - 80, Game.STANDARD_CENTER_Y - 120, 300, 80)
        ctx.fillStyle = "#144c20"
        HMDraw.drawRectToCanvas(canvas,ctx, Game.STANDARD_CENTER_X - 80, Game.STANDARD_CENTER_Y - 55, this.game.settings.soundVolume*140, 50)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIGreenBar, Game.STANDARD_CENTER_X - 90, Game.STANDARD_CENTER_Y - 80, 300, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIRes, Game.STANDARD_CENTER_X - 310, Game.STANDARD_CENTER_Y + 50, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.resMinusIcon, Game.STANDARD_CENTER_X - 210, Game.STANDARD_CENTER_Y + 60, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.resPlusIcon, Game.STANDARD_CENTER_X + 190, Game.STANDARD_CENTER_Y + 60, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIWhiteBar, Game.STANDARD_CENTER_X - 110, Game.STANDARD_CENTER_Y + 50, 300, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIBarSelector, this.resPositions[this.game.settings.resolution], Game.STANDARD_CENTER_Y + 47, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIControl, Game.STANDARD_CENTER_X -260, Game.STANDARD_CENTER_Y + 160, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.game.settings.controls? Images.UISelectorOn: Images.UISelectorOff, Game.STANDARD_CENTER_X -270, Game.STANDARD_CENTER_Y + 220, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, Images.UI3d, Game.STANDARD_CENTER_X + 140, Game.STANDARD_CENTER_Y + 160, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.game.settings.threeD? Images.UISelectorOn: Images.UISelectorOff, Game.STANDARD_CENTER_X + 130, Game.STANDARD_CENTER_Y + 220, 100, 100)
        HMDraw.drawToCanvas (canvas, ctx, this.returnIcon, Game.STANDARD_CENTER_X - 70, Game.STANDARD_CENTER_Y + 180, 100, 100)
    }

    renderGameOverUI(ctx, canvas){
        let HMDraw = HelperMethods.draw
        HMDraw.drawToCanvas (canvas, ctx, Images.UIGameOver, Game.STANDARD_CENTER_X - 350, Game.STANDARD_CENTER_Y - 150, 700, 300)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIReturn, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y-55, 200, 200)
    }

    drawFuel(ctx, canvas){
        let HMDraw = HelperMethods.draw
        let fuel = this.game.player.fuel
        ctx.fillStyle = "#ff5a0a"
        let width = fuel*2.6
        HMDraw.drawRectToCanvas(canvas, ctx, Game.STANDARD_CENTER_X - 85, 32 , width, 52)
        HMDraw.drawToCanvas (canvas, ctx, Images.UIFuel, Game.STANDARD_CENTER_X - 180, 10, 360, 100)
        if (fuel < 20){
            if (this.ticker%2 === 0){
                HMDraw.drawToCanvas (canvas, ctx, Images.UIRedFuel, Game.STANDARD_CENTER_X-162, 24, 65, 70)
            }
        }
    }

    setMapCarColor(){
        switch (this.game.player.color){
            case (Game.PINK):
                return "#b300b3"
            case (Game.BLUE):
                return "#0021c4"
            case (Game.GREEN):
                return "#008000"
            default:
                return "rgba(47,47,47,0.58)"
        }
    }

    setMapX(x){
        return HelperMethods.math.interpolate(-0.8,1.2,Game.STANDARD_WIDTH - 140,Game.STANDARD_WIDTH - 20, x)
    }

    setMapY(z, startZ, finalZ){
        return HelperMethods.math.interpolate(startZ,finalZ,420,140, z)
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
                    HelperMethods.sound.playTrack(Sounds.contextSounds["fuel_beep"], audioCtx, this.game.settings.sounds)
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
            case (PowerUps.TURBO):
                icons = Images.turboIcons
                powerUpCounter = this.game.player.turbo
                height = 100
                break;
            case (PowerUps.BOLT):
                icons = Images.boltIcons
                powerUpCounter = this.game.player.transparent
                height =210
                break;
            case (PowerUps.DOUBLE):
                icons = Images.doubleIcons
                powerUpCounter = this.game.player.double
                height = 320
                break;
            case (PowerUps.SHIELD):
                icons = Images.shieldIcons
                powerUpCounter = this.game.player.shield
                height = 430
                break;
        }
        if (powerUpCounter > 0){
            HelperMethods.draw.drawToCanvas (canvas, ctx, icons[Math.max(0,9-Math.floor(powerUpCounter/30))], 10, height, 100, 100)
        }

}


    handleMouseDown(x, y, audioCtx, canvasWidth, canvasHeight) {
        let HMMouse = HelperMethods.mouseTouch
        let HMSound = HelperMethods.sound
        switch (this.game.gameState){
            case (Game.PLAY_STATE):
                if (this.game.settings.controls && !this.game.player.start && !this.game.player.gameOver){
                    if (HMMouse.getMouseCanvasArea(x,y, 200, 10 ,100,100, canvasWidth, canvasHeight)){
                        this.game.player.setPause(audioCtx)
                    }
                    if (HMMouse.getMouseCanvasArea(x,y, 10, Game.STANDARD_HEIGHT-130 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.moveLeftRight(audioCtx, -1)
                    }
                    if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_WIDTH-130, Game.STANDARD_HEIGHT-130 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.moveLeftRight(audioCtx, 1)
                    }
                    if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_WIDTH - 130, Game.STANDARD_HEIGHT-260 ,120,120, canvasWidth, canvasHeight)){
                        this.game.player.setJump(audioCtx)
                    }
                }

                break
            case (Game.PAUSE_STATE):
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 80 ,200,200, canvasWidth, canvasHeight)){
                    this.game.player.setPause(audioCtx)
                    this.game.settings.setNewResolution()
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 250, Game.STANDARD_CENTER_Y - 80 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.homeIcon = this.UIHomeIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 150, Game.STANDARD_CENTER_Y-20 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.configIcon = this.UIConfigIcon[1]
                }
                break
            case (Game.CONFIG_STATE):
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 270, Game.STANDARD_CENTER_Y - 210 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    if (this.game.settings.music){
                        this.game.stopMusic(this.game)
                    }else{
                        this.game.playMusic(this.game, audioCtx)
                    }
                    this.game.settings.music = !this.game.settings.music
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 170, Game.STANDARD_CENTER_Y - 200 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.musicMinusIcon = this.UIMinusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 230, Game.STANDARD_CENTER_Y - 200 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.musicPlusIcon = this.UIPlusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 290, Game.STANDARD_CENTER_Y - 80 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.sounds = !this.game.settings.sounds
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 190, Game.STANDARD_CENTER_Y - 70 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.soundMinusIcon = this.UIMinusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 210, Game.STANDARD_CENTER_Y - 70 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.soundPlusIcon = this.UIPlusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 210, Game.STANDARD_CENTER_Y + 60 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.resMinusIcon = this.UIMinusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 190, Game.STANDARD_CENTER_Y +60 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.resPlusIcon = this.UIPlusIcon[1]
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X -260, Game.STANDARD_CENTER_Y +160 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.controls = !this.game.settings.controls
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 140, Game.STANDARD_CENTER_Y +160 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.settings.threeD = !this.game.settings.threeD
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 70, Game.STANDARD_CENTER_Y +180 ,100,100, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.returnIcon = this.UIReturnIcon[1]
                }
                break
            case (Game.GAME_OVER_STATE):
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 55 ,200,200, canvasWidth, canvasHeight)){
                    HMSound.playTrack(Sounds.contextSounds["click"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    this.game.gameState = Game.LOADING_STATE
                }
                break
        }

    }

    handleMouseUp(x, y, audioCtx, canvasWidth, canvasHeight) {
        let HMMouse = HelperMethods.mouseTouch
        this.homeIcon = this.UIHomeIcon[0]
        this.configIcon = this.UIConfigIcon[0]
        this.returnIcon = this.UIReturnIcon[0]
        this.soundPlusIcon = this.UIPlusIcon[0]
        this.soundMinusIcon = this.UIMinusIcon[0]
        this.musicPlusIcon = this.UIPlusIcon[0]
        this.musicMinusIcon = this.UIMinusIcon[0]
        this.resPlusIcon = this.UIPlusIcon[0]
        this.resMinusIcon = this.UIMinusIcon[0]
        switch (this.game.gameState){
            case (Game.PAUSE_STATE):
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 250, Game.STANDARD_CENTER_Y - 80 ,100,100, canvasWidth, canvasHeight)){
                    menu.returnToMenu()
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 150, Game.STANDARD_CENTER_Y-20 ,100,100, canvasWidth, canvasHeight)){
                    this.game.gameState = Game.CONFIG_STATE
                }
                break
            case (Game.CONFIG_STATE):
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 170, Game.STANDARD_CENTER_Y - 200 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.musicVolume -= 0.2
                    if (this.game.settings.musicVolume < 0){
                        this.game.settings.musicVolume = 0
                    }
                    this.game.settings.setMusicVolume()
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 230, Game.STANDARD_CENTER_Y - 200 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.musicVolume += 0.2
                    if (this.game.settings.musicVolume > 2){
                        this.game.settings.musicVolume = 2
                    }
                    this.game.settings.setMusicVolume()
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 190, Game.STANDARD_CENTER_Y - 70 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.soundVolume -= 0.2
                    if (this.game.settings.soundVolume < 0){
                        this.game.settings.soundVolume = 0
                    }
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 210, Game.STANDARD_CENTER_Y - 70 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.soundVolume += 0.2
                    if (this.game.settings.soundVolume > 2){
                        this.game.settings.soundVolume = 2
                    }
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 210, Game.STANDARD_CENTER_Y + 60 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.resolution --;
                    if (this.game.settings.resolution < 0){
                        this.game.settings.resolution = 0
                    }
                }
                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X + 190, Game.STANDARD_CENTER_Y +60 ,100,100, canvasWidth, canvasHeight)){
                    this.game.settings.resolution ++;
                    if (this.game.settings.resolution > 3){
                        this.game.settings.resolution = 3
                    }
                }

                if (HMMouse.getMouseCanvasArea(x,y, Game.STANDARD_CENTER_X - 70, Game.STANDARD_CENTER_Y +180 ,100,100, canvasWidth, canvasHeight)){
                    this.game.gameState = Game.PAUSE_STATE
                }
                break
        }

    }

}


