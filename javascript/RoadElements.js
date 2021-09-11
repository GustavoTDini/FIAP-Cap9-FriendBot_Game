class RoadObjects {

    constructor(sprite, x, spriteSize, road){
        this.sprite = sprite
        this.x = x
        this.spriteSize = spriteSize
        this.road = road
    }

    render(ctx, scale, destX, destY, maxBottomLine) {
        let spriteSize = (Road.MAX_ROAD_WIDTH*scale) * this.spriteSize
        let maxDrawLine = maxBottomLine ? Math.max(0, destY+spriteSize-maxBottomLine) : 0;
        if (maxDrawLine < maxBottomLine){
            let drawSprite = this.sprite.map((x) => x);
            drawSprite[4]= ((destY + spriteSize - maxBottomLine)/spriteSize)*this.spriteSize
            destY = (destY - spriteSize) > maxDrawLine ? destY - spriteSize: maxDrawLine;
            ctx.drawImage(...drawSprite, destX - spriteSize/2, destY, spriteSize, spriteSize*(this.spriteSize/drawSprite[4]));
        }
    }

}


// Classe com os atributos de cada segmento da estrada a serem renderizados
class SideObjects extends RoadObjects{

    constructor(sprite, x, spriteSize, road) {
        super(sprite, x, spriteSize, road);
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Cars extends RoadObjects{

    constructor(sprite, x, y, speed, z, spriteSize, road){
        super(sprite, x, spriteSize, road)
        this.y = y
        this.z = z
        this.speed = speed
        this.nextX = x
    }

    update(dt){
        this.randomX()
        this.setX()
        this.z += this.speed*dt
        if (this.z >= this.road.roadLength){
            this.z -= this.road.roadLength
        }
    }

    setX(){
        if (this.nextX !== this.x){
            if (this.x > this.nextX){
                this.x = this.x - 0.04
            } else{
                this.x = this.x + 0.04
                }
            } else{
            this.nextX = this.x
        }
    }

    randomX(){
        if (Math.random() > 0.998){
            this.nextX = (Math.random()*2)-1
        }
    }

}



// Classe com os atributos de cada segmento da estrada a serem renderizados
class Background {

    constructor(game){
        this.game = game
        this.sky = background_sky
        this.mountains = background_mountain
        this.forest = background_trees
        this.offSetX = 0
        this.offSetY = 0

    }

    render(ctx){
        let skyCorrection = 0.00002
        let mountainCorrection = 0.00004
        let forestCorrection = 0.00006
        let skyX = setMaxMin(this.offSetX*skyCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let skyY = setMaxMin(-20 + this.offSetY*skyCorrection, 0, -50)
        let mountainX = setMaxMin(this.offSetX*mountainCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let mountainY = setMaxMin(-20 + this.offSetY*mountainCorrection, 0, -50)
        let forestX = setMaxMin(this.offSetX*forestCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let forestY = setMaxMin(-20 + this.offSetY*forestCorrection, 0, -50)
        ctx.fillStyle = COLORS.SKY
        ctx.fillRect(0,0, CANVAS_WIDTH, 100)
        ctx.fillStyle = COLORS.GRASS
        ctx.fillRect(0, 100, CANVAS_WIDTH, CANVAS_HEIGHT-100)
        ctx.drawImage(this.sky, CANVAS_CENTER_X - skyX,skyY )
        ctx.drawImage(this.sky, CANVAS_CENTER_X- this.sky.width - skyX,skyY )
        ctx.drawImage(this.mountains, CANVAS_CENTER_X-mountainX, mountainY)
        ctx.drawImage(this.mountains, CANVAS_CENTER_X - this.sky.width-mountainX, mountainY)
        ctx.drawImage(this.forest, CANVAS_CENTER_X-forestX, forestY)
        ctx.drawImage(this.forest, CANVAS_CENTER_X-this.sky.width-forestX, forestY)
    }

    update(dt){
        this.offSetX+= this.game.road.findSegment(this.game.player.z).curve + this.game.player.x/2
        this.offSetY+= this.game.road.findSegment(this.game.player.z).worldPoints.y
    }

}
