// Classe com os objetos para criar as moedas para colecionar
class Coins extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [Images.coin1, Images.coin2, Images.coin3, Images.coin4, Images.coin5, Images.coin6]

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
