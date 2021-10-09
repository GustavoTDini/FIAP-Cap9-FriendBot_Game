

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Segment {

    static BILLBOARDS = "BILLBOARDS"
    static REGULAR = "REGULAR"
    static EMPTY = "EMPTY"
    static ANIMALS = "ANIMALS"
    static YROAD = "YROAD"

    constructor(segments, curve, y, road, stage, type){
        this.road = road
        this.index = segments.length;
        this.texture = randomIntFromInterval(0,4)
        this.worldPoints = {x: 0, y:y, z: this.index*SEGMENT_LENGTH}
        this.screenPoints = {x:0, y:0, w:0}
        this.lastScreenPoints = {x:0, y:0, w:0}
        this.maxHeight = CANVAS_HEIGHT
        this.scale = -1;
        this.curve = curve
        this.stage = stage
        this.color = this.getColors(this.index)
        this.roadSideObjects = this.addScenarios(type)
        this.inRoadObjects = []

    }

    getColors(index) {
        let colorIndex = index%3
        switch (colorIndex){
            case 0:
                return stageObjects[this.stage].COLORS.LIGHT
            case 1:
                return stageObjects[this.stage].COLORS.DARK
            case 2:
                return stageObjects[this.stage].COLORS.DARKER
        }
    }

    addScenarios(type){
        const sidePlaces = [-9, -6, -4.5, -3, 3 , 4.5, 6, 9]
        const sideRoad = [-1.5, 1.5]
        let objects = []
        if (type === Segment.EMPTY){
            return []
        }
        let thisSprite = null
        if (type === Segment.REGULAR){
            for (let places in sidePlaces){
                if (Math.random() > 0.8) {
                    thisSprite = randomIntFromInterval(0,7)
                    objects.push(new SideObjects(stageObjects[this.stage].SCENARIOS[thisSprite], sidePlaces[places], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
                }
        }

        }

        switch (type){
            case (Segment.REGULAR):
                for (let places in sideRoad){
                    if (Math.random() > 0.8) {
                        if (Math.random() > 0.1){
                            thisSprite = stageObjects[this.stage].SIDE_SCENARIOS[randomIntFromInterval(0, 3)]
                        } else{
                            thisSprite = billboards[randomIntFromInterval(0, 2)]
                        }
                        objects.push(new SideObjects(thisSprite, sideRoad[places], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
                    }
                }
                break
            case (Segment.BILLBOARDS):
                thisSprite = billboards[randomIntFromInterval(0,2)]
                this.twoSidesObject(objects, thisSprite, sideRoad, thisSprite,0.90)
                break
            case (Segment.ANIMALS):
                thisSprite = commonScenarioAnimalCrossingSign
                this.twoSidesObject(objects, thisSprite, sideRoad, thisSprite,0.95)
                break
            case (Segment.YROAD):
                let leftSprite = stageObjects[this.road.game.nextLeft].LEFT_SIGN
                let rightSprite = stageObjects[this.road.game.nextRight].RIGHT_SIGN
                this.twoSidesObject(objects, leftSprite, sideRoad, rightSprite, 0.9);
                break

        }
        return objects
    }

    twoSidesObject(objects, leftSprite, sideRoad, rightSprite, chance) {
        if (Math.random() > chance) {
            objects.push(new SideObjects(leftSprite, sideRoad[0], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
            objects.push(new SideObjects(rightSprite, sideRoad[1], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
        }
    }
}
