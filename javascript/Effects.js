class Effects{

    starSprites = [star1, star2, star3, star4, star5, star6, star7, star8, star9, star10, star11, star12, star13, star14, star15, star16]
    explosionSprites = [explosion1, explosion2, explosion3, explosion4, explosion5, explosion6, explosion7, explosion8, explosion9, explosion10]
    turboSprites = [turbo1, turbo2, turbo3, turbo4, turbo5, turbo6, turbo7, turbo8, turbo9]
    fireSprites = [fire1, fire2, fire3, fire4, fire5, fire6, fire7, fire8, fire9]
    shieldSprites = [shield1, shield2, shield3, shield4, shield5, shield6, shield7, shield8]
    glitterSprites = [glitter1, glitter2, glitter3, glitter4, glitter5, glitter6]
    gameOverSprites = [game_over1, game_over2, game_over3, game_over4, game_over5, game_over6, game_over7, game_over8,
        game_over9, game_over10,game_over11, game_over12, game_over13, game_over14, game_over15, game_over16, game_over17,
        game_over18, game_over19, game_over20, game_over21, game_over22, game_over23, game_over24, game_over25, game_over26,
        game_over27, game_over28]
    getReadySprites = [get_ready1, get_ready2, get_ready3, get_ready4, get_ready5, get_ready6, get_ready7, get_ready8,
        get_ready9, get_ready10,get_ready11, get_ready12, get_ready13, get_ready14, get_ready15, get_ready16, get_ready17,
        get_ready18, get_ready19, get_ready20, get_ready21, get_ready22, get_ready23, get_ready24, get_ready25, get_ready26,
        get_ready27, get_ready28, get_ready29, get_ready30, get_ready31,get_ready32, get_ready33, get_ready34, get_ready35]
    gotItemSprites = [gotItem1, gotItem2, gotItem3, gotItem4]
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

    update(dt){
        this.setSprite()
    }

    render(ctx, canvas){
        if (this.sprite < this.spritesSize){
            drawToCanvas(canvas, ctx, this.sprites[this.sprite], this.x, this.y, this.width, this.height)
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
            case (STAR):
                this.sprites = this.starSprites
                this.loop = true
                this.width = 64
                this.height = 32
                break
            case (EXPLOSION):
                this.sprites = this.explosionSprites
                this.loop = false
                this.width = 256
                this.height = 256
                break
            case (TURBO_EFFECT):
                this.sprites = this.turboSprites
                this.loop = true
                break
            case (FIRE):
                this.sprites = this.fireSprites
                this.loop = true
                break
            case (SHIELD_EFFECT):
                this.sprites = this.shieldSprites
                this.loop = true
                this.width = 180
                this.height = 180
                break
            case (GLITTER):
                this.sprites = this.glitterSprites
                this.loop = true
                this.width = 128
                this.height = 128
                break
            case (GAME_OVER):
                this.sprites = this.gameOverSprites
                this.loop = false
                this.width = 675
                this.height = 150
                break
            case (GET_READY):
                this.sprites = this.getReadySprites
                this.loop = false
                this.width = 675
                this.height = 150
                break
            case (GOT_ITEM):
                this.sprites = this.gotItemSprites
                this.loop = false
                this.width = 128
                this.height = 128
                break

        }
        this.spritesSize = this.sprites.length
    }


}
