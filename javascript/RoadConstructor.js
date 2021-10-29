class RoadConstructor {

    CARS = 1
    TRAFFIC = 2
    ANIMALS = 3
    OBSTACLES = 4

    //Road Segments
    static ROAD_SIZES = {
        LENGTH: { NONE: 0, SHORT:  25, MEDIUM:  50, LONG:  100 },
        HILL:   { NONE: 0, LOW:    20, MEDIUM:  40, HIGH:   60 },
        CURVE:  { NONE: 0, EASY:    2, MEDIUM:   4, HARD:    6 }
    };

    coinPattern1 =
        [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false,
            true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false,
            true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]

    coinPattern2 =
        [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false,
            false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false,
            false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false]

    coinPattern3 =
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false,
            false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false,
            false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false]

    coinPattern4 =
        [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true,
            false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true,
            false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true]

    coinPattern5 =
        [true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true,
            false, false, true, false, false, true, false, false, true, false, false, false, false, true, false, false,
            false, false, true, false, false, false, false, true, false, false, true, false, false, true, false, false]

    coinPattern6 =
        [true, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false,
            false, true, false, false, false, true, false, false, false, false, true, false, false, false, true, false,
            false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, true]

    coinPattern7 =
        [false, false, false, true, false, false, false, true, false, false, false, true, false, false, true, false,
            false, false, true, false, false, false, true, false, false, true, false, false, false, true, false, false,
            false, true, false, false, true, false, false, false, true, false, false, false, true, false, false, false]

    coinPattern8 =
        [false, true, true, false, true, false, false, true, true, false, false, true, false, true, true, false,
            false, true, true, false, true, false, false, true, true, false, false, true, false, true, true, false,
            false, true, true, false, true, false, false, true, true, false, false, true, false, true, true, false]

    coinPattern9 =
        [true, false, false, true, false, true, true, false, false, true, true, false, true, false, false, true,
            false, true, true, false, false, true, true, false, true, false, false, true, false, true, true, false,
            false, true, true, false, true, false, false, true, false, true, true, false, false, true, true, false]

    coinPattern10 =
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]

    coinPattern11 =
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

    coinPatterns = [this.coinPattern1, this.coinPattern2, this.coinPattern3, this.coinPattern4, this.coinPattern5,
        this.coinPattern6, this.coinPattern7, this.coinPattern8, this.coinPattern9, this.coinPattern10, this.coinPattern11]

    constructor(road, game) {
        this.road = road
        this.game = game
    }


    // ---------------------------------------------------------------------------------
    // Road Constructor
    // ---------------------------------------------------------------------------------

    createRoad() {
        this.StartSegment()
        this.addMoreRoad()
    }

    addMoreRoad(){
            let startSegment = this.road.segments.length
            this.selectStage()
            for (let n = 1; n < this.game.player.difficulty.LEVELS[this.game.level].ROAD_SEGMENTS; n++){
                let random = HelperMethods.math.randomIntFromInterval(0, 5)
                switch (random){
                    case 0:
                        this.hillsSegment();
                        break
                    case 1:
                        this.animalSegment();
                        break
                    case 2:
                        this.curvesSegment();
                        break
                    case 3:
                        this.sCurveSegment();
                        break
                    case 4:
                        this.crazySegment()
                        break
                    case 5:
                        this.straightSegment()
                        break
                }

            }
            this.addObstacles(startSegment + 200, this.road.totalSegments-500, this.CARS)
            this.addItems(startSegment, this.road.totalSegments-100)
            this.selectSegment()
            this.updateRoadSize()
    }

    getLastY() { return (this.road.segments.length === 0) ? 0 : this.road.segments[this.road.segments.length-1].worldPoints.y; }

    addMoreSegments(enter, hold, leave, curve, y, stage, type, YRoad) {
        let HMMath = HelperMethods.math
        let lastY   = this.getLastY();
        let endY     = lastY + (HMMath.toInt(y, 0) * Game.SEGMENT_LENGTH);
        let n, total = enter + hold + leave;
        for(n = 0 ; n < enter ; n++){
            this.road.segments.push( new Segment(this.road.segments, HMMath.smoothIn(0, curve, n/enter), HMMath.smoothInOut(lastY, endY, n/total), this.road, stage, type, YRoad, n+1));
        }
        for(n = 0 ; n < hold  ; n++){
            this.road.segments.push( new Segment(this.road.segments, curve, HMMath.smoothInOut(lastY, endY, (enter+n)/total), this.road, stage, type, YRoad, n+enter+1));
        }
        for(n = 0 ; n < leave ; n++){
            this.road.segments.push( new Segment(this.road.segments, HMMath.smoothInOut(curve, 0, n/leave), HMMath.smoothInOut(lastY, endY, (enter+hold+n)/total), this.road, stage, type,YRoad, n+hold + enter+1));
        }

    }

    updateRoadSize(){
        this.road.totalSegments = this.road.segments.length
        this.roadLength = this.road.totalSegments * Game.SEGMENT_LENGTH;
    }

    // ---------------------------------------------------------------------------------
    // Add Road Pieces
    // ---------------------------------------------------------------------------------

    addStraight(num, type) {
        num = num || RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM;
        this.addMoreSegments(num, num, num, 0, 0, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addHill(num, height, type) {
        num    = num    || RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM;
        height = height || RoadConstructor.ROAD_SIZES.HILL.MEDIUM;
        this.addMoreSegments(num, num, num, 0, height, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addCurve(num, curve, height, type) {
        num    = num    || RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM;
        curve  = curve  || RoadConstructor.ROAD_SIZES.CURVE.MEDIUM;
        height = height || RoadConstructor.ROAD_SIZES.HILL.NONE;
        this.addMoreSegments(num, num, num, curve, height, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addYCurve(dir) {
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.LENGTH.LONG, dir*RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.NONE, this.game.currentStage, Segment.EMPTY, true);
        this.updateRoadSize()
    }

    addLowRollingHills(type) {
        let num = RoadConstructor.ROAD_SIZES.LENGTH.SHORT;
        let height = RoadConstructor.ROAD_SIZES.HILL.LOW;
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0, -height, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  height, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addSCurves(type) {
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM,  -RoadConstructor.ROAD_SIZES.CURVE.EASY,    RoadConstructor.ROAD_SIZES.HILL.NONE, this.game.currentStage, type, false);
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM,   RoadConstructor.ROAD_SIZES.CURVE.MEDIUM,  RoadConstructor.ROAD_SIZES.HILL.MEDIUM, this.game.currentStage, type, false);
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM,   RoadConstructor.ROAD_SIZES.CURVE.EASY,   -RoadConstructor.ROAD_SIZES.HILL.LOW, this.game.currentStage, type, false);
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM,  -RoadConstructor.ROAD_SIZES.CURVE.EASY,    RoadConstructor.ROAD_SIZES.HILL.MEDIUM, this.game.currentStage, type, false);
        this.addMoreSegments(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM,  -RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, -RoadConstructor.ROAD_SIZES.HILL.MEDIUM, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    // ---------------------------------------------------------------------------------
    // Segments
    // ---------------------------------------------------------------------------------

    StartSegment(){
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG, Segment.BILLBOARDS)
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG*2, Segment.REGULAR)
    }

    hillsSegment(){
        let startSegment = this.road.segments.length
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.SHORT, RoadConstructor.ROAD_SIZES.HILL.LOW, Segment.REGULAR);
        this.addLowRollingHills(Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.LOW, Segment.REGULAR);
        this.addLowRollingHills(Segment.REGULAR);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
    }
    curvesSegment(){
        let startSegment = this.road.segments.length
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(null, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, -RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.MEDIUM, Segment.REGULAR);
        let finalSegment = this.road.segments.length- 500
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    animalSegment() {
        let startSegment = this.road.segments.length
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.SHORT, Segment.ANIMALS);
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.HILL.HIGH, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, -RoadConstructor.ROAD_SIZES.HILL.LOW, Segment.REGULAR);
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.LONG, -RoadConstructor.ROAD_SIZES.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.SHORT, Segment.ANIMALS);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.ANIMALS)
    }

    sCurveSegment(){
        let startSegment = this.road.segments.length
        this.addCurve(null, null, null, Segment.REGULAR);
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.HILL.HIGH, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, -RoadConstructor.ROAD_SIZES.HILL.LOW, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.SHORT, Segment.REGULAR);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
    }

    crazySegment(){
        let startSegment = this.road.segments.length
        this.addSCurves(Segment.REGULAR);
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.HILL.HIGH, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, -RoadConstructor.ROAD_SIZES.HILL.LOW, Segment.REGULAR);
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.LONG, RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, RoadConstructor.ROAD_SIZES.HILL.MEDIUM, Segment.REGULAR);
        this.addHill(RoadConstructor.ROAD_SIZES.LENGTH.LONG, -RoadConstructor.ROAD_SIZES.HILL.HIGH, Segment.REGULAR);
        this.addSCurves(Segment.REGULAR)
        this.addCurve(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, -RoadConstructor.ROAD_SIZES.CURVE.MEDIUM, -RoadConstructor.ROAD_SIZES.HILL.HIGH, Segment.REGULAR);
        let finalSegment = this.road.segments.length-500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    straightSegment(){
        let startSegment = this.road.segments.length
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG*7, Segment.REGULAR);
        let finalSegment = this.road.segments.length-500
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    // ---------------------------------------------------------------------------------
    // Add Objects
    // ---------------------------------------------------------------------------------

    addObstacles(start, finish, type){
        let HMMath = HelperMethods.math
        let max = type === this.CARS? this.game.player.difficulty.LEVELS[this.game.level].MAX_CARS : this.game.player.difficulty.LEVELS[this.game.level].MAX_OBSTACLES
        for (let n = 0; n < max; n++){
            let random = HMMath.randomIntFromInterval(start, Math.min(finish, this.road.segments.length - 100))
            let startSegment = this.road.segments[random]
            let z = startSegment.worldPoints.z
            let y = startSegment.worldPoints.y
            let roadLane = Road.ROAD_LANES[HMMath.randomIntFromInterval(0,3)]
            let sprite = null
            switch (type) {
                case this.CARS:
                    sprite = Images.racers[Math.floor(Math.random() * 8)]
                    this.road.totalCars.push(new Cars(sprite, roadLane, y,  z, Images.SPRITE_SIZE, this.road))
                    break;
                case this.ANIMALS:
                    sprite = null
                    let animalType = Math.floor(Math.random() * 2)
                    let x = Math.random()-2
                    this.road.totalAnimals.push(new Animals(null, x, y, z, Images.SPRITE_SIZE, this.road,animalType))
                    break;
                case this.OBSTACLES:
                    sprite = Game.stageObjects[startSegment.stage].OBSTACLES[Math.floor(Math.random() * 2)]
                    this.road.totalObstacles.push(new Obstacles(sprite, roadLane, y,  z, Images.SPRITE_SIZE*2, this.road))
                    break;
                case this.TRAFFIC:
                    sprite = Game.stageObjects[startSegment.stage].TRAFFIC[Math.floor(Math.random() * 5)]
                    this.road.totalTraffic.push(new Traffic(sprite, roadLane, y,  z, Images.SPRITE_SIZE*1.5, this.road))
                    break;
            }
        }
    }

    addItems(start, finish){
        let HMMath = HelperMethods.math
        let totalPatterns = Math.floor((finish - start)/(250))
        let startSegment = start
        for (let n = 0; n < totalPatterns ; n++){
            let currentPattern = this.coinPatterns[HMMath.randomIntFromInterval(0,10)]
            let roadLane = 0
            let segment = startSegment
            for (let i = 0; i < currentPattern.length; i ++){
                let z = this.road.segments[segment].worldPoints.z
                let y = this.road.segments[segment].worldPoints.y+64
                let roadLaneX = Road.ROAD_LANES[roadLane]
                if (currentPattern[i]){
                    this.road.totalCoins.push(new Coins(Images.coin1, roadLaneX, y, z, Images.SPRITE_SIZE, this.road))
                } else{
                    if (Math.random() > this.game.player.difficulty.POWER_UPS_CHANCE){
                        if (Math.random() > 0.5){
                            this.road.totalFuel.push(new Fuel(Images.gas1, roadLaneX, y, z, Images.SPRITE_SIZE, this.road))
                        } else {
                            let powerUpType = HMMath.randomIntFromInterval(6,9)
                            this.road.totalPowerUps.push(new PowerUps(null,roadLaneX, y, z, Images.SPRITE_SIZE, this.road, powerUpType))
                        }
                    }
                }
                roadLane++
                if (roadLane > 3){
                    roadLane = 0
                    segment +=20
                }
            }
            startSegment += 240
        }
    }

    // ---------------------------------------------------------------------------------
    // Set New Stage
    // ---------------------------------------------------------------------------------

    selectSegment(){
        this.game.selectSegment = this.road.segments.length
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG, Segment.YROAD);
        this.game.decideSegment = this.road.segments.length
        let z = this.road.segments[this.game.decideSegment-1].worldPoints.z
        let y = this.road.segments[this.game.decideSegment-1].worldPoints.y+64
        for (let lane in Road.ROAD_LANES){
            this.road.totalFuel.push(new Fuel(Images.gas1, Road.ROAD_LANES[lane], y, z, Images.SPRITE_SIZE, this.road))
        }
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG, Segment.TUNNEL)
        this.game.yRoadStartSegment = this.road.segments.length
    }

    selectStage(){
        let stages = [Game.FOREST, Game.BEACH, Game.CITY, Game.FARM, Game.SUBURB]
        if (stages.includes(this.game.currentStage)){
            stages = stages.filter(x => x!== this.game.currentStage)
        }
        let stageRight = stages[HelperMethods.math.randomIntFromInterval(0,stages.length-1)]
        stages = stages.filter(x => x!== stageRight)
        let stageLeft = stages[HelperMethods.math.randomIntFromInterval(0,stages.length-1)]
        this.game.nextRight = stageRight
        this.game.nextLeft = stageLeft
    }

    yRoadSegment(dir){
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.MEDIUM, Segment.TUNNEL);
        this.addYCurve(dir)
        this.game.newStageSegment = this.road.segments.length
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG, Segment.EMPTY)
        this.updateRoadSize()
    }

    newStageSegment(){
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.LONG, Segment.BILLBOARDS);
        this.addStraight(RoadConstructor.ROAD_SIZES.LENGTH.SHORT, Segment.REGULAR);
        this.addMoreRoad()
    }

}
