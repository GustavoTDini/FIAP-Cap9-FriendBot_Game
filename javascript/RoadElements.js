class RoadObjects {

    constructor(sprite, x, y, z, spriteSize, road){
        this.sprite = sprite
        this.x = x
        this.y = y
        this.z = z
        this.road = road
        this.speed = 0
        this.spriteSize = spriteSize
        this.screen = {x:0, y:0, spriteSize:0, spriteHeight: 0}
        this.mask = {x:this.x, z:this.z, w:0.2, s: 100}
        this.segment = null
        this.dir = 1;
    }

    render(ctx, maxDrawLine) {
        this.screen = this.project3D()
        if (maxDrawLine > this.screen.y){
            let spriteHeight = Math.min((maxDrawLine - this.screen.y), this.screen.spriteSize)
            let drawSprite = this.sprite.map((x) => x);
            drawSprite[4]= Math.min(drawSprite[4], (drawSprite[4] * spriteHeight) / this.screen.spriteSize)
            ctx.drawImage(...drawSprite, this.screen.x - this.screen.spriteSize/2, this.screen.y, this.screen.spriteSize, spriteHeight);
        }
    }

    update(dt){
        this.segment = this.road.findSegment(this.z)
        this.setMask()
    }

    setMask(){
        this.mask = {x:this.x, z:this.z, w:0.2, s: 100 }
    }

    project3D(){
        this.segment = this.road.findSegment(this.z)
        let camera = this.road.game.gameCamera
        // definimos as distancias em relação a camera
        let transY = this.y - camera.y
        let transZ = this.z - camera.z;
        // escalamos com base nos triangulos iguais
        let scale = camera.distToPlane/transZ;

        // definimos esses pontos no plano cartesiano utilizando a escala
        let projectedW = scale * MAX_ROAD_WIDTH;
        let projectedY = scale * transY;
        let projectedSize = scale * this.spriteSize;

        // utilizando a pontos do plano, o tamanho da tela  e o segmento atual- dfinimos os pontos do sprite
        let w = projectedW * CANVAS_CENTER_X * this.x
        let spriteSize = projectedSize * CANVAS_WIDTH
        let y = (1-projectedY) * CANVAS_CENTER_Y - spriteSize
        let x = this.segment.screenPoints.x
        return {x:x + w, y:y, spriteSize:spriteSize}
    }
}












