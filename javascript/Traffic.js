// Classe com os atributos de cada segmento da estrada a serem renderizados
class Traffic extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.speed = HelperMethods.math.randomIntFromInterval(-100, -50)
        this.nextX = this.x
        this.dodgeble = true
    }

    update(dt, audioCtx){
        super.update(dt)
        this.setYZ()
        this.playSound(audioCtx, Sounds.contextSounds["horn"])
        this.dodgeOtherObjects(1)
        this.setX()

    }
}
