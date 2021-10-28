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
        this.nextX = null
        this.tunnel = null
        this.dodgeble = false
        this.sound = null
    }

    render(ctx, maxDrawLine, canvasWidth, canvasHeight) {
        this.screen = this.project3D(canvasWidth, canvasHeight)
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
        this.setMask(dt)
    }

    setYZ() {
        this.y = this.road.findSegment(this.z).worldPoints.y
        this.z += this.speed
    }

    hitByShield(audioCtx){
        HelperMethods.sound.playTrack(Sounds.contextSounds["shield_hit"], audioCtx, this.road.game.settings.sounds, this.road.game.settings.soundVolume)
        if (this.road.game.player.currentLane === 0){
            if (this instanceof Cars){
                this.nextX = Road.ROAD_LANES[1]
            }
            this.x = Road.ROAD_LANES[1]
        }
        if (this.road.game.player.currentLane === 1){
            if (Math.random() < 0.5){
                if (this instanceof Cars){
                    this.nextX = Road.ROAD_LANES[0]
                }
                this.x = Road.ROAD_LANES[0]
            } else{
                if (this instanceof Cars){
                    this.nextX = Road.ROAD_LANES[2]
                }
                this.x = Road.ROAD_LANES[2]
            }
        }
        if (this.road.game.player.currentLane === 2){
            if (Math.random() < 0.5){
                if (this instanceof Cars){
                    this.nextX = Road.ROAD_LANES[1]
                }
                this.x = Road.ROAD_LANES[1]
            } else{
                if (this instanceof Cars){
                    this.nextX = Road.ROAD_LANES[3]
                }
                this.x = Road.ROAD_LANES[3]
            }
        }
        if (this.road.game.player.currentLane === 3){
            if (this instanceof Cars){
                this.nextX = Road.ROAD_LANES[2]
            }
            this.x = Road.ROAD_LANES[2]
        }
    }

    setMask(dt){
        this.mask = {x:this.x, z:this.z, w:0.2, s: this.speed === 0? 100: this.speed*dt*100}
    }

    // TODO - Fix dodge AI
    dodgeOtherObjects(dir){
        let thisSegment = this.segment.index
        let playerSegment = this.road.game.player.currentSegment.index
        let maxSegment = playerSegment + this.road.game.gameCamera.drawDistance
        if (thisSegment > playerSegment - 50 && thisSegment < maxSegment && thisSegment < this.road.totalSegments){
            for (let n = Math.max(playerSegment-50, 0); n < maxSegment; n ++){
                for (let obstacle in this.road.segments[n].inRoadObjects){
                    if (this.willCollide(this.road.segments[n].inRoadObjects[obstacle],dir)){
                        console.log("Collide")
                        switch (this.x){
                            case Road.ROAD_LANES[0]:
                                this.nextX =  Road.ROAD_LANES[1]
                                break
                            case Road.ROAD_LANES[1]:
                                this.nextX = Math.random() < 0.5 ? Road.ROAD_LANES[0]: Road.ROAD_LANES[2]
                                break
                            case Road.ROAD_LANES[2]:
                                this.nextX = Math.random() < 0.5 ? Road.ROAD_LANES[1]: Road.ROAD_LANES[3]
                                break
                            case Road.ROAD_LANES[3]:
                                this.nextX =  Road.ROAD_LANES[2]
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
    willCollide(object, dir) {
        if (object !== this && object.dodgeble){
            let thisZ = dir === 1? this.mask.z : this.mask.z + this.mask.s*10
            let thisX = this.mask.x
            let thisWidth = this.mask.w
            let thisSize = this.mask.s*10
            let objectZ = object.mask.z
            let objectX = object.mask.x
            let objectWidth = object.mask.w
            let objectSize = object.mask.s*10*dir
            return ((thisX < objectX + objectWidth) &&
                (thisX + thisWidth > objectX) &&
                (thisZ < objectZ + objectSize) &&
                (thisZ + thisSize > objectZ))
        } else{
            return false
        }
    }

    playSound(audioCtx, sound){
        if (this.road.findSegment(this.z).index === this.road.game.player.currentSegment.index){
            HelperMethods.sound.playTrack(sound, audioCtx, this.road.game.settings.sounds, this.road.game.settings.soundVolume)
    }

}
    project3D(canvasWidth, canvasHeight){
        this.segment = this.road.findSegment(this.z)
        let camera = this.road.game.gameCamera
        // definimos as distancias em relação a camera
        let transY = this.y - camera.y
        let transZ = this.z - camera.z;
        // escalamos com base nos triângulos iguais
        let scale = camera.distToPlane/transZ;

        // definimos esses pontos no plano cartesiano utilizando a escala
        let projectedW = scale * Game.MAX_ROAD_WIDTH;
        let projectedY = scale * transY;
        let projectedSize = scale * this.spriteSize;

        // utilizando a pontos do plano, o tamanho da tela  e o segmento atual- definimos os pontos do sprite
        let w = projectedW * canvasWidth/2 * this.x
        let spriteSize = projectedSize * canvasWidth
        let y = (1-projectedY) * canvasHeight/2 - spriteSize
        let x = this.segment.screenPoints.x

        return {x:x + w, y:y, spriteSize:spriteSize}
    }


}












