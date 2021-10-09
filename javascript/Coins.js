// Classe com os atributos de cada segmento da estrada a serem renderizados
class Coins extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [coin1, coin2, coin3, coin4, coin5, coin6]

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    rotatingCoin() {
        let MAX_SPRITES = 5;
        let MAX_FRAMES = 1;
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
        this.rotatingCoin()
    }
}
