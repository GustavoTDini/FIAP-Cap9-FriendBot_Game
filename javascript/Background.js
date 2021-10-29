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

    render(ctx, canvasWidth, canvasHeight){
        let HMDraw = HelperMethods.draw
        let HMMath = HelperMethods.math
        let BC1Correction = 0.0002
        let BC2Correction = 0.0004
        let BC3Correction = 0.0006
        let BC1X = this.offSetX*BC1Correction*this.game.player.speed
        let BC2X = this.offSetX*BC2Correction*this.game.player.speed
        let BC3X = this.offSetX*BC3Correction*this.game.player.speed
        if (this.BC1 !== null){
            if (BC1X > this.BC1.width){
                BC1X -= this.BC1.width
            }
            if (BC1X < 0){
                BC1X +=this.BC1.width
            }
        }
        if (this.BC2 !== null){
            if (BC2X > this.BC2.width){
                BC2X -= this.BC2.width
            }
            if (BC2X < 0){
                BC2X +=this.BC2.width
            }
        }
        if (this.BC3 !== null){
            if (BC3X > this.BC3.width){
                BC3X -= this.BC3.width
            }
            if (BC3X < 0){
                BC3X += this.BC3.width
            }
        }
        let BC1Y = HMMath.setMaxMin(-20 + this.offSetY*BC1Correction,  0, -50)
        let BC2Y = HMMath.setMaxMin(-20 + this.offSetY*BC2Correction, 0, -50)
        let BC3Y = HMMath.setMaxMin(-20 + this.offSetY*BC3Correction, 0, -50)
        this.sky !== null && HMDraw.drawSpriteWithAlpha(ctx, this.sky, 0, 0,Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT, this.currentAlpha, canvasWidth, canvasHeight)
        this.nextSky !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextSky, 0, 0,Game.STANDARD_WIDTH, Game.STANDARD_HEIGHT, this.nextAlpha, canvasWidth, canvasHeight)

        this.BC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC1,BC1X - this.BC1.width, BC1Y,this.BC1.width, this.BC1.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC1, BC1X, BC1Y,this.BC1.width, this.BC1.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC1, BC1X + this.BC1.width, BC1Y,this.BC1.width, this.BC1.height, this.currentAlpha, canvasWidth, canvasHeight)

        this.nextBC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC1, BC1X - this.BC1.width, BC1Y,this.nextBC1.width, this.nextBC1.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC1, BC1X, BC1Y,this.nextBC1.width, this.nextBC1.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC1 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC1, BC1X + this.BC1.width, BC1Y,this.nextBC1.width, this.nextBC1.height, this.nextAlpha, canvasWidth, canvasHeight)

        this.BC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC2,BC2X - this.BC2.width, BC2Y,this.BC2.width, this.BC2.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC2, BC2X, BC2Y,this.BC2.width, this.BC2.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC2, BC2X + this.BC2.width, BC2Y,this.BC2.width, this.BC2.height, this.currentAlpha, canvasWidth, canvasHeight)

        this.nextBC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC2, BC2X - this.BC2.width, BC2Y,this.nextBC2.width, this.nextBC2.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC2, BC2X, BC2Y,this.nextBC2.width, this.nextBC2.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC2 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC2, BC2X + this.BC2.width, BC2Y,this.nextBC2.width, this.nextBC2.height, this.nextAlpha, canvasWidth, canvasHeight)

        this.BC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC3,BC3X - this.BC3.width, BC3Y,this.BC3.width, this.BC3.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC3, BC3X, BC3Y,this.BC3.width, this.BC3.height, this.currentAlpha, canvasWidth, canvasHeight)
        this.BC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.BC3, BC3X + this.BC3.width, BC3Y,this.BC3.width, this.BC3.height, this.currentAlpha, canvasWidth, canvasHeight)

        this.nextBC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC3, BC3X - this.BC3.width, BC3Y,this.nextBC3.width, this.nextBC3.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC3, BC3X, BC3Y,this.nextBC3.width, this.nextBC3.height, this.nextAlpha, canvasWidth, canvasHeight)
        this.nextBC3 !== null && HMDraw.drawSpriteWithAlpha(ctx, this.nextBC3, BC3X + this.BC3.width, BC3Y,this.nextBC3.width, this.nextBC3.height, this.nextAlpha, canvasWidth, canvasHeight)

    }

    update(){
        if (this.sky === null || this.BC1 === null || this.BC2 === null || this.BC3 === null){
            this.changeBackground(this.game.currentStage, false);
        }
        if (this.nextAlpha < 1 ){
            if (this.game.road.findSegment(this.game.player.z - Game.SEGMENT_LENGTH) !== this.game.player.currentSegment){
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
        this.offSetX = -(this.game.road.findSegment(this.game.player.z).curve + this.game.player.x*2)
        this.offSetY = this.game.road.findSegment(this.game.player.z).worldPoints.y
    }

    changeBackground(stage, next) {
        let sky, BC1, BC2, BC3
        switch (stage) {
            case Game.SUBURB:
                sky = Images.subBackgrounds[0]
                BC1 = Images.subBackgrounds[1]
                BC2 = Images.subBackgrounds[2]
                BC3 = Images.subBackgrounds[3]
                break
            case Game.CITY:
                sky = Images.cityBackgrounds[0]
                BC1 = Images.cityBackgrounds[1]
                BC2 = Images.cityBackgrounds[2]
                BC3 = Images.cityBackgrounds[3]
                break
            case Game.FARM:
                sky = Images.farmBackgrounds[0]
                BC1 = Images.farmBackgrounds[1]
                BC2 = Images.farmBackgrounds[2]
                BC3 = Images.farmBackgrounds[3]
                break
            case Game.FOREST:
                sky = Images.forestBackgrounds[0]
                BC1 = Images.forestBackgrounds[1]
                BC2 = Images.forestBackgrounds[2]
                BC3 = Images.forestBackgrounds[3]
                break
            case Game.BEACH:
                sky = Images.beachBackgrounds[0]
                BC1 = Images.beachBackgrounds[1]
                BC2 = Images.beachBackgrounds[2]
                BC3 = Images.beachBackgrounds[3]
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
