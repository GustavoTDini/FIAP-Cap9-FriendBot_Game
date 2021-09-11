// classe que contem os elementos do jogador
class Player {

    movingLane = false
    nextLane = 1
    static maxSpeed = (Road.segmentLength/STEP)*3;

    constructor(game, color) {
        this.game = game
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = (SPRITE_SIZE/game.road.roadWidth)*2;
        this.color = color
        this.sprites = null
        this.screen = {x:0, y:0, w:0, h:0}
        this.speed = 0;
        this.lanes = ROAD_LANES
        this.currentLane = 1
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

        this.speed = Player.maxSpeed/10;
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

    update(dt) {
        let road = this.game.road
        this.z += this.speed*dt
        if (this.z >= road.roadLength){
            this.z -= road.roadLength
        }

        this.setLanes()
        this.setY()
    }

    render(ctx) {
        let road = this.game.road
        drawShadow(this.screen.x, this.screen.y, SPRITE_SIZE, ctx)
        let playerSegmentCurve = road.findSegment(this.z).curve;
        if (playerSegmentCurve === 6){
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.medRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else {
                ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < 6 && playerSegmentCurve > 3){
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.maxRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else {
                ctx.drawImage(...this.sprites.medRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
         } else if ( playerSegmentCurve  < 3 && playerSegmentCurve > 0){
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.center, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.medRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else{
                ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < 0 && playerSegmentCurve > -3) {
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.center, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.medLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else{
                ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if ( playerSegmentCurve  < -3 && playerSegmentCurve > -6) {
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else {
                ctx.drawImage(...this.sprites.medLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else if  ( playerSegmentCurve  === -6) {
            if (this.movingLane && this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.medLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.movingLane && this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else {
                ctx.drawImage(...this.sprites.maxLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            }
        } else {
            if (this.nextLane > this.currentLane){
                ctx.drawImage(...this.sprites.minRight, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
            } else if (this.nextLane < this.currentLane){
                ctx.drawImage(...this.sprites.minLeft, this.screen.x, this.screen.y, SPRITE_SIZE, SPRITE_SIZE)
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

    setY(){
        let road = this.game.road
        let playerSegment = road.findSegment(this.z);
        this.y = playerSegment.worldPoints.y
        this.screen.y = CANVAS_HEIGHT - this.screen.h + Math.floor((Math.random()*5))-10
    }

    handleInputDown(keys) {

    }

    handleInputUp(keys) {
        switch (keys) {
            case ('right'):
                this.nextLane = limitMaxMin(this.currentLane, this.currentLane+1, 3, 0)
                if (this.nextLane !== this.currentLane){
                    this.movingLane = true
                }
                break;
            case ('left'):
                this.nextLane = limitMaxMin(this.currentLane, this.currentLane-1, 3, 0)
                if (this.nextLane !== this.currentLane){
                    this.movingLane = true
                }
                break;
            case ('up'):
                break;
            case ('down'):
                break;
        }
    }
}



