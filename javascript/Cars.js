// Classe com os atributos de cada segmento da estrada a serem renderizados
class Cars extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.nextX = x
        this.speed = randomIntFromInterval(50,200)
    }

    update(dt, audioCtx){
        super.update(dt)
        this.randomX()
        this.setX()
        this.y = this.road.findSegment(this.z).worldPoints.y
        this.z += this.speed
        if (this.road.findSegment(this.z).index === this.road.game.player.currentSegment.index){
            playTrack(contextSounds["car_pass"], audioCtx, this.road.game.settings.sounds)
        }
    }

    setX(){
        if (this.nextX !== this.x){
            if (this.x > this.nextX){
                this.x = this.x - 0.05
                if (this.x < this.nextX){
                    this.x = this.nextX
                }
            } else{
                this.x = this.x + 0.05
                if (this.x > this.nextX){
                    this.x = this.nextX
                }

            }
        }
    }

    randomX(){
        if (Math.random() > 0.998){
            this.nextX = ROAD_LANES[Math.floor(Math.random()*4)]
        }
    }

}
