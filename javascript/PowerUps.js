// Classe com os atributos de cada segmento da estrada a serem renderizados
class PowerUps extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    turboSprites = [turboItem1, turboItem2]
    boltSprites = [boltItem1, boltItem2]
    doubleSprites = [doubleItem1, doubleItem2]
    shieldSprites = [shieldItem1, shieldItem2]

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        switch (this.type){
            case (TURBO):
                this.sprite = this.turboSprites[0]
                this.sprites = this.turboSprites
                break;
            case (BOLT):
                this.sprite = this.boltSprites[0]
                this.sprites = this.boltSprites
                break;
            case(DOUBLE):
                this.sprite = this.doubleSprites[0]
                this.sprites = this.doubleSprites
                break;
            case(SHIELD):
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
