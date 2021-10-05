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
    frame = 0

    constructor(game, color, difficulty) {
        this.game = game;
        this.difficulty = difficulty;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0.3;
        this.color = color
        this.fuel = 10;
        this.sprites = null
        this.screen = {x:0, y:0, w:0, h:0}
        this.speed = 0;
        this.lanes = ROAD_LANES
        this.currentLane = 1
        this.score = 0;
        this.coins = 0;
        this.jumping = false;
        this.over = false;
        this.turboSpeed = MAX_SPEED*2
        this.currentSpeed = this.speed
        this.transparent = 0;
        this.turbo = 0;
        this.double = 0;
        this.shield = 0;
        this.ySpeed = 0;
        this.segmentCounter = 0
        this.currentSegment = null
        this.acceleration = MAX_SPEED/20;
        this.mask = {x:this.x, y:this.y, w:this.w, s: 200}
        this.spriteHeight = SPRITE_SIZE
        this.start = true
        this.startCounter = this.MAX_EVENTS_COUNTER
        this.gameOver = false
        this.gameOverCounter = 0;
        this.turboEffect = null
        this.turboEffect2 = null
        this.getReadyEffect = new Effects(GET_READY, CANVAS_CENTER_X - 337, CANVAS_CENTER_Y - 75)
        this.gameOverEffect = new Effects(GAME_OVER, CANVAS_CENTER_X - 337, CANVAS_CENTER_Y - 75)
        this.glitterEffect = new Effects(GLITTER, this.screen.x, this.screen.y)
        this.explosionEffect = new Effects(EXPLOSION, this.screen.x, this.screen.y)
        this.shieldEffect = new Effects(SHIELD_EFFECT, this.screen.x, this.screen.y)
        this.starEffect = new Effects(STAR, this.screen.x, this.screen.y)
        this.turboEffectCorrector = 0

    }

    init(){
        // set the player screen size
        this.screen.w = SPRITE_SIZE;
        this.screen.h = SPRITE_SIZE;

        // set the player screen position
        this.screen.x = CANVAS_CENTER_X - SPRITE_SIZE/2
        this.screen.y = CANVAS_HEIGHT - this.screen.h;

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
    }

    startCountDown(){
        if (this.start){
            this.startCounter--
            if (!this.getReadyEffect.play){
                this.getReadyEffect.setPlay()
            }
            if (this.startCounter === 25){
                this.currentSpeed = this.difficulty.START_SPEED
            }
            if (this.startCounter === 0){
                this.start = false
            }
        }
    }

    startRender(ctx){
        if (this.start){
            if (this.startCounter <= 180 && this.startCounter > 100){
                this.getReadyEffect.render(ctx)
            }
            if (this.startCounter === 100){
                this.getReadyEffect.setStop()
            }
            if (this.startCounter < 100 && this.startCounter >= 70){
                ctx.drawImage(...lights_out, CANVAS_CENTER_X - 400, CANVAS_CENTER_Y - 150, 200, 350)
                ctx.drawImage(...lights_out, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 150, 200 , 350)
                ctx.drawImage(...lights_out, CANVAS_CENTER_X + 200, CANVAS_CENTER_Y - 150, 200 , 350)
            }
            if (this.startCounter < 70 && this.startCounter >= 55){
                ctx.drawImage(...lights_red, CANVAS_CENTER_X - 400, CANVAS_CENTER_Y - 150, 200, 350)
                ctx.drawImage(...lights_out, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 150, 200 , 350)
                ctx.drawImage(...lights_out, CANVAS_CENTER_X + 200, CANVAS_CENTER_Y - 150, 200 , 350)
            }
            if (this.startCounter < 55 && this.startCounter >= 40){
                ctx.drawImage(...lights_red, CANVAS_CENTER_X - 400, CANVAS_CENTER_Y - 150, 200, 350)
                ctx.drawImage(...lights_red, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 150, 200 , 350)
                ctx.drawImage(...lights_out, CANVAS_CENTER_X + 200, CANVAS_CENTER_Y - 150, 200 , 350)
            }
            if (this.startCounter < 40 && this.startCounter >= 25){
                ctx.drawImage(...lights_red, CANVAS_CENTER_X - 400, CANVAS_CENTER_Y - 150, 200, 350)
                ctx.drawImage(...lights_red, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 150, 200 , 350)
                ctx.drawImage(...lights_red, CANVAS_CENTER_X + 200, CANVAS_CENTER_Y - 150, 200 , 350)
            }
            if (this.startCounter < 25 && this.startCounter > 0){
                ctx.drawImage(...lights_green, CANVAS_CENTER_X - 400, CANVAS_CENTER_Y - 150, 200, 350)
                ctx.drawImage(...lights_green, CANVAS_CENTER_X - 100, CANVAS_CENTER_Y - 150, 200 , 350)
                ctx.drawImage(...lights_green, CANVAS_CENTER_X + 200, CANVAS_CENTER_Y - 150, 200 , 350)
            }
            if (this.startCounter < 20 && this.startCounter > 0){
                if (this.startCounter %2 === 0){
                    ctx.drawImage(...go1, CANVAS_CENTER_X - 350, CANVAS_CENTER_Y - 300, 700, 100)
                } else {
                    ctx.drawImage(...go2, CANVAS_CENTER_X - 350, CANVAS_CENTER_Y - 300, 700, 100)
                }
            }
        }

    }

    gameOverCountDown(){
        if (this.gameOver){
            this.gameOverCounter--
            console.log(this.gameOverCounter)
            if (!this.gameOverEffect.play){
                this.gameOverEffect.setPlay()
            }
            if (!this.explosionEffect.play){
                this.explosionEffect.setPlay()
            }
            if (!this.starEffect.play){
                this.starEffect.setPlay()
            }
            this.explosionEffect.setXY(this.screen.x - 64, this.screen.y-64)
            this.starEffect.setXY(this.screen.x + 32, this.screen.y - 20)
            if (this.gameOverCounter === 0){
                this.game.gameState = GAME_OVER_STATE
            }
        }
    }

    gameOverRender(ctx){
        if (this.gameOver){
            this.gameOverEffect.render(ctx)
            if (this.fuel !== 0){
                this.explosionEffect.render(ctx)
            }

        }
    }


    setSpritesColor(color){
        switch (color){
            case BLUE: {
                this.turboEffect = new Effects(FIRE, this.screen.x, this.screen.y)
                this.turboEffect2 = new Effects(FIRE, this.screen.x, this.screen.y)
                return  bluePlayerSprites
            }
            case PINK: {
                this.turboEffect = new Effects(TURBO_EFFECT, this.screen.x, this.screen.y)
                return  pinkPlayerSprites
            }
            case GREEN: {
                this.turboEffect = new Effects(FIRE, this.screen.x, this.screen.y)
                this.turboEffect2 = new Effects(FIRE, this.screen.x, this.screen.y)
                return  greenPlayerSprites
            }
        }
    }

    // função para definir uma colisão entre o jogador e outro elemento
    isColliding(entity) {
        return (((this.mask.x + this.mask.w) > entity.mask.x
                && (this.mask.x) < (entity.mask.x + entity.mask.w))
            && ((this.mask.z + this.mask.s) > entity.mask.z
                && (this.mask.z) < (entity.mask.z + entity.mask.s)
            ) && !this.over)
    }

    checkCollidingCoins(audioCtx){
        for (let n = 0; n < this.game.road.totalCoins.length; n++){
            if (this.isColliding(this.game.road.totalCoins[n])){
                this.game.road.totalCoins.splice(n, 1)
                this.coins++
                this.score++
                if (this.double > 0){
                    this.coins++
                    this.score++
                }
                playTrack(contextSounds["coin"], audioCtx)
            }
        }
    }

    checkCollidingFuel(audioCtx){
        for (let n = 0; n < this.game.road.totalFuel.length; n++){
            if (this.isColliding(this.game.road.totalFuel[n])){
                this.game.road.totalFuel.splice(n, 1)
                this.fuel = this.MAX_FUEL
                playTrack(contextSounds["coin"], audioCtx)
            }
        }
    }

    checkCollidingPowerUp(audioCtx){
        //TODO - Falta a funcionalidade do escudo
        for (let n = 0; n < this.game.road.powerUps.length; n++){
            if (this.isColliding(this.game.road.powerUps[n])){
                switch (this.game.road.powerUps[n].type){
                    case (TURBO):
                        this.turbo = this.MAX_POWER_UP_COUNTER
                        playTrack(contextSounds["turbo"], audioCtx)
                        this.turboEffect.setPlay()
                        if (this.turboEffect2 !== null){
                            this.turboEffect2.setPlay()
                        }
                        this.currentSpeed = this.speed
                        this.speed = this.turboSpeed
                        break;
                    case (BOLT):
                        this.transparent = this.MAX_POWER_UP_COUNTER
                        playTrack(contextSounds["turbo"], audioCtx)
                        break;
                    case (DOUBLE):
                        this.double = this.MAX_POWER_UP_COUNTER
                        playTrack(contextSounds["turbo"], audioCtx)
                        this.glitterEffect.setPlay()
                        break;
                    case (SHIELD):
                        this.shield = this.MAX_POWER_UP_COUNTER
                        playTrack(contextSounds["turbo"], audioCtx)
                        this.shieldEffect.setPlay()
                        break;
                }
            }
        }
    }

    setGameOverStatus(){
        this.speed = 0
        this.currentSpeed = 0
        this.gameOver = true
        this.gameOverCounter = this.MAX_EVENTS_COUNTER
        this.turbo = 0
        this.transparent = 0
        this.double = 0
        this.shield = 0
    }


    checkCollidingGameOver(audioCtx){
        for (let n = 0; n < this.game.road.totalTraffic.length; n++){
            if (this.isColliding(this.game.road.totalTraffic[n]) && this.transparent  === 0 && !this.gameOver){
                this.setGameOverStatus()
                playTrack(contextSounds["hit"], audioCtx)
            }
        }
        for (let n = 0; n < this.game.road.totalCars.length; n++){
            if (this.isColliding(this.game.road.totalCars[n]) && this.transparent  === 0 && !this.gameOver){
                this.setGameOverStatus()
                playTrack(contextSounds["hit"], audioCtx)
            }
        }
        for (let n = 0; n < this.game.road.obstacles.length; n++){
            if (this.isColliding(this.game.road.obstacles[n]) && this.transparent === 0 && !this.gameOver){
                this.setGameOverStatus()
                playTrack(contextSounds["hit"], audioCtx)
            }
        }
        for (let n = 0; n < this.game.road.animals.length; n++){
            if (this.isColliding(this.game.road.animals[n]) && this.transparent === 0 && !this.gameOver){
                this.game.road.animals[n].hit = true
                this.setGameOverStatus()
                playTrack(contextSounds["hit"], audioCtx)

            }
        }
    }


    update(dt, audioCtx) {
        let road = this.game.road
        this.z += this.speed*dt
        if (this.speed > 0){
            this.fuel -= dt*15
        }
        if (this.fuel === 0 && !this.gameOver){
            this.setGameOverStatus()

        }
        if (this.speed < this.currentSpeed && this.turbo === 0){
            this.speed += this.acceleration
        }

        if (this.z >= road.roadLength){
            this.z -= road.roadLength
        }
        if (this.game.road.findSegment(this.z) !== this.currentSegment){
            this.segmentCounter++
            this.currentSegment = this.game.road.findSegment(Math.floor(this.z))
        }
        if (this.segmentCounter === 1000){
            this.speed +=MAX_SPEED/20
            if (this.speed > this.difficulty.MAX_SPEED){
                this.speed = this.difficulty.MAX_SPEED
            }
            this.segmentCounter = 0;

        }
        if (!this.start && !this.gameOver){
            this.score +=(dt*24)
        }

        this.updateEffects()
        this.startCountDown()
        this.gameOverCountDown()
        this.setMask()
        this.setLanes()
        this.countPowerUps()
        this.SettingJumpingY(dt)
        this.checkCollidingGameOver(audioCtx)
        this.checkCollidingCoins(audioCtx)
        this.checkCollidingPowerUp(audioCtx)
        this.checkCollidingFuel(audioCtx)
        this.setSprite()

    }

    countPowerUps(){
        if (this.turbo > 0){
            this.turbo--
            if (this.color === GREEN){
                this.turboEffect.setXY(this.screen.x + 20 + this.turboEffectCorrector, this.screen.y + 60)
                this.turboEffect2.setXY(this.screen.x + 50 + this.turboEffectCorrector, this.screen.y + 60)
            }
            if (this.color === BLUE){
                this.turboEffect.setXY(this.screen.x + 20 + this.turboEffectCorrector, this.screen.y + 30)
                this.turboEffect2.setXY(this.screen.x + 50 + this.turboEffectCorrector, this.screen.y + 30)
            }
            if (this.color === PINK){
                this.turboEffect.setXY(this.screen.x + 32 + this.turboEffectCorrector, this.screen.y + 65)
            }
            if (this.turbo === 0){
                this.speed = this.currentSpeed
                this.turboEffect.setStop()
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

    setMask(){
        this.mask = {x:this.x, z:this.z, w:this.w, s: 200}
    }

    setSprite() {
        if (this.speed > 0){
            let MAX_SPRITES = 2;
            let MAX_FRAMES = 0;
            this.frame++;
            if (this.frame > MAX_FRAMES) {
                this.frame = 0;
                this.currentSprite++;
                if (this.currentSprite > MAX_SPRITES) {
                    this.currentSprite = 0;
                }
            }
        } else{
            this.currentSprite = 0
        }
    }

    render(ctx) {
        let road = this.game.road
        let shadowScale = SPRITE_SIZE*this.screen.y/586
        drawShadow(this.screen.x,  CANVAS_HEIGHT - this.screen.h, shadowScale, ctx)
        let playerSegmentCurve = road.findSegment(this.z).curve;
        if (this.transparent > 0 && this.transparent %2 === 0){
            return
        }
        this.startRender( ctx)
        this.gameOverRender(ctx)
        if (playerSegmentCurve >= 4 ){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -24
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -8
                }
            }  else {
                ctx.drawImage(...this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -24
            }
        } else if ( playerSegmentCurve  < 4 && playerSegmentCurve > 2){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.maxRight[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = -24
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 0
                }
            }  else {
                ctx.drawImage(...this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -8
            }
        } else if ( playerSegmentCurve  < -2 && playerSegmentCurve > -4) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 0
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 8
                }
            }  else {
                ctx.drawImage(...this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 30
            }
        } else if  ( playerSegmentCurve  <= -4) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 8
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                    this.turboEffectCorrector = 30
                }
            }  else {
                ctx.drawImage(...this.sprites.maxLeft[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 30
            }
        } else {
            if (this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.right[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = -8
            } else if (this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.left[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 8
            } else if (!this.movingLane){
                ctx.drawImage(...this.sprites.center[this.currentSprite], this.screen.x, this.screen.y, SPRITE_SIZE, this.spriteHeight)
                this.turboEffectCorrector = 0
            }
        }
        if (this.double > 0){
            this.glitterEffect.render(ctx)
        }
        if (this.turbo> 0 ){
            this.turboEffect.render(ctx)
            if (this.turboEffect2 !== null){
                this.turboEffect2.render(ctx)
            }
        }
        if (this.shield > 0){
            this.shieldEffect.render(ctx)
        }
        if (this.gameOver){
            this.starEffect.render(ctx)
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
        this.spriteHeight = SPRITE_SIZE - this.ySpeed*1.5
        if (this.speed > 0){
            if (!this.jumping){
                this.ySpeed = 0;
                this.y = this.currentSegment.worldPoints.y
                this.screen.y = CANVAS_HEIGHT - this.screen.h + Math.floor((Math.random()*5))-10
            } else {
                this.screen.y += this.ySpeed
                this.ySpeed += this.gravity
                if (this.screen.y > CANVAS_HEIGHT - this.screen.h){
                    this.jumping = false
                }
            }
            this.over = this.screen.y < 450;
        }
    }

    // TODO = colocar a interatividade mobile
    handleInputUp(keys, audioCtx) {
        switch (keys) {
            case ('right'):
                if (!this.jumping && this.game.gameState === PLAY_STATE && !this.gameOver && !this.start){
                    this.nextLane = limitMaxMin(this.currentLane, this.currentLane+1, 3, 0)
                    audioCtx.gain = 1
                    playTrack(contextSounds["tire"], audioCtx)
                    if (this.nextLane !== this.currentLane){
                        this.movingLane = true
                    }
                }
                break;
            case ('left'):
                if (!this.jumping && this.game.gameState === PLAY_STATE && !this.gameOver && !this.start){
                    this.nextLane = limitMaxMin(this.currentLane, this.currentLane-1, 3, 0)
                    audioCtx.gain = 1
                    playTrack(contextSounds["tire"], audioCtx)
                    if (this.nextLane !== this.currentLane){
                        this.movingLane = true
                    }
                }
                break;
            case ('pause'):
                if(this.game.gameState === PLAY_STATE && !this.gameOver && !this.start){
                    playTrack(contextSounds["pause"], audioCtx)
                    this.game.gameState = PAUSE_STATE
                } else if (this.game.gameState === PAUSE_STATE){
                    playTrack(contextSounds["pause"], audioCtx)
                    this.game.gameState = PLAY_STATE
                }
                break;
            case ('jump'):
                if (!this.movingLane && !this.jumping && this.game.gameState === PLAY_STATE && !this.gameOver && !this.start){
                    playTrack(contextSounds["jump"], audioCtx)
                    this.jumping = true
                    this.ySpeed = this.jumpSpeed
                }
                break;
        }
    }
}



