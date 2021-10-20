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
    sound = null

    constructor(sprite, x, y, z, spriteSize, road, type) {
        super(sprite, x, y, z, spriteSize, road);
        this.type = type
        this.sprites = this.setAnimalType(type)
        this.sprite = this.sprites[0]
        this.speed = this.setSpeed()
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
            if (this.road.findSegment(this.z).index === this.road.game.player.currentSegment.index){
                if (Math.random() > 0.75){
                    playTrack(this.sound, audioCtx, this.road.game.settings.sounds)
                }
            }
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
                    this.sound = contextSounds["suburb_dog_sound"]
                    if (this.speed > 0){
                        return this.suburbDogSpritesRight
                    } else{
                        return this.suburbDogSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = contextSounds["cat_sound"]
                    if (this.speed > 0){
                        return this.catSpritesRight
                    } else{
                        return this.catSpritesLeft
                    }
                }
                break
            case (CITY):
                if (this.type === 0 ){
                    this.sound = contextSounds["city_dog_sound"]
                    if (this.speed > 0){
                        return this.cityDogSpritesRight
                    } else{
                        return this.cityDogSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = contextSounds["capivara_sound"]
                    if (this.speed > 0){
                        return this.capivaraSpritesRight
                    } else{
                        return this.capivaraSpritesLeft
                    }
                }
                break
            case (BEACH):
                if (this.type === 0 ){
                    this.sound = contextSounds["turtle_sound"]
                    if (this.speed > 0){
                        return this.turtleSpritesRight
                    } else{
                        return this.turtleSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = contextSounds["beach_dog_sound"]
                    if (this.speed > 0){
                        return this.beachDogSpritesRight
                    } else{
                        return this.beachDogSpritesLeft
                    }
                }
                break
            case (FOREST):
                if (this.type === 0 ){
                    this.sound = contextSounds["guara_sound"]
                    if (this.speed > 0){
                        return this.guaraSpritesRight
                    } else{
                        return this.guaraSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = contextSounds["jaguar_sound"]
                    if (this.speed > 0){
                        return this.jaguarSpritesRight
                    } else{
                        return this.jaguarSpritesLeft
                    }
                }
                break
            case (FARM):
                if (this.type === 0 ){
                    this.sound = contextSounds["bull_sound"]
                    if (this.speed > 0){
                        return this.bullSpritesRight
                    } else{
                        return this.bullSpritesLeft
                    }
                } else if (this.type === 1){
                    this.sound = contextSounds["horse_sound"]
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
