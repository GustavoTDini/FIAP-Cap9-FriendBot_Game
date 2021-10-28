// Classe com os atributos de cada segmento da estrada a serem renderizados
class PowerUps extends RoadObjects{

    static TURBO = 6
    static BOLT = 7
    static DOUBLE = 8
    static SHIELD = 9

    frame = 0;
    currentSprite = 0;
    turboSprites = [Images.turboItem1, Images.turboItem2]
    boltSprites = [Images.boltItem1, Images.boltItem2]
    doubleSprites = [Images.doubleItem1, Images.doubleItem2]
    shieldSprites = [Images.shieldItem1, Images.shieldItem2]

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        switch (this.type){
            case (PowerUps.TURBO):
                this.sprite = this.turboSprites[0]
                this.sprites = this.turboSprites
                break;
            case (PowerUps.BOLT):
                this.sprite = this.boltSprites[0]
                this.sprites = this.boltSprites
                break;
            case(PowerUps.DOUBLE):
                this.sprite = this.doubleSprites[0]
                this.sprites = this.doubleSprites
                break;
            case(PowerUps.SHIELD):
                this.sprite = this.shieldSprites[0]
                this.sprites = this.shieldSprites
        }
    }

    flashingPowerUps() {
        let MAX_SPRITES = 1;
        let MAX_FRAMES = 1;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            this.sprite = this.sprites[this.currentSprite]
        }
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        this.flashingPowerUps()
    }
}
