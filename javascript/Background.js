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
        this.nextAlpha = 1
        this.currentAlpha = 1

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
        this.sky !== null && drawSpriteWithAlpha(ctx, this.sky, 0, 0,CANVAS_WIDTH, CANVAS_HEIGHT, this.currentAlpha)
        this.nextSky !== null && drawSpriteWithAlpha(ctx, this.nextSky, 0, 0,CANVAS_WIDTH, CANVAS_HEIGHT, this.nextAlpha)
        this.BC1 !== null && drawSpriteWithAlpha(ctx, this.BC1, CANVAS_CENTER_X - BC1X, BC1Y,this.BC1.width, this.BC1.height, this.currentAlpha)
        this.BC1 !== null && drawSpriteWithAlpha(ctx, this.BC1, CANVAS_CENTER_X- this.BC1.width - BC1X, BC1Y,this.BC1.width, this.BC1.height, this.currentAlpha)
        this.nextBC1 !== null && drawSpriteWithAlpha(ctx, this.nextBC1, CANVAS_CENTER_X - BC1X, BC1Y,this.nextBC1.width, this.nextBC1.height, this.nextAlpha)
        this.nextBC1 !== null && drawSpriteWithAlpha(ctx, this.nextBC1, CANVAS_CENTER_X- this.nextBC1.width - BC1X, BC1Y,this.nextBC1.width, this.nextBC1.height, this.nextAlpha)
        this.BC2 !== null && drawSpriteWithAlpha(ctx, this.BC2, CANVAS_CENTER_X- this.BC2.width - BC2X, BC2Y,this.BC2.width, this.BC2.height, this.currentAlpha)
        this.BC2 !== null && drawSpriteWithAlpha(ctx, this.BC2, CANVAS_CENTER_X - BC2X, BC2Y,this.BC2.width, this.BC2.height, this.currentAlpha)
        this.nextBC2 !== null && drawSpriteWithAlpha(ctx, this.nextBC2, CANVAS_CENTER_X- this.nextBC2.width - BC2X, BC2Y,this.nextBC2.width, this.nextBC2.height, this.nextAlpha)
        this.nextBC2 !== null && drawSpriteWithAlpha(ctx, this.nextBC2, CANVAS_CENTER_X - BC2X, BC2Y,this.nextBC2.width, this.nextBC2.height, this.nextAlpha)
        this.BC3 !== null && drawSpriteWithAlpha(ctx, this.BC3, CANVAS_CENTER_X - BC3X, BC3Y,this.BC3.width, this.BC3.height, this.currentAlpha)
        this.BC3 !== null && drawSpriteWithAlpha(ctx, this.BC3, CANVAS_CENTER_X- this.BC3.width - BC3X, BC3Y,this.BC3.width, this.BC3.height, this.currentAlpha)
        this.nextBC3 !== null && drawSpriteWithAlpha(ctx, this.nextBC3, CANVAS_CENTER_X - BC3X, BC3Y,this.nextBC3.width, this.nextBC3.height, this.nextAlpha)
        this.nextBC3 !== null && drawSpriteWithAlpha(ctx, this.nextBC3, CANVAS_CENTER_X- this.nextBC3.width - BC3X, BC3Y,this.nextBC3.width, this.nextBC3.height, this.nextAlpha)

    }

    update(dt){
        if (this.sky === null || this.BC1 === null || this.BC2 === null || this.BC3 === null){
            this.changeBackground(this.game.currentStage, false);
        }
        if (this.nextAlpha < 1 ){
            if (this.game.road.findSegment(this.game.player.z - SEGMENT_LENGTH) !== this.game.player.currentSegment){
                this.currentAlpha -= 0.025
                this.nextAlpha += 0.025
            }

            if (this.nextAlpha > 1){
                this.nextSky = null
                this.nextBC1 = null
                this.nextBC2 = null
                this.nextBC3 = null
                this.currentAlpha = 1
                this.changeBackground(this.game.currentStage, false)
            }
        }
        this.offSetX+= this.game.road.findSegment(this.game.player.z).curve + this.game.player.x/2
        this.offSetY+= this.game.road.findSegment(this.game.player.z).worldPoints.y
    }

    changeBackground(stage, next) {
        let sky, BC1, BC2, BC3
        switch (stage) {
            case SUBURB:
                sky = subBackgrounds[0]
                BC1 = subBackgrounds[1]
                BC2 = subBackgrounds[2]
                BC3 = subBackgrounds[3]
                break
            case CITY:
                sky = cityBackgrounds[0]
                BC1 = cityBackgrounds[1]
                BC2 = cityBackgrounds[2]
                BC3 = cityBackgrounds[3]
                break
            case FARM:
                sky = farmBackgrounds[0]
                BC1 = farmBackgrounds[1]
                BC2 = farmBackgrounds[2]
                BC3 = farmBackgrounds[3]
                break
            case FOREST:
                sky = forestBackgrounds[0]
                BC1 = forestBackgrounds[1]
                BC2 = forestBackgrounds[2]
                BC3 = forestBackgrounds[3]
                break
            case BEACH:
                sky = beachBackgrounds[0]
                BC1 = beachBackgrounds[1]
                BC2 = beachBackgrounds[2]
                BC3 = beachBackgrounds[3]
                break
            default:
                sky = null
                BC1 = null
                BC2 = null
                BC3 = null
        }
        if (next){
            this.nextSky = sky
            this.nextBC1 = BC1
            this.nextBC2 = BC2
            this.nextBC3 = BC3
        } else{
            this.sky = sky
            this.BC1 = BC1
            this.BC2 = BC2
            this.BC3 = BC3
        }
    }
}
