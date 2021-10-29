// Classe com os atributos de cada segmento da estrada a serem renderizados
class Obstacles extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.dodgeble = true
    }

    update(dt) {
        super.update(dt);
    }
}
