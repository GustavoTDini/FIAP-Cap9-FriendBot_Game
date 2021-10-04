// Classe com as imagens de fundo para renderização
class Background {

    constructor(game){
        this.game = game
        this.sky = null
        this.nextSky = null
        this.BC1 = null
        this.nextBC1 = null
        this.BC2 = null
        this.nextBC2 = null
        this.BC3 = null
        this.nextBC3 = null
        this.offSetX = 0
        this.offSetY = 0
    }

    render(ctx){
        let BC1Correction = 0.00002
        let BC2Correction = 0.00004
        let BC3Correction = 0.00006
        let BC1X = setMaxMin(this.offSetX*BC1Correction*this.game.player.speed, CANVAS_WIDTH, 0)
        let BC1Y = setMaxMin(-20 + this.offSetY*BC1Correction, 0, -50)
        let BC2X = setMaxMin(this.offSetX*BC2Correction*this.game.player.speed, CANVAS_WIDTH, 0)
        let BC2Y = setMaxMin(-20 + this.offSetY*BC2Correction, 0, -50)
        let BC3X = setMaxMin(this.offSetX*BC3Correction*this.game.player.speed, CANVAS_WIDTH, 0)
        let BC3Y = setMaxMin(-20 + this.offSetY*BC3Correction, 0, -50)
        this.sky !== null && ctx.drawImage(this.sky, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT )
        this.nextSky !== null && ctx.drawImage(this.sky, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT )
        this.BC1 !== null && ctx.drawImage(this.BC1, CANVAS_CENTER_X - BC1X,BC1Y )
        this.nextBC1 !== null && ctx.drawImage(this.BC1, CANVAS_CENTER_X - BC1X,BC1Y )
        this.BC1 !== null && ctx.drawImage(this.BC1, CANVAS_CENTER_X- this.sky.width - BC1X,BC1Y )
        this.nextBC1 !== null && ctx.drawImage(this.BC1, CANVAS_CENTER_X- this.sky.width - BC1X,BC1Y )
        this.BC2 !== null && ctx.drawImage(this.BC2, CANVAS_CENTER_X-BC2X, BC2Y)
        this.nextBC2 !== null && ctx.drawImage(this.BC2, CANVAS_CENTER_X-BC2X, BC2Y)
        this.BC2 !== null && ctx.drawImage(this.BC2, CANVAS_CENTER_X - this.sky.width-BC2X, BC2Y)
        this.nextBC2 !== null && ctx.drawImage(this.BC2, CANVAS_CENTER_X - this.sky.width-BC2X, BC2Y)
        this.BC3 !== null && ctx.drawImage(this.BC3, CANVAS_CENTER_X-BC3X, BC3Y)
        this.nextBC3 !== null && ctx.drawImage(this.BC3, CANVAS_CENTER_X-BC3X, BC3Y)
        this.BC3 !== null && ctx.drawImage(this.BC3, CANVAS_CENTER_X-this.sky.width-BC3X, BC3Y)
        this.nextBC3 !== null && ctx.drawImage(this.BC3, CANVAS_CENTER_X-this.sky.width-BC3X, BC3Y)
    }

    update(dt){
        if (this.sky === null || this.BC1 === null || this.BC2 === null || this.BC3 === null){
            switch (this.game.currentStage){
                case SUBURB:
                    this.sky = subBackgrounds[0]
                    this.BC1 = subBackgrounds[1]
                    this.BC2 = subBackgrounds[2]
                    this.BC3 = subBackgrounds[3]
                    break
                case CITY:
                    this.sky = cityBackgrounds[0]
                    this.BC1 = cityBackgrounds[1]
                    this.BC2 = cityBackgrounds[2]
                    this.BC3 = cityBackgrounds[3]
                    break
                case FARM:
                    this.sky = farmBackgrounds[0]
                    this.BC1 = farmBackgrounds[1]
                    this.BC2 = farmBackgrounds[2]
                    this.BC3 = farmBackgrounds[3]
                    break
                case FOREST:
                    this.sky = forestBackgrounds[0]
                    this.BC1 = forestBackgrounds[1]
                    this.BC2 = forestBackgrounds[2]
                    this.BC3 = forestBackgrounds[3]
                    break
                case BEACH:
                    this.sky = beachBackgrounds[0]
                    this.BC1 = beachBackgrounds[1]
                    this.BC2 = beachBackgrounds[2]
                    this.BC3 = beachBackgrounds[3]
                    break
            }
        }
        this.offSetX+= this.game.road.findSegment(this.game.player.z).curve + this.game.player.x/2
        this.offSetY+= this.game.road.findSegment(this.game.player.z).worldPoints.y
    }
}
