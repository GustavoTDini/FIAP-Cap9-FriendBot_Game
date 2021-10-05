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
        this.mask = {x:this.x, z:this.z, w:0.2, s: 200}
        this.segment = null
        this.dir = 1;

    }

    render(ctx, maxDrawLine) {
        this.screen = this.project3D()
        if (maxDrawLine > this.screen.y){
            let spriteHeight = (maxDrawLine - this.screen.y)
            let drawSprite = this.sprite.map((x) => x);
            drawSprite[4]= Math.min(drawSprite[4], (drawSprite[4] * spriteHeight) / this.screen.spriteHeight)
            ctx.drawImage(...drawSprite, this.screen.x - this.screen.spriteSize/2, this.screen.y, this.screen.spriteSize,spriteHeight);
        }
    }


    update(dt){
        this.segment = this.road.findSegment(this.z)
        this.setMask()
    }

    setMask(){
        this.mask = {x:this.x, z:this.z, w:0.2, s: 200}
    }

    project3D(){
        this.segment = this.road.findSegment(this.z)
        let camera = this.road.game.gameCamera
        // definimos as distancias em relação a camera
        let transY = this.y - camera.y;
        let transZ = this.z - camera.z;
        // escalamos com base nos triangulos iguais
        let scale = camera.distToPlane/transZ;

        // definimos esses pontos no plano cartesiano utilizando a escala
        let projectedY = scale * transY;
        let projectedSize = scale * this.spriteSize*2;

        // utilizando a pontos do plano, o tamanho da tela  e o segmento atual- dfinimos os pontos do sprite
        let x = this.segment.screenPoints.x + (this.segment.screenPoints.w * this.x)
        let spriteSize = Math.round(projectedSize * CANVAS_CENTER_X);
        let spriteHeight = Math.round(projectedSize*CANVAS_CENTER_Y)
        let y = Math.round((1 - projectedY) * CANVAS_CENTER_Y) - spriteSize;

        return {x:x, y:y, spriteSize:spriteSize, spriteHeight:spriteHeight}
    }
}


