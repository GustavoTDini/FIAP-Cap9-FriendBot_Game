// Classe com os atributos de cada segmento da estrada a serem renderizados
class Traffic extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.speed = 100
    }

    update(dt, audioCtx){
        this.mask = {x:this.x, z:this.z-this.speed, w:0.2, s: this.speed*dt}
        this.z = this.z - this.speed
        this.segment = this.road.findSegment(this.z)
        this.y = this.segment.worldPoints.y
        if (this.road.findSegment(this.z).index === this.road.game.player.currentSegment.index){
            if (Math.random() > 0.75){
                playTrack(contextSounds["horn"], audioCtx, this.road.game.settings.sounds)
            }
        }
    }
}
