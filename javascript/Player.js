// classe que contem os elementos do jogador
class Player {

    movingLane = false
    nextLane = 1
    gravity = 1
    jumpSpeed = -18
    MAX_POWER_UP_COUNTER = 300;
    MAX_EVENTS_COUNTER = 180;
    MAX_FUEL = 100;
    currentSprite = 0

    // ---------------------------------------------------------------------------------
    // Construtor & Setting Functions
    // ---------------------------------------------------------------------------------

    constructor(game, color, difficulty) {
        this.game = game;
        this.difficulty = difficulty;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0.3;
        this.color = color
        this.fuel = this.MAX_FUEL;
        this.sprites = null
        this.screen = {x:0, y:0, w:0, h:0}
        this.speed = 0;
        this.lanes = Road.ROAD_LANES
        this.currentLane = 1
        this.score = 0;
        this.coins = 0;
        this.jumping = false;
        this.over = false;
        this.turboSpeed=(difficulty.START_SPEED + 5*difficulty.INCREMENT_SPEED) *1.3
        this.currentSpeed = this.speed
        this.transparent = 0;
        this.turbo = 0;
        this.double = 0;
        this.shield = 0;
        this.ySpeed = 0;
        this.currentSegment = null
        this.acceleration = Game.MAX_SPEED/20;
        this.mask = {x:this.x, y:this.y, w:this.w, s: 200}
        this.spriteHeight = Images.SPRITE_SIZE
        this.start = true
        this.startCounter = this.MAX_EVENTS_COUNTER
        this.gameOver = false
        this.gameOverCounter = 0;
        this.turboEffect = null
        this.turboEffect2 = null
        this.getReadyEffect = new Effects(Effects.GET_READY, Game.STANDARD_CENTER_X - 337, Game.STANDARD_CENTER_Y - 75)
        this.gameOverEffect = new Effects(Effects.GAME_OVER, Game.STANDARD_CENTER_X - 337, Game.STANDARD_CENTER_Y - 75)
        this.glitterEffect = new Effects(Effects.GLITTER, this.screen.x, this.screen.y)
        this.explosionEffect = new Effects(Effects.EXPLOSION, this.screen.x, this.screen.y)
        this.shieldEffect = new Effects(Effects.SHIELD_EFFECT, this.screen.x, this.screen.y)
        this.starEffect = new Effects(Effects.STAR, this.screen.x, this.screen.y)
        this.gotEffect = new Effects(Effects.GOT_ITEM, this.screen.x, this.screen.y)
        this.turboEffectCorrector = 0
        this.changingStage = false
        this.selectCounter = 0;
    }

    init(){
        // set the player screen size
        this.screen.w = Images.SPRITE_SIZE;
        this.screen.h = Images.SPRITE_SIZE;

        // set the player screen position
        this.screen.x = Game.STANDARD_CENTER_X - Images.SPRITE_SIZE/2
        this.screen.y = Game.STANDARD_HEIGHT - this.screen.h;

        // set the player Colors
        this.sprites = this.setSpritesColor(this.color)
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 1200;
        this.currentSegment = this.game.road.findSegment(this.z)
        this.currentSpeed = 0
    }

