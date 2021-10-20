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
        this.nextX
        this.tunnel = null
    }

    render(ctx, maxDrawLine) {
        this.screen = this.project3D()
        if (maxDrawLine > this.screen.y){
            let spriteHeight = Math.min((maxDrawLine - this.screen.y), this.screen.spriteSize)
            let drawSprite = this.sprite.map((x) => x);
            drawSprite[4]= Math.min(drawSprite[4], (drawSprite[4] * spriteHeight) / this.screen.spriteSize)
            if (this.tunnel){
                ctx.drawImage(...drawSprite, this.screen.x + this.screen.spriteSize/5, this.screen.y, this.screen.spriteSize*2, spriteHeight);
            } else{
                ctx.drawImage(...drawSprite, this.screen.x - this.screen.spriteSize/2, this.screen.y, this.screen.spriteSize, spriteHeight);
            }

        }
    }

    update(dt){
        this.segment = this.road.findSegment(this.z)
        this.setMask()
    }

    hitByShield(audioCtx){
        playTrack(contextSounds["shield_hit"], audioCtx, this.road.game.settings.sounds)
        if (this.road.game.player.currentLane === 0){
            if (this instanceof Cars){
                this.nextX = ROAD_LANES[1]
            }
            this.x = ROAD_LANES[1]
        }
        if (this.road.game.player.currentLane === 1){
            if (Math.random() < 0.5){
                if (this instanceof Cars){
                    this.nextX = ROAD_LANES[0]
                }
                this.x = ROAD_LANES[0]
            } else{
                if (this instanceof Cars){
                    this.nextX = ROAD_LANES[2]
                }
                this.x = ROAD_LANES[2]
            }
        }
        if (this.road.game.player.currentLane === 2){
            if (Math.random() < 0.5){
                if (this instanceof Cars){
                    this.nextX = ROAD_LANES[1]
                }
                this.x = ROAD_LANES[1]
            } else{
                if (this instanceof Cars){
                    this.nextX = ROAD_LANES[3]
                }
                this.x = ROAD_LANES[3]
            }
        }
        if (this.road.game.player.currentLane === 3){
            if (this instanceof Cars){
                this.nextX = ROAD_LANES[2]
            }
            this.x = ROAD_LANES[2]
        }
    }

    setMask(){
        this.mask = {x:this.x, z:this.z, w:0.2, s: 100 }
    }

    dodgeOtherObjects(){
        let thisSegment = this.segment.index
        let playerSegment = this.road.game.player.currentSegment.index
        let maxSegment = playerSegment + this.road.game.gameCamera.drawDistance

        if (thisSegment > playerSegment - 20 && thisSegment < maxSegment){
            for (let n = playerSegment-20; n < maxSegment; n ++){
                for (let obstacle in this.road.segments[n]){
                    if (this.willCollide(obstacle)){
                        switch (this.x){
                            case ROAD_LANES[0]:
                                this.nextX =  ROAD_LANES[1]
                                break
                            case ROAD_LANES[1]:
                                this.nextX = Math.random() < 0.5 ? ROAD_LANES[0]: ROAD_LANES[2]
                                break
                            case ROAD_LANES[2]:
                                this.nextX = Math.random() < 0.5 ? ROAD_LANES[1]: ROAD_LANES[3]
                                break
                            case ROAD_LANES[3]:
                                this.nextX =  ROAD_LANES[2]
                                break

                        }
                    }
                }
            }
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


    //função para definir uma colisão entre 2 objetos
    willCollide(object) {
        let thisZ = this.mask.z
        if (object instanceof Cars || object instanceof Traffic || object instanceof Obstacles || object instanceof Animals){
            if (object.z > thisZ - 500 && object.z < thisZ + this.road.game.gameCamera.drawDistance * SEGMENT_LENGTH){
                let thisX = this.mask.x
                let objectX = object.mask.x
                let objectZ = object.mask.z
                let thisWidth = this.mask.w
                let objectWidth = object.mask.w
                let thisSize = this.mask.s
                let objectSize = object.mask.s
                thisZ = thisZ + this.speed*3
                return ((thisX < objectX + objectWidth) &&
                    (thisX + thisWidth > objectX) &&
                    (thisZ < objectZ + objectSize) &&
                    (thisZ + thisSize > objectZ))
            } else{
                return false
            }
        } else {
            return false
        }

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












