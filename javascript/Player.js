// classe que contem os elementos do jogador
class Player {

    movingLane = false
    nextLane = 1
    gravity = 0.3
    jumpSpeed = -12

    constructor(game, color, difficulty) {
        this.game = game;
        this.difficulty = difficulty;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0.2;
        this.color = color
        this.sprites = null
        this.screen = {x:0, y:0, w:0, h:0}
        this.speed = 0;
        this.lanes = ROAD_LANES
        this.currentLane = 1
        this.score = 56455;
        this.coins = 25;
        this.jumping = false;
        this.over = false;
        this.turbo = false;
        this.transparent = false;
        this.ySpeed = 0;
        this.mask = {x:this.x, y:this.y, w:this.w, s: 500}

    }

    init(){
        // set the player screen size
        this.screen.w = SPRITE_SIZE;
        this.screen.h = SPRITE_SIZE;

        // set the player screen position
        this.screen.x = CANVAS_CENTER_X - SPRITE_SIZE/2
        this.screen.y = CANVAS_HEIGHT - this.screen.h;

        // set the player Colors
        this.sprites = this.setSprites(this.color)
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;


        this.speed = MAX_SPEED/2;
    }

    setSprites(color){
        switch (color){
            case BLUE: {
                return  bluePlayerSprites
            }
            case RED: {
                return  redPlayerSprites
            }
            case GREEN: {
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
            ))
    }

    checkCollidingCars(){
        for (let n = 0; n < this.game.road.totalCars.length; n++){
            if (this.isColliding(this.game.road.totalCars[n])){
                this.game.gameState = GAME_OVER_STATE
            }
        }
    }

    checkCollidingTraffic(){
        for (let n = 0; n < this.game.road.totalTraffic.length; n++){
            if (this.isColliding(this.game.road.totalTraffic[n])){
                this.game.gameState = GAME_OVER_STATE
            }
        }
    }

    checkCollidingCoins(){
        for (let n = 0; n < this.game.road.totalCoins.length; n++){
            if (this.isColliding(this.game.road.totalCoins[n])){
                this.game.road.totalCoins.splice(n, 1)
                this.coins++
            }
        }
    }

    checkCollidingCoins(){
        for (let n = 0; n < this.game.road.totalCoins.length; n++){
            if (this.isColliding(this.game.road.totalCoins[n])){
                this.game.road.totalCoins.splice(n, 1)
                this.coins++
            }
        }
    }

    update(dt) {
        let road = this.game.road
        this.z += this.speed*dt
        if (this.z >= road.roadLength){
            this.z -= road.roadLength
        }
        this.setMask()
        this.setLanes()
        this.SettingJumpingY(dt)
        // this.checkCollidingCars()
        // this.checkCollidingTraffic()
        this.checkCollidingCoins()
    }

    setMask(){
        this.mask = {x:this.x, z:this.z, w:this.w, s: 500}
    }

    render(ctx) {
        let road = this.game.road
        let shadowScale = SPRITE_SIZE*this.screen.y/586
        drawShadow(this.screen.x,  CANVAS_HEIGHT - this.screen.h, shadowScale, ctx)
        let playerSegmentCurve = road.findSegment(this.z).curve;
        if (playerSegmentCurve === 6){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < 6 && playerSegmentCurve > 3){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.center, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.medRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
         } else if ( playerSegmentCurve  < 3 && playerSegmentCurve > 0){
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < 0 && playerSegmentCurve > -3) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < -3 && playerSegmentCurve > -6) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.center, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.medLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if  ( playerSegmentCurve  === -6) {
            if (this.movingLane){
                if (this.nextLane > this.currentLane){
                    ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                } else if (this.nextLane < this.currentLane){
                    ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
                }
            }  else {
                ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else {
            if (this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.medRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.medLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (!this.movingLane){
                ctx.drawImage(...this.sprites.center, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }

        }
    }

    setLanes(){
        if (this.movingLane){
            if (this.currentLane > this.nextLane){
                if (this.x > this.lanes[this.nextLane]){
                    this.x = this.x - 0.04
                } else{
                    this.currentLane = this.nextLane
                    this.movingLane = false
                }
            } else if (this.currentLane < this.nextLane){
                if (this.x < this.lanes[this.nextLane]){
                    this.x = this.x + 0.04
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
        let road = this.game.road
        let playerSegment = road.findSegment(this.z);
        if (!this.jumping ){
            this.ySpeed = 0;
            this.y = playerSegment.worldPoints.y
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

    handleInputUp(keys) {
        switch (keys) {
            case ('right'):
                if (!this.jumping){
                    this.nextLane = limitMaxMin(this.currentLane, this.currentLane+1, 3, 0)
                    if (this.nextLane !== this.currentLane){
                        this.movingLane = true
                    }
                }
                break;
            case ('left'):
                if (!this.jumping){
                    this.nextLane = limitMaxMin(this.currentLane, this.currentLane-1, 3, 0)
                    if (this.nextLane !== this.currentLane){
                        this.movingLane = true
                    }
                }

                break;
            case ('pause'):
                if(this.game.gameState === PLAY_STATE){
                    this.game.gameState = PAUSE_STATE
                } else if (this.game.gameState === PAUSE_STATE){
                    this.game.gameState = PLAY_STATE
                }
                break;
            case ('jump'):
                if (!this.movingLane && !this.jumping){
                    this.jumping = true
                    this.ySpeed = this.jumpSpeed
                }
                break;
        }
    }
}



