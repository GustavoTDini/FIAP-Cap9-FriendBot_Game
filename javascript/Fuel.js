// Classe com os atributos de cada segmento da estrada a serem renderizados
class Fuel extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [gas1, gas2, gas3, gas4, gas5, gas6]

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    shiningFuel() {
        let MAX_SPRITES = 5;
        let MAX_FRAMES = 3;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            this.sprite = this.coinSprites[this.currentSprite]
        }
    }

    update(dt) {
        super.update(dt);
        this.shiningFuel()
    }
}
