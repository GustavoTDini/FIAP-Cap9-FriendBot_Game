class Effects{

    static STAR = 20
    static EXPLOSION = 21
    static TURBO_EFFECT = 22
    static FIRE = 23
    static SHIELD_EFFECT = 24
    static GLITTER = 25
    static GAME_OVER = 26
    static GET_READY = 27
    static GOT_ITEM = 28

    starSprites = [Images.star1, Images.star2, Images.star3, Images.star4, Images.star5, Images.star6, Images.star7, Images.star8, Images.star9, Images.star10, Images.star11, Images.star12, Images.star13, Images.star14, Images.star15, Images.star16]
    explosionSprites = [Images.explosion1, Images.explosion2, Images.explosion3, Images.explosion4, Images.explosion5, Images.explosion6, Images.explosion7, Images.explosion8, Images.explosion9, Images.explosion10]
    turboSprites = [Images.turbo1, Images.turbo2, Images.turbo3, Images.turbo4, Images.turbo5, Images.turbo6, Images.turbo7, Images.turbo8, Images.turbo9]
    fireSprites = [Images.fire1, Images.fire2, Images.fire3, Images.fire4, Images.fire5, Images.fire6, Images.fire7, Images.fire8, Images.fire9]
    shieldSprites = [Images.shield1, Images.shield2, Images.shield3, Images.shield4, Images.shield5, Images.shield6, Images.shield7, Images.shield8]
    glitterSprites = [Images.glitter1, Images.glitter2, Images.glitter3, Images.glitter4, Images.glitter5, Images.glitter6]
    gameOverSprites = [Images.game_over1, Images.game_over2, Images.game_over3, Images.game_over4, Images.game_over5, Images.game_over6, Images.game_over7, Images.game_over8,
        Images.game_over9, Images.game_over10,Images.game_over11, Images.game_over12, Images.game_over13, Images.game_over14, Images.game_over15, Images.game_over16, Images.game_over17,
        Images.game_over18, Images.game_over19, Images.game_over20, Images.game_over21, Images.game_over22, Images.game_over23, Images.game_over24, Images.game_over25, Images.game_over26,
        Images.game_over27, Images.game_over28]
    getReadySprites = [Images.get_ready1, Images.get_ready2, Images.get_ready3, Images.get_ready4, Images.get_ready5, Images.get_ready6, Images.get_ready7, Images.get_ready8,
        Images.get_ready9, Images.get_ready10,Images.get_ready11, Images.get_ready12, Images.get_ready13, Images.get_ready14, Images.get_ready15, Images.get_ready16, Images.get_ready17,
        Images.get_ready18, Images.get_ready19, Images.get_ready20, Images.get_ready21, Images.get_ready22, Images.get_ready23, Images.get_ready24, Images.get_ready25, Images.get_ready26,
        Images.get_ready27, Images.get_ready28, Images.get_ready29, Images.get_ready30, Images.get_ready31,Images.get_ready32, Images.get_ready33, Images.get_ready34, Images.get_ready35]
    gotItemSprites = [Images.gotItem1, Images.gotItem2, Images.gotItem3, Images.gotItem4]
    frame = 0


    constructor(effectType, x, y) {
        this.effectType = effectType
        this.x = x
        this.y = y
        this.sprites = null
        this.spritesSize = null
        this.sprite = 0
        this.loop = null
        this.play = false
        this.width = 64
        this.height = 64
        this.setEffects()
    }

    update(){
        this.setSprite()
    }

    render(ctx, canvas){
        if (this.sprite < this.spritesSize){
            HelperMethods.draw.drawToCanvas(canvas, ctx, this.sprites[this.sprite], this.x, this.y, this.width, this.height)
        }
    }

    setPlay(){
        this.play = true
        this.sprite = 0
    }

    setStop(){
        this.play = false
    }

    setXY(x, y){
        this.x = x
        this.y = y
    }

    setSprite() {
        if (this.play){
            let MAX_FRAMES = 1;
            this.frame++;
            if (this.frame > MAX_FRAMES) {
                this.frame = 0;
                if (this.sprite === this.spritesSize - 1 && !this.loop) {
                    return
                } else {
                    this.sprite++;
                }
                if (this.sprite > this.spritesSize && this.loop) {
                    this.sprite = 0;
                }

            }
        }
    }

    setEffects(){
        switch (this.effectType){
            case (Effects.STAR):
                this.sprites = this.starSprites
                this.loop = true
                this.width = 64
                this.height = 32
                break
            case (Effects.EXPLOSION):
                this.sprites = this.explosionSprites
                this.loop = false
                this.width = 256
                this.height = 256
                break
            case (Effects.TURBO_EFFECT):
                this.sprites = this.turboSprites
                this.loop = true
                break
            case (Effects.FIRE):
                this.sprites = this.fireSprites
                this.loop = true
                break
            case (Effects.SHIELD_EFFECT):
                this.sprites = this.shieldSprites
                this.loop = true
                this.width = 180
                this.height = 180
                break
            case (Effects.GLITTER):
                this.sprites = this.glitterSprites
                this.loop = true
                this.width = 128
                this.height = 128
                break
            case (Effects.GAME_OVER):
                this.sprites = this.gameOverSprites
                this.loop = false
                this.width = 675
                this.height = 150
                break
            case (Effects.GET_READY):
                this.sprites = this.getReadySprites
                this.loop = false
                this.width = 675
                this.height = 150
                break
            case (Effects.GOT_ITEM):
                this.sprites = this.gotItemSprites
                this.loop = false
                this.width = 128
                this.height = 128
                break

        }
        this.spritesSize = this.sprites.length
    }


}
