

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Segment {

    constructor(segments, curve, y, road, stage){
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
        this.roadSideObjects = this.addScenarios()
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

    addScenarios(){
        const sidePlaces = [-9, -6, -4.5, -3, 3 , 4.5, 6, 9]
        const sideRoad = [-1.5, 1.5]
        let objects = []
        for (let places in sidePlaces){
            if (Math.random() > 0.9) {
                let thisSprite = randomIntFromInterval(0,7)
                objects.push(new SideObjects(stageObjects[this.stage].SCENARIOS[thisSprite], sidePlaces[places], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
            }
        }
        for (let places in sideRoad){
            if (Math.random() > 0.95) {
                let thisSprite = randomIntFromInterval(0,3)
                objects.push(new SideObjects(stageObjects[this.stage].SIDE_SCENARIOS[thisSprite], sideRoad[places], this.worldPoints.y, this.worldPoints.z, LARGE_SPRITE_SIZE, this.road, this.road.game.gameCamera))
            }
        }
        return objects

    }
}
