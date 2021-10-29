// Classe com os objetos para criar os animais que atravessam a estrada
class Animals extends RoadObjects{

    guaraSpritesLeft = [ Images.guara1Left, Images.guara2Left, Images.guara3Left, Images.guara4Left, Images.guaraStopped]
    guaraSpritesRight = [ Images.guara1Right, Images.guara2Right, Images.guara3Right, Images.guara4Right, Images.guaraStopped]
    jaguarSpritesLeft = [ Images.jaguar1Left, Images.jaguar2Left, Images.jaguar3Left, Images.jaguar4Left, Images.jaguarStopped]
    jaguarSpritesRight = [ Images.jaguar1Right, Images.jaguar2Right, Images.jaguar3Right, Images.jaguar4Right, Images.jaguarStopped]
    turtleSpritesLeft = [ Images.turtle1Left, Images.turtle2Left, Images.turtle3Left, Images.turtle4Left, Images.turtleStopped]
    turtleSpritesRight = [ Images.turtle1Right, Images.turtle2Right, Images.turtle3Right, Images.turtle4Right, Images.turtleStopped]
    beachDogSpritesLeft = [ Images.beachDog1Left, Images.beachDog2Left, Images.beachDog3Left, Images.beachDog4Left, Images.beachDogStopped]
    beachDogSpritesRight = [ Images.beachDog1Right, Images.beachDog2Right, Images.beachDog3Right, Images.beachDog4Right, Images.beachDogStopped]
    suburbDogSpritesLeft = [ Images.suburbDog1Left, Images.suburbDog2Left, Images.suburbDog3Left, Images.suburbDog4Left, Images.suburbDogStopped]
    suburbDogSpritesRight = [ Images.suburbDog1Right, Images.suburbDog2Right, Images.suburbDog3Right, Images.suburbDog4Right, Images.suburbDogStopped]
    catSpritesLeft = [ Images.cat1Left, Images.cat2Left, Images.cat3Left, Images.cat4Left, Images.catStopped]
    catSpritesRight = [ Images.cat1Right, Images.cat2Right, Images.cat3Right, Images.cat4Right, Images.catStopped]
    bullSpritesLeft = [ Images.bull1Left, Images.bull2Left, Images.bull3Left, Images.bull4Left, Images.bullStopped]
    bullSpritesRight = [ Images.bull1Right, Images.bull2Right, Images.bull3Right, Images.bull4Right, Images.bullStopped]
    horseSpritesLeft = [ Images.horse1Left, Images.horse2Left, Images.horse3Left, Images.horse4Left, Images.horseStopped]
    horseSpritesRight = [ Images.horse1Right, Images.horse2Right, Images.horse3Right, Images.horse4Right, Images.horseStopped]
    cityDogSpritesLeft = [ Images.cityDog1Left, Images.cityDog2Left, Images.cityDog3Left, Images.cityDog4Left, Images.cityDogStopped]
    cityDogSpritesRight = [ Images.cityDog1Right, Images.cityDog2Right, Images.cityDog3Right, Images.cityDog4Right, Images.cityDogStopped]
    capivaraSpritesLeft = [ Images.capivara1Left, Images.capivara2Left, Images.capivara3Left, Images.capivara4Left, Images.capivaraStopped]
    capivaraSpritesRight = [ Images.capivara1Right, Images.capivara2Right, Images.capivara3Right, Images.capivara4Right, Images.capivaraStopped]
    frame = 0;
    currentSprite = 0;
    slowSpeed = 0.01
    fastSpeed = 0.03

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        this.sprites = this.setAnimalType(type)
        this.sprite = this.sprites[0]
        this.speed = this.setSpeed()
        this.dodgeble = true
        this.hit = false
        this.sound = null
    }

    walkAndReturn(){
        this.x += this.speed
        this.sprites = this.setAnimalType()
        if (this.x > 1){
            if (this.type === 0){
                this.speed = -this.slowSpeed
                this.sprites = this.setAnimalType()
            } else if (this.type ===1){
                this.speed = -this.fastSpeed
                this.sprites = this.setAnimalType()
            }
        } else if (this.x < -1){
            if (this.type === 0){
                this.speed = this.slowSpeed
                this.sprites = this.setAnimalType()
            } else if (this.type ===1){
                this.speed = this.fastSpeed
                this.sprites = this.setAnimalType()
            }
        }


    }

    animateWalking() {
        let MAX_SPRITES = 3;
        let MAX_FRAMES = 5;
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

    update(dt, audioCtx) {
        super.update(dt);
        if (!this.hit){
            this.walkAndReturn()
            this.animateWalking()
            this.playSound(audioCtx, this.sound)
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
            case (Game.SUBURB):
                if (this.type === 0 ){
                    this.sound = Sounds.contextSounds["suburb_dog_sound"]
                    if (this.speed > 0){
                        return this.suburbDogSpritesRight
                    } else{
                        return this.suburbDogSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = Sounds.contextSounds["cat_sound"]
                    if (this.speed > 0){
                        return this.catSpritesRight
                    } else{
                        return this.catSpritesLeft
                    }
                }
                break
            case (Game.CITY):
                if (this.type === 0 ){
                    this.sound = Sounds.contextSounds["city_dog_sound"]
                    if (this.speed > 0){
                        return this.cityDogSpritesRight
                    } else{
                        return this.cityDogSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = Sounds.contextSounds["capivara_sound"]
                    if (this.speed > 0){
                        return this.capivaraSpritesRight
                    } else{
                        return this.capivaraSpritesLeft
                    }
                }
                break
            case (Game.BEACH):
                if (this.type === 0 ){
                    this.sound = Sounds.contextSounds["turtle_sound"]
                    if (this.speed > 0){
                        return this.turtleSpritesRight
                    } else{
                        return this.turtleSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = Sounds.contextSounds["beach_dog_sound"]
                    if (this.speed > 0){
                        return this.beachDogSpritesRight
                    } else{
                        return this.beachDogSpritesLeft
                    }
                }
                break
            case (Game.FOREST):
                if (this.type === 0 ){
                    this.sound = Sounds.contextSounds["guara_sound"]
                    if (this.speed > 0){
                        return this.guaraSpritesRight
                    } else{
                        return this.guaraSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = Sounds.contextSounds["jaguar_sound"]
                    if (this.speed > 0){
                        return this.jaguarSpritesRight
                    } else{
                        return this.jaguarSpritesLeft
                    }
                }
                break
            case (Game.FARM):
                if (this.type === 0 ){
                    this.sound = Sounds.contextSounds["bull_sound"]
                    if (this.speed > 0){
                        return this.bullSpritesRight
                    } else{
                        return this.bullSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = Sounds.contextSounds["horse_sound"]
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
