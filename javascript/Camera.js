// Classe com os atributos da camera para calculo dos pontos da tela
class Camera {

    constructor(game){
        this.x = 0;
        this.y = 1000;
        this.z = 0;
        this.distToPlayer = 1000;
        this.distToPlane = null;
        this.drawDistance = 200;
        this.fogDensity    = 5;
        this.game = game
    }

    init(){
        this.distToPlane = 1 / (this.y / this.distToPlayer);
    }

    update(){
        let player = this.game.player
        let road = this.game.road

        this.z = -this.distToPlayer;
        this.x = player.x * road.roadWidth;
        let YSegment = road.findSegment(player.z)
        this.y =  (YSegment.worldPoints.y + 1000)
        this.z = player.z - this.distToPlayer;

        if (this.z<0) this.z += road.roadLength;
    }
}
