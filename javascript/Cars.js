// Classe com os objetos para criar os carts que estão na estrada
class Cars extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.nextX = x
        this.speed = HelperMethods.math.randomIntFromInterval(this.road.game.player.difficulty.MAX_CARS_SPEEDS/4,this.road.game.player.difficulty.MAX_CARS_SPEEDS)
        this.dodgeble = true
    }

    update(dt, audioCtx){
        super.update(dt)
        this.randomX()
        this.dodgeOtherObjects()
        this.speedUp()
        this.setYZ()
        this.playSound(audioCtx, Sounds.contextSounds["car_pass"])
        this.setX()
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
