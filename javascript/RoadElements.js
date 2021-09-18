class RoadObjects {

    constructor(sprite, x, y, z, spriteSize, road, camera){
        this.sprite = sprite
        this.x = x
        this.y = y
        this.z = z
        this.road = road
        this.speed = 0
        this.spriteSize = spriteSize
        this.screen = {x:0, y:0, spriteSize:0}
        this.mask = {x:this.x, z:this.z, w:0.2, s: 200}
        this.segment = null
        this.dir = 1;

    }

    render(ctx, maxDrawLine) {
        this.screen = this.project3D()


        if (maxDrawLine > this.screen.y){
            let spriteHeight = (maxDrawLine - this.screen.y)
            let drawSprite = this.sprite.map((x) => x);
            drawSprite[4]= Math.min(drawSprite[4], (drawSprite[4] * spriteHeight) / this.screen.spriteSize)
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

        if (this instanceof SideObjects){
            projectedSize *=2
        }

        // utilizando a pontos do plano, o tamanho da tela  e o segmento atual- dfinimos os pontos do sprite
        let x = this.segment.screenPoints.x + (this.segment.screenPoints.w * this.x)
        let spriteSize = Math.round(projectedSize * CANVAS_CENTER_X);
        let y = Math.round((1 - projectedY) * CANVAS_CENTER_Y) - spriteSize;

        return {x:x, y:y, spriteSize:spriteSize}
    }
}


// Classe com os atributos de cada segmento da estrada a serem renderizados
class SideObjects extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road, camera) {
        super(sprite, x, y, z, spriteSize, road, camera);
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Cars extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road, camera, speed) {
        super(sprite, x, y, z, spriteSize, road, camera);
            this.speed = speed
            this.nextX = x
    }

    update(dt){
        super.update(dt)
        this.randomX()
        this.setX()
        this.y = this.road.findSegment(this.z).worldPoints.y
        this.z += this.speed*dt
        if (this.z <= this.road.game.player.currentSegment.z -100){
            this.z += 4000
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

    constructor(sprite, x, y, z, spriteSize, road, camera, speed) {
        super(sprite, x, y, z, spriteSize, road, camera);
        this.speed = speed
    }

    update(dt){
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        this.y = this.road.findSegment(this.z).worldPoints.y
        this.z -= this.speed*dt
        if (this.z <= this.road.roadLength){
            this.z += this.road.roadLength
        }
        if (this.z <= this.road.game.player.currentSegment.z -100){
            this.z += 4000
        }
    }

}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Coins extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    coinSprites = [coin1, coin2, coin3, coin4, coin5, coin6]

    constructor(sprite, x, y, z, spriteSize, road, camera) {
        super(sprite, x, y, z, spriteSize, road, camera);
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
class PowerUps extends RoadObjects{

    frame = 0;
    currentSprite = 0;
    turboSprites = [turbo1, turbo2]
    transparentSprite = [transparent1, transparent2]

    constructor(sprite, x, y, z, spriteSize, road, camera, type) {
        super(sprite, x, y, z, spriteSize, road, camera);
        this.type = type
        if (this.type === TURBO){
            this.sprite = this.turboSprites[0]
        } else if (this.type === TRANSPARENT){
            this.sprite = this.transparentSprite[0]
        }
    }

    flashingTurbo() {
        let MAX_SPRITES = 1;
        let MAX_FRAMES = 1;
        this.frame++;
        if (this.frame > MAX_FRAMES) {
            this.frame = 0;
            this.currentSprite++;
            if (this.currentSprite > MAX_SPRITES) {
                this.currentSprite = 0;
            }
            if (this.type === TURBO){
                this.sprite = this.turboSprites[this.currentSprite]
            } else if (this.type === TRANSPARENT){
                this.sprite = this.transparentSprite[this.currentSprite]
            }

        }
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        this.flashingTurbo()
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Obstacles extends RoadObjects{

    constructor(sprite, x, y, z, spriteSize, road, camera) {
        super(sprite, x, y, z, spriteSize, road, camera);
    }

    update(dt) {
        this.segment = this.road.findSegment(this.z)
        this.setMask()
        super.update(dt);
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Animals extends RoadObjects{

    guaraSpritesLeft = [guara1Left, guara2Left, guara3Left, guara4Left, guara5Left]
    jaguarSpritesLeft = [jaguar1Left, jaguar2Left, jaguar3Left, jaguar4Left, jaguar5Left]
    guaraSpritesRight = [guara1Right, guara2Right, guara3Right, guara4Right, guara5Right]
    jaguarSpritesRight = [jaguar1Right, jaguar2Right, jaguar3Right, jaguar4Right, jaguar5Right]
    frame = 0;
    currentSprite = 0;

    constructor(sprite, x, y, z, spriteSize, road, camera, type) {
        super(sprite, x, y, z, spriteSize, road, camera);
        this.type = type
        this.sprites = this.type === GUARA? this.guaraSpritesLeft:this.jaguarSpritesRight
        this.sprite = this.type === GUARA? this.guaraSpritesLeft[0]:this.jaguarSpritesRight[0]
        this.speed = this.x === 1? -0.01: 0.01
        if (this.type === GUARA){
            if (this.speed < 0) {
                this.sprites = this.guaraSpritesLeft
            } else {
                this.sprites = this.guaraSpritesRight
            }
        } else if (this.type === JAGUAR){
            if (this.speed < 0) {
                this.sprites = this.jaguarSpritesLeft
            } else {
                this.sprites = this.jaguarSpritesRight
            }
        }

    }

    walkAndReturn(){
        this.x += this.speed
        if (this.x > 1){
            this.speed = -0.01
            if (this.type === GUARA){
                this.sprites = this.guaraSpritesLeft
            } else if (this.type === JAGUAR){
                this.sprites = this.jaguarSpritesLeft
            }
        }
        if (this.x < -1){
            this.speed = 0.01
            if (this.type === GUARA){
                this.sprites = this.guaraSpritesRight
            } else if (this.type === JAGUAR){
                this.sprites = this.jaguarSpritesRight
            }
        }
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
        this.walkAndReturn()
        this.animateWalking()
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Background {

    constructor(game){
        this.game = game
        this.sky = background_sky
        this.mountains = background_mountain
        this.forest = background_trees
        this.offSetX = 0
        this.offSetY = 0

    }

    render(ctx){
        let skyCorrection = 0.00002
        let mountainCorrection = 0.00004
        let forestCorrection = 0.00006
        let skyX = setMaxMin(this.offSetX*skyCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let skyY = setMaxMin(-20 + this.offSetY*skyCorrection, 0, -50)
        let mountainX = setMaxMin(this.offSetX*mountainCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let mountainY = setMaxMin(-20 + this.offSetY*mountainCorrection, 0, -50)
        let forestX = setMaxMin(this.offSetX*forestCorrection*this.game.player.speed, CANVAS_WIDTH, 0)
        let forestY = setMaxMin(-20 + this.offSetY*forestCorrection, 0, -50)
        ctx.fillStyle = COLORS.SKY
        ctx.fillRect(0,0, CANVAS_WIDTH, 100)
        ctx.fillStyle = COLORS.GRASS
        ctx.fillRect(0, 100, CANVAS_WIDTH, CANVAS_HEIGHT-100)
        ctx.drawImage(this.sky, CANVAS_CENTER_X - skyX,skyY )
        ctx.drawImage(this.sky, CANVAS_CENTER_X- this.sky.width - skyX,skyY )
        ctx.drawImage(this.mountains, CANVAS_CENTER_X-mountainX, mountainY)
        ctx.drawImage(this.mountains, CANVAS_CENTER_X - this.sky.width-mountainX, mountainY)
        ctx.drawImage(this.forest, CANVAS_CENTER_X-forestX, forestY)
        ctx.drawImage(this.forest, CANVAS_CENTER_X-this.sky.width-forestX, forestY)
    }

    update(dt){
        this.offSetX+= this.game.road.findSegment(this.game.player.z).curve + this.game.player.x/2
        this.offSetY+= this.game.road.findSegment(this.game.player.z).worldPoints.y
    }

}