    setSpritesColor(color){
        switch (color){
            case Game.BLUE: {
                this.turboEffect = new Effects(Effects.FIRE, this.screen.x, this.screen.y)
                this.turboEffect2 = new Effects(Effects.FIRE, this.screen.x, this.screen.y)
                return  Images.bluePlayerSprites
            }
            case Game.PINK: {
                this.turboEffect = new Effects(Effects.TURBO_EFFECT, this.screen.x, this.screen.y)
                return  Images.pinkPlayerSprites
            }
            case Game.GREEN: {
                this.turboEffect = new Effects(Effects.FIRE, this.screen.x, this.screen.y)
                this.turboEffect2 = new Effects(Effects.FIRE, this.screen.x, this.screen.y)
                return  Images.greenPlayerSprites
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // Update Functions And Render
    // ---------------------------------------------------------------------------------

    update(dt, audioCtx) {
        this.setMask(dt)
        this.speedControl(dt);
        this.fuelControl(dt)
        this.segmentCount();
        this.updateEffects()
        this.setPlayerXScreen()
        this.startCountDown(audioCtx)
        this.gameOverCountDown(audioCtx)
        this.setLanes()
        this.countPowerUps()
        this.selectCountDown()
        this.SettingJumpingY(dt)
        this.checkCollidingGameOver(audioCtx)
        this.checkCollidingCoins(audioCtx)
        this.checkCollidingPowerUp(audioCtx)
        this.checkCollidingFuel(audioCtx)
    }

    updateEffects(){
        this.turboEffect.update()
        if (this.turboEffect2 !== null){
            this.turboEffect2.update()
        }
        this.getReadyEffect.update()
        this.explosionEffect.update()
        this.glitterEffect.update()
        this.gameOverEffect.update()
        this.shieldEffect.update()
        this.starEffect.update()
        this.gotEffect.update()
    }

    countPowerUps(){
        if (this.turbo > 0){
            this.turbo--
            if (this.color === Game.GREEN){
                this.turboEffect.setXY(this.screen.x + 20 + this.turboEffectCorrector, this.screen.y + 60)
                this.turboEffect2.setXY(this.screen.x + 50 + this.turboEffectCorrector, this.screen.y + 60)
            }
            if (this.color === Game.BLUE){
                this.turboEffect.setXY(this.screen.x + 20 + this.turboEffectCorrector, this.screen.y + 30)
                this.turboEffect2.setXY(this.screen.x + 50 + this.turboEffectCorrector, this.screen.y + 30)
            }
            if (this.color === Game.PINK){
                this.turboEffect.setXY(this.screen.x + 32 + this.turboEffectCorrector, this.screen.y + 65)
            }
        }

        if (this.transparent > 0){
            this.transparent--
        }
        if (this.double > 0){
            this.glitterEffect.setXY(this.screen.x, this.screen.y)
            this.double--
            if (this.double === 0){
                this.glitterEffect.setStop()
            }
        }
        if (this.shield > 0){
            this.shieldEffect.setXY(this.screen.x - 26, this.screen.y - 26)
            this.shield--
            if (this.shield === 0){
                this.shieldEffect.setStop()
            }
        }

    }

    render(ctx, canvas) {
        let playerSegmentCurve = this.currentSegment.curve;
        let HMDraw = HelperMethods.draw
        this.gotEffect.render(ctx, canvas)
        this.startRender(ctx, canvas)
        this.gameOverRender(ctx, canvas)
        this.selectRender(ctx, canvas)
        if (this.transparent > 0 && this.transparent %2 === 0){
            return
        }
        let shadowScale = Images.SPRITE_SIZE*this.screen.y/586
        HMDraw.drawShadow(this.screen.x,  Game.STANDARD_HEIGHT - this.screen.h, shadowScale, ctx, canvas)
        if (playerSegmentCurve >= 4 ){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -24
                } else if (this.nextLane < this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -8
                }
            }  else {
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -24
            }
        } else if ( playerSegmentCurve  < 4 && playerSegmentCurve > 2){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -24
                } else if (this.nextLane < this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 0
                }
            }  else {
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -8
            }
        } else if ( playerSegmentCurve  < -2 && playerSegmentCurve > -4) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 0
                } else if (this.nextLane < this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 8
                }
            }  else {
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 30
            }
        } else if  ( playerSegmentCurve  <= -4) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 8
                } else if (this.nextLane < this.currentLane){
                    HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 30
                }
            }  else {
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 30
            }
        } else {
            if (this.nextLane > this.currentLane){
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -8
            } else if (this.nextLane < this.currentLane){
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 8
            } else if (!this.movingLane){
                HMDraw.drawToCanvas(canvas, ctx, this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, Images.SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 0
            }
        }
        if (this.double > 0){
            this.glitterEffect.render(ctx, canvas)
        }
        if (this.turbo> 0 ){
            this.turboEffect.render(ctx, canvas)
            if (this.turboEffect2 !== null){
                this.turboEffect2.render(ctx, canvas)
            }
        }
        if (this.shield > 0){
            this.shieldEffect.render(ctx, canvas)
        }
        if (this.gameOver){
            this.starEffect.render(ctx, canvas)
        }

    }

    // ---------------------------------------------------------------------------------
    // Start Functions
    // ---------------------------------------------------------------------------------

    startCountDown(audioCtx){
        let HMSound = HelperMethods.sound
        if (this.start){
            this.startCounter--
            if (!this.getReadyEffect.play){
                this.getReadyEffect.setPlay()
            }
            if (this.startCounter === 160){
                HMSound.playTrack(Sounds.contextSounds["start_your_engines"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
            if (this.startCounter === 70 || this.startCounter === 55 || this.startCounter === 40 ){
                HMSound.playTrack(Sounds.contextSounds["light_1"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
            if (this.startCounter === 25){
                this.currentSpeed = this.difficulty.START_SPEED
                HMSound.playTrack(Sounds.contextSounds["light_2"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
            if (this.startCounter === 25 || this.startCounter === 18 || this.startCounter === 10){
                HMSound.playTrack(Sounds.contextSounds["go"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
            if (this.startCounter === 0){
                this.start = false
            }
        }
    }

    startRender(ctx, canvas){
        let HMDraw = HelperMethods.draw
        if (this.start){
            if (this.startCounter <= 180 && this.startCounter > 100){
                this.getReadyEffect.render(ctx, canvas)
            }
            if (this.startCounter === 100){
                this.getReadyEffect.setStop()
            }
            if (this.startCounter < 100 && this.startCounter >= 70){
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X - 400, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X + 200, Game.STANDARD_CENTER_Y - 150, 200, 350)
            }
            if (this.startCounter < 70 && this.startCounter >= 55){
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X - 400, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X + 200, Game.STANDARD_CENTER_Y - 150, 200, 350)
            }
            if (this.startCounter < 55 && this.startCounter >= 40){
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X - 400, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_out, Game.STANDARD_CENTER_X + 200, Game.STANDARD_CENTER_Y - 150, 200, 350)
            }
            if (this.startCounter < 40 && this.startCounter >= 25){
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X - 400, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_red, Game.STANDARD_CENTER_X + 200, Game.STANDARD_CENTER_Y - 150, 200, 350)
            }
            if (this.startCounter < 25 && this.startCounter > 0){
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_green, Game.STANDARD_CENTER_X - 400, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_green, Game.STANDARD_CENTER_X - 100, Game.STANDARD_CENTER_Y - 150, 200, 350)
                HMDraw.drawToCanvas(canvas, ctx, Images.lights_green, Game.STANDARD_CENTER_X + 200, Game.STANDARD_CENTER_Y - 150, 200, 350)
            }
            if (this.startCounter < 20 && this.startCounter > 0){
                if (this.startCounter %2 === 0){
                    HMDraw.drawToCanvas(canvas, ctx, Images.go1, Game.STANDARD_CENTER_X - 350, Game.STANDARD_CENTER_Y - 220, 700, 100)
                } else {
                    HMDraw.drawToCanvas(canvas, ctx, Images.go2, Game.STANDARD_CENTER_X - 350, Game.STANDARD_CENTER_Y - 220, 700, 100)
                }
            }
        }

    }

    // ---------------------------------------------------------------------------------
    // Select And Change Stage Functions
    // ---------------------------------------------------------------------------------

    selectCountDown(){
        if (this.selectCounter > 0){
            this.selectCounter--
        }
    }

    selectRender(ctx, canvas){
        let HMDraw = HelperMethods.draw
        if (this.selectCounter > 0){
            if ((this.selectCounter < 180 && this.selectCounter >= 160) ||
                (this.selectCounter < 140 && this.selectCounter >= 120) ||
                (this.selectCounter < 100 && this.selectCounter >= 80) ||
                (this.selectCounter < 60 && this.selectCounter >= 40) ||
                (this.selectCounter < 20 && this.selectCounter >= 0)){
                if (this.changingStage){
                    if (this.game.nextStage === this.game.nextLeft){
                        HMDraw.drawToCanvas(canvas, ctx, Images.turnLeftSign, Game.STANDARD_CENTER_X - 500, Game.STANDARD_CENTER_Y - 200, 250, 250)
                        HMDraw.drawToCanvas(canvas, ctx, Game.stageObjects[this.game.nextLeft].GUI_SIGN, Game.STANDARD_CENTER_X - 500, Game.STANDARD_CENTER_Y + 100, 250, 60)
                    } else if (this.game.nextStage === this.game.nextRight){
                        HMDraw.drawToCanvas(canvas, ctx, Images.turnRightSign, Game.STANDARD_CENTER_X + 250, Game.STANDARD_CENTER_Y - 200, 250, 250)
                        HMDraw.drawToCanvas(canvas, ctx, Game.stageObjects[this.game.nextRight].GUI_SIGN, Game.STANDARD_CENTER_X + 250, Game.STANDARD_CENTER_Y + 100, 250, 60)
                    }
                } else {
                    HMDraw.drawToCanvas(canvas, ctx, Images.turnLeftSign, Game.STANDARD_CENTER_X - 500, Game.STANDARD_CENTER_Y - 200, 250, 250)
                    HMDraw.drawToCanvas(canvas, ctx, Game.stageObjects[this.game.nextLeft].GUI_SIGN, Game.STANDARD_CENTER_X - 500, Game.STANDARD_CENTER_Y + 100, 250, 60)
                    HMDraw.drawToCanvas(canvas, ctx, Images.turnRightSign, Game.STANDARD_CENTER_X + 250, Game.STANDARD_CENTER_Y - 200, 250, 250)
                    HMDraw.drawToCanvas(canvas, ctx, Game.stageObjects[this.game.nextRight].GUI_SIGN, Game.STANDARD_CENTER_X + 250, Game.STANDARD_CENTER_Y + 100, 250, 60)
                }

            }
        }

    }

    // ---------------------------------------------------------------------------------
    // GameOver Functions
    // ---------------------------------------------------------------------------------

    setGameOverStatus(z){
        this.speed = 0
        this.currentSpeed = 0
        this.gameOver = true
        this.gameOverCounter = this.MAX_EVENTS_COUNTER
        this.turbo = 0
        this.transparent = 0
        this.double = 0
        this.shield = 0
        this.game.stopMusic(this.game)
        if (z){
            this.z = z-Game.SEGMENT_LENGTH
        }

    }

    gameOverCountDown(audioCtx){
        if (this.gameOver){
            this.gameOverCounter--
            if (this.gameOverCounter === 179){
                this.game.currentMusic.stop()
                HelperMethods.sound.playTrack(Sounds.contextSounds["lose"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                this.explosionEffect.setXY(this.screen.x - 64, this.screen.y-64)
                this.jumping = true
                this.ySpeed = -10
            }
            if (this.gameOverCounter === 100){
                HelperMethods.sound.playTrack(Sounds.contextSounds["game_over"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
            if (!this.gameOverEffect.play){
                this.gameOverEffect.setPlay()
            }
            if (!this.explosionEffect.play){
                this.explosionEffect.setPlay()
            }
            if (!this.starEffect.play){
                this.starEffect.setPlay()
            }
            this.starEffect.setXY(this.screen.x + 32, this.screen.y - 20)
            if (this.gameOverCounter === 0){
                this.game.gameState = Game.GAME_OVER_STATE
            }
        }
    }

    gameOverRender(ctx, canvas){
        if (this.gameOver){
            this.gameOverEffect.render(ctx, canvas)
            if (this.fuel > 0){
                this.explosionEffect.render(ctx, canvas)
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // Colliding Functions
    // ---------------------------------------------------------------------------------

    setMask(dt){
        this.mask = {x:this.x, z:this.z, w:this.w, s: this.speed*dt}
    }

    isColliding(object) {
        let thisZ = this.mask.z
        if (object.z > thisZ - 500 && object.z < thisZ + this.game.gameCamera.drawDistance * Game.SEGMENT_LENGTH){
        let thisX = this.mask.x
        let objectX = object.mask.x
        let objectZ = object.mask.z
        let thisWidth = this.mask.w
        let objectWidth = object.mask.w
        let thisSize = this.mask.s
        let objectSize = object.mask.s
            return ((thisX < objectX + objectWidth) &&
                (thisX + thisWidth > objectX) &&
                (thisZ < objectZ + objectSize) &&
                (thisZ + thisSize > objectZ))
        } else{
            return false
        }
    }

    checkCollidingCoins(audioCtx){
        for (let n = 0; n < this.game.road.totalCoins.length; n++){
            if (this.isColliding(this.game.road.totalCoins[n]) && !this.over){
                this.game.road.totalCoins.splice(n, 1)
                this.gotEffect.setXY(this.screen.x, this.screen.y - 64)
                this.gotEffect.setPlay()
                this.coins++
                this.score++
                if (this.double > 0){
                    this.coins++
                    this.score++
                }
                HelperMethods.sound.playTrack(Sounds.contextSounds["coin"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
        }
    }

    checkCollidingFuel(audioCtx){
        for (let n = 0; n < this.game.road.totalFuel.length; n++){
            if (this.isColliding(this.game.road.totalFuel[n]) && !this.over){
                this.game.road.totalFuel.splice(n, 1)
                this.gotEffect.setXY(this.screen.x, this.screen.y -64)
                this.gotEffect.setPlay()
                this.fuel = this.MAX_FUEL
                HelperMethods.sound.playTrack(Sounds.contextSounds["bubbles"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            }
        }
    }

    checkCollidingPowerUp(audioCtx){
        let HMSound = HelperMethods.sound
        for (let n = 0; n < this.game.road.totalPowerUps.length; n++){
            if (this.isColliding(this.game.road.totalPowerUps[n]) && !this.over){
                this.gotEffect.setXY(this.screen.x, this.screen.y -64)
                this.gotEffect.setPlay()
                switch (this.game.road.totalPowerUps[n].type){
                    case (PowerUps.TURBO):
                        this.turbo = this.MAX_POWER_UP_COUNTER
                        HMSound.playTrack(Sounds.contextSounds["turbo"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                        this.turboEffect.setPlay()
                        if (this.turboEffect2 !== null){
                            this.turboEffect2.setPlay()
                        }
                        this.speed = this.turboSpeed
                        break;
                    case (PowerUps.BOLT):
                        this.transparent = this.MAX_POWER_UP_COUNTER
                        HMSound.playTrack(Sounds.contextSounds["vanish"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                        break;
                    case (PowerUps.DOUBLE):
                        this.double = this.MAX_POWER_UP_COUNTER
                        HMSound.playTrack(Sounds.contextSounds["bell"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                        this.glitterEffect.setPlay()
                        break;
                    case (PowerUps.SHIELD):
                        this.shield = this.MAX_POWER_UP_COUNTER
                        HMSound.playTrack(Sounds.contextSounds["get_shield"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                        this.shieldEffect.setPlay()
                        break;
                }
                this.game.road.totalPowerUps.splice(n, 1)
            }
        }
    }

    checkCollidingGameOver(audioCtx){
        let HMSound = HelperMethods.sound
        for (let n = 0; n < this.game.road.totalTraffic.length; n++){
            if (this.isColliding(this.game.road.totalTraffic[n]) && this.transparent  === 0 && !this.gameOver  && !this.over){
                if (this.shield > 0){
                    this.game.road.totalTraffic[n].hitByShield(audioCtx)
                } else{
                    this.setGameOverStatus(this.game.road.totalTraffic[n].z)
                    this.game.road.totalTraffic[n].speed = 0
                    HMSound.playTrack(Sounds.contextSounds["crash"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                }
            }
        }
        for (let n = 0; n < this.game.road.totalCars.length; n++){
            if (this.isColliding(this.game.road.totalCars[n]) && this.transparent  === 0 && !this.gameOver  && !this.over){
                if (this.shield > 0){
                    this.game.road.totalCars[n].hitByShield(audioCtx)
                } else{
                    this.setGameOverStatus(this.game.road.totalCars[n].z)
                    this.game.road.totalCars[n].speed = 0
                    HMSound.playTrack(Sounds.contextSounds["crash"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                }
            }
        }
        for (let n = 0; n < this.game.road.totalObstacles.length; n++){
            if (this.isColliding(this.game.road.totalObstacles[n]) && this.transparent === 0 && !this.gameOver){
                if (this.shield > 0){
                    this.game.road.totalObstacles[n].hitByShield(audioCtx)
                } else {
                    this.setGameOverStatus(this.game.road.totalObstacles[n].z)
                    HMSound.playTrack(Sounds.contextSounds["crash"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                }
            }
        }
        for (let n = 0; n < this.game.road.totalAnimals.length; n++){
            if (this.isColliding(this.game.road.totalAnimals[n]) && this.transparent === 0 && !this.gameOver  && !this.over){
                this.game.road.totalAnimals[n].hit = true
                if (this.shield > 0){
                    this.game.road.totalAnimals[n].hitByShield(audioCtx)
                } else {
                    this.setGameOverStatus(this.game.road.totalAnimals[n].z)
                    HMSound.playTrack(this.game.road.totalAnimals[n].sound, audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                    HMSound.playTrack(Sounds.contextSounds["crash"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
                }
            }
        }
    }

    // ---------------------------------------------------------------------------------
    // Position And Speed Functions
    // ---------------------------------------------------------------------------------

    segmentCount() {
        let MAX_SPRITES = 2;
        let thisSegmentIndex = this.game.road.findSegment(this.z).index
        let currSegmentIndex = this.currentSegment.index
        if (thisSegmentIndex !== currSegmentIndex) {
            let delta = thisSegmentIndex - currSegmentIndex
            this.currentSegment = this.game.road.findSegment(this.z)
            this.currentSprite++;
            this.score += 0.1*delta
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
        }
    }

    speedControl(dt) {
        if (this.turbo === 0){
            if (this.speed < this.currentSpeed){
                this.speed += this.acceleration
            } else if (this.speed > this.currentSpeed){
                this.speed -= this.acceleration
            }
        }
        this.z += this.speed * dt
    }


    fuelControl(dt) {
        if (this.speed > 0 && this.turbo === 0 && !this.changingStage) {
            this.fuel -= dt * this.speed / (1000 * this.difficulty.GAS_CORRECTION)
        }
        if (this.fuel < 0 && !this.gameOver) {
            this.setGameOverStatus()
        }
    }

    setLanes(){
        if (this.movingLane){
            if (this.currentLane > this.nextLane){
                if (this.x > this.lanes[this.nextLane]){
                    this.x = this.x - 0.15
                } else{
                    this.currentLane = this.nextLane
                    this.movingLane = false
                }
            } else if (this.currentLane < this.nextLane){
                if (this.x < this.lanes[this.nextLane]){
                    this.x = this.x + 0.15
                } else{
                    this.currentLane = this.nextLane
                    this.movingLane = false
                }
            }
            if (this.nextLane > this.lanes.length || this.nextLane < 0){
                this.movingLane = false
            }
        } else {
            this.x = this.lanes[this.currentLane]
        }
    }

    SettingJumpingY(){
        this.spriteHeight = Images.SPRITE_SIZE - this.ySpeed*1.5
        if (!this.start){
            if (!this.jumping){
                this.ySpeed = 0;
                this.y = this.currentSegment.worldPoints.y
                if (!this.gameOver){
                    this.screen.y = Game.STANDARD_HEIGHT - this.screen.h + Math.floor((Math.random()*5))-10
                }
            } else {
                this.screen.y += this.ySpeed
                this.ySpeed += this.gravity
                if (this.screen.y > Game.STANDARD_HEIGHT - this.screen.h){
                    this.jumping = false
                }
            }
            this.over = this.screen.y < 500;
        }
    }

    setPlayerXScreen() {
        let centrifugal = 30;
        let currentCurve = this.currentSegment.curve
        if (currentCurve) {
            this.screen.x = Game.STANDARD_CENTER_X - Images.SPRITE_SIZE / 2 + currentCurve * centrifugal
        } else {
            this.screen.x = Game.STANDARD_CENTER_X - Images.SPRITE_SIZE / 2
        }
    }

    // ---------------------------------------------------------------------------------
    // Controls Functions
    // ---------------------------------------------------------------------------------

    handleInputUp(keys, audioCtx) {
        if (!this.gameOver){
            switch (keys) {
                case ('right'):
                    this.moveLeftRight(audioCtx, 1);
                    break;
                case ('left'):
                    this.moveLeftRight(audioCtx, -1);
                    break;
                case ('pause'):
                    this.setPause(audioCtx);
                    break;
                case ('jump'):
                    this.setJump(audioCtx);
                    break;
            }
        }

    }

    setPause(audioCtx) {
        if (this.game.gameState === Game.PLAY_STATE && !this.gameOver && !this.start) {
            this.game.gameState = Game.PAUSE_STATE
        } else if (this.game.gameState === Game.PAUSE_STATE) {
            this.game.gameState = Game.PLAY_STATE
        }
        HelperMethods.sound.playTrack(Sounds.contextSounds["pause"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
    }

    setJump(audioCtx) {
        if (!this.movingLane && !this.jumping && this.game.gameState === Game.PLAY_STATE && !this.start) {
            HelperMethods.sound.playTrack(Sounds.contextSounds["jump"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            this.jumping = true
            this.ySpeed = this.jumpSpeed
        }
    }

    moveLeftRight(audioCtx, dir) {
        if (!this.jumping && this.game.gameState === Game.PLAY_STATE && !this.gameOver && !this.start) {
            this.nextLane = HelperMethods.math.limitMaxMin(this.currentLane, this.currentLane + dir, 3, 0)
            audioCtx.gain = 1
            HelperMethods.sound.playTrack(Sounds.contextSounds["tire"], audioCtx, this.game.settings.sounds, this.game.settings.soundVolume)
            if (this.nextLane !== this.currentLane) {
                this.movingLane = true
            }
        }
    }

}