// Classe com os atributos de cada segmento da estrada a serem renderizados
class SideObjects extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }
}

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

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Traffic extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
        this.speed = 200
    }

    update(dt){
        this.z = this.z -  this.speed
        this.segment = this.road.findSegment(this.z)
        this.y = this.segment.worldPoints.y
        this.setMask()

        if (this.z <= this.road.game.player.currentSegment.worldPoints.z -100){
            this.speed = 0
        }
    }

}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Coins extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [coin1, coin2, coin3, coin4, coin5, coin6]

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    rotatingCoin() {
        let MAX_SPRITES = 5;
        let MAX_FRAMES = 1;
            this.frame++;
            if (this.frame > MAX_FRAMES) {
                this.frame = 0;
                this.currentSprite++;
                if (this.currentSprite > MAX_SPRITES) {
                    this.currentSprite = 0;
                }
                this.sprite = this.coinSprites[this.currentSprite]
            }
        }

        update(dt) {
            super.update(dt);
            this.rotatingCoin()
        }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Fuel extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [gas1, gas2, gas3, gas4, gas5, gas6]

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    shiningFuel() {
        let MAX_SPRITES = 5;
        let MAX_FRAMES = 0;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            this.sprite = this.coinSprites[this.currentSprite]
        }
    }

    update(dt) {
        super.update(dt);
        this.shiningFuel()
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class PowerUps extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    turboSprites = [turboItem1, turboItem2]
    boltSprites = [boltItem1, boltItem2]
    doubleSprites = [doubleItem1, doubleItem2]
    shieldSprites = [shieldItem1, shieldItem2]

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        switch (this.type){
            case (TURBO):
                this.sprite = this.turboSprites[0]
                break;
            case (BOLT):
                this.sprite = this.boltSprites[0]
                break;
            case(DOUBLE):
                this.sprite = this.doubleSprites[0]
                break;
            case(SHIELD):
                this.sprite = this.shieldSprites[0]
        }
    }

    flashingPowerUps() {
        let MAX_SPRITES = 1;
        let MAX_FRAMES = 1;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            switch (this.type){
                case (TURBO):
                    this.sprite = this.turboSprites[this.currentSprite]
                    break;
                case (BOLT):
                    this.sprite = this.boltSprites[this.currentSprite]
                    break;
                case(DOUBLE):
                    this.sprite = this.doubleSprites[this.currentSprite]
                    break;
                case(SHIELD):
                    this.sprite = this.shieldSprites[this.currentSprite]
            }

        }
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        this.flashingPowerUps()
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Obstacles extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road) {
        super(sprite, x, y, z, spriteSize, road);
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        super.update(dt);
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Animals extends RoadObjects{

    guaraSpritesLeft = [guara1Left, guara2Left, guara3Left, guara4Left, guaraStopped]
    guaraSpritesRight = [guara1Right, guara2Right, guara3Right, guara4Right, guaraStopped]
    jaguarSpritesLeft = [jaguar1Left, jaguar2Left, jaguar3Left, jaguar4Left, jaguarStopped]
    jaguarSpritesRight = [jaguar1Right, jaguar2Right, jaguar3Right, jaguar4Right, jaguarStopped]
    turtleSpritesLeft = [turtle1Left, turtle2Left, turtle3Left, turtle4Left, turtleStopped]
    turtleSpritesRight = [turtle1Right, turtle2Right, turtle3Right, turtle4Right, turtleStopped]
    beachDogSpritesLeft = [beachDog1Left, beachDog2Left, beachDog3Left, beachDog4Left, beachDogStopped]
    beachDogSpritesRight = [beachDog1Right, beachDog2Right, beachDog3Right, beachDog4Right, beachDogStopped]
    suburbDogSpritesLeft = [suburbDog1Left, suburbDog2Left, suburbDog3Left, suburbDog4Left, suburbDogStopped]
    suburbDogSpritesRight = [suburbDog1Right, suburbDog2Right, suburbDog3Right, suburbDog4Right, suburbDogStopped]
    catSpritesLeft = [cat1Left, cat2Left, cat3Left, cat4Left, catStopped]
    catSpritesRight = [cat1Right, cat2Right, cat3Right, cat4Right, catStopped]
    bullSpritesLeft = [bull1Left, bull2Left, bull3Left, bull4Left, bullStopped]
    bullSpritesRight = [bull1Right, bull2Right, bull3Right, bull4Right, bullStopped]
    horseSpritesLeft = [horse1Left, horse2Left, horse3Left, horse4Left, horseStopped]
    horseSpritesRight = [horse1Right, horse2Right, horse3Right, horse4Right, horseStopped]
    cityDogSpritesLeft = [cityDog1Left, cityDog2Left, cityDog3Left, cityDog4Left, cityDogStopped]
    cityDogSpritesRight = [cityDog1Right, cityDog2Right, cityDog3Right, cityDog4Right, cityDogStopped]
    capivaraSpritesLeft = [capivara1Left, capivara2Left, capivara3Left, capivara4Left, capivaraStopped]
    capivaraSpritesRight = [capivara1Right, capivara2Right, capivara3Right, capivara4Right, capivaraStopped]
    frame = 0;
    currentSprite = 0;
    hit = false
    slowSpeed = 0.01
    fastSpeed = 0.03

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        this.sprites = this.setAnimalType(type)
        this.sprite = this.sprites[0]
        this.speed = this.setSpeed()
    }

    walkAndReturn(){
        this.x += this.speed
        if (this.x > 1){
            if (this.type === 0){
                this.speed = -this.slowSpeed
            } else if (this.type ===1){
                this.speed = -this.fastSpeed
            }

        } else if (this.x < -1){
            if (this.type === 0){
                this.speed = this.slowSpeed
            } else if (this.type ===1){
                this.speed = this.fastSpeed
            }
        }

        this.sprites = this.setAnimalType()
    }

    animateWalking() {
        let MAX_SPRITES = 3;
        let MAX_FRAMES = 8;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            this.sprite = this.sprites[this.currentSprite]
        }
    }

    update(dt) {
        super.update(dt);
        if (!this.hit){
            this.walkAndReturn()
            this.animateWalking()
        } else if (this.hit){
            this.speed = 0
            this.sprite = this.sprites[4]
        }
    }

    setSpeed(){
        if (this.x === 1){
            if (this.type === 0){
                return -this.slowSpeed
            } else if (this.type === 1){
                return  -this.fastSpeed
            }
        } else {
            if (this.type === 0){
                return this.slowSpeed
            } else if (this.type === 1){
                return this.fastSpeed
            }
        }

    }

    setAnimalType(){
        switch (this.road.game.currentStage) {
            case (SUBURB):
                if (this.type === 0 ){
                    if (this.speed > 0){
                        return this.suburbDogSpritesRight
                    } else{
                        return this.suburbDogSpritesLeft
                    }
                } else if (this.type === 1){
                    if (this.speed > 0){
                        return this.catSpritesRight
                    } else{
                        return this.catSpritesLeft
                    }
                }
                break
            case (CITY):
                if (this.type === 0 ){
                    if (this.speed > 0){
                        return this.cityDogSpritesRight
                    } else{
                        return this.cityDogSpritesLeft
                    }
                } else if (this.type === 1){
                    if (this.speed > 0){
                        return this.capivaraSpritesRight
                    } else{
                        return this.capivaraSpritesLeft
                    }
                }
                break
            case (BEACH):
                if (this.type === 0 ){
                    if (this.speed > 0){
                        return this.turtleSpritesRight
                    } else{
                        return this.turtleSpritesLeft
                    }
                } else if (this.type === 1){
                    if (this.speed > 0){
                        return this.beachDogSpritesRight
                    } else{
                        return this.beachDogSpritesLeft
                    }
                }
                break
            case (FOREST):
                if (this.type === 0 ){
                    if (this.speed > 0){
                        return this.guaraSpritesRight
                    } else{
                        return this.guaraSpritesLeft
                    }
                } else if (this.type === 1){
                    if (this.speed > 0){
                        return this.jaguarSpritesRight
                    } else{
                        return this.jaguarSpritesLeft
                    }
                }
                break
            case (FARM):
                if (this.type === 0 ){
                    if (this.speed > 0){
                        return this.bullSpritesRight
                    } else{
                        return this.bullSpritesLeft
                    }
                } else if (this.type === 1){
                    if (this.speed > 0){
                        return this.horseSpritesRight
                    } else{
                        return this.horseSpritesLeft
                    }
                }
                break
        }


    }
}
