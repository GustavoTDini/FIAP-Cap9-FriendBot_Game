// Classe com os atributos de cada segmento da estrada a serem renderizados
class SideObjects extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road, tunnel) {
        super(sprite, x, y, z, spriteSize, road);
        this.tunnel = tunnel
    }
}
