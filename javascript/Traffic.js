// Classe com os atributos de cada segmento da estrada a serem renderizados
class Traffic extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.speed = 100
    }

    update(dt){
        this.z = this.z -  this.speed
        this.segment = this.road.findSegment(this.z)
        this.y = this.segment.worldPoints.y + 128
        this.mask = {x:this.x, z:this.z, w:0.2, s: this.speed*dt}
    }
}
