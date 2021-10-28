// Classe com os atributos de cada segmento da estrada a serem renderizados
class Cars extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.nextX = x
        this.speed = HelperMethods.math.randomIntFromInterval(100,500)
        this.dodgeble = true
    }

    update(dt, audioCtx){
        super.update(dt)
        this.randomX()
        this.dodgeOtherObjects(-1)
        this.setX()
        this.speedUp()
        this.setYZ()
        this.playSound(audioCtx, Sounds.contextSounds["car_pass"])
    }

    randomX(){
        if (Math.random() > 0.998){
            this.nextX = Road.ROAD_LANES[Math.floor(Math.random()*4)]
        }
    }

    speedUp(){
        if (this.road.findSegment(this.z).index > this.road.game.decideSegment -200){
            this.speed = Game.MAX_SPEED
        }
    }

}
