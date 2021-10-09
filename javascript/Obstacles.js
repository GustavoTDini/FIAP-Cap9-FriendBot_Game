// Classe com os atributos de cada segmento da estrada a serem renderizados
class Obstacles extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        super.update(dt);
    }
}
