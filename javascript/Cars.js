// Classe com os atributos de cada segmento da estrada a serem renderizados
class Cars extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.nextX = x
        this.speed = randomIntFromInterval(20,100)
    }

    update(dt){
        super.update(dt)
        this.randomX()
        this.setX()
        this.y = this.road.findSegment(this.z).worldPoints.y
        this.z += this.speed
        if (this.z <= this.road.game.player.currentSegment.worldPoints.z -100){
            let finalSegment = this.road.segments.length
            this.z = this.road.segments[finalSegment-1].worldPoints.z
        }
    }

    setX(){
        if (this.nextX !== this.x){
            if (this.x > this.nextX){
                this.x = this.x - 0.05
            } else{
                this.x = this.x + 0.05
            }
        } else{
            this.nextX = this.x
        }
    }

    randomX(){
        if (Math.random() > 0.998){
            this.nextX = ROAD_LANES[Math.floor(Math.random()*4)]
        }
    }

}
