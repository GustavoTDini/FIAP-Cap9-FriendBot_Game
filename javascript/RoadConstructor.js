class RoadConstructor {

    CARS = 1
    TRAFFIC = 2
    ANIMALS = 3
    OBSTACLES = 4

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
            for (let n = 1; n < 2; n++){
                let random = randomIntFromInterval(0, 5)
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
        let lastY   = this.getLastY();
        let endY     = lastY + (toInt(y, 0) * SEGMENT_LENGTH);
        let n, total = enter + hold + leave;
        for(n = 0 ; n < enter ; n++){
            this.road.segments.push( new Segment(this.road.segments, smoothIn(0, curve, n/enter), smoothInOut(lastY, endY, n/total), this.road, stage, type, YRoad, n+1));
        }
        for(n = 0 ; n < hold  ; n++){
            this.road.segments.push( new Segment(this.road.segments, curve, smoothInOut(lastY, endY, (enter+n)/total), this.road, stage, type, YRoad, n+enter+1));
        }
        for(n = 0 ; n < leave ; n++){
            this.road.segments.push( new Segment(this.road.segments, smoothInOut(curve, 0, n/leave), smoothInOut(lastY, endY, (enter+hold+n)/total), this.road, stage, type,YRoad, n+hold + enter+1));
        }

    }

    updateRoadSize(){
        this.road.totalSegments = this.road.segments.length
        this.roadLength = this.road.totalSegments * SEGMENT_LENGTH;
    }

    // ---------------------------------------------------------------------------------
    // Add Road Pieces
    // ---------------------------------------------------------------------------------

    addStraight(num, type) {
        num = num || ROAD.LENGTH.MEDIUM;
        this.addMoreSegments(num, num, num, 0, 0, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addHill(num, height, type) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        height = height || ROAD.HILL.MEDIUM;
        this.addMoreSegments(num, num, num, 0, height, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addCurve(num, curve, height, type) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        curve  = curve  || ROAD.CURVE.MEDIUM;
        height = height || ROAD.HILL.NONE;
        this.addMoreSegments(num, num, num, curve, height, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addYCurve(dir) {
        this.addMoreSegments(ROAD.LENGTH.LONG, ROAD.LENGTH.LONG, ROAD.LENGTH.LONG, dir*ROAD.CURVE.MEDIUM, ROAD.HILL.NONE, this.game.currentStage, Segment.EMPTY, true);
        this.updateRoadSize()
    }

    addLowRollingHills(type) {
        let num = ROAD.LENGTH.SHORT;
        let height = ROAD.HILL.LOW;
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0, -height, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  height, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage, type, false);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    addSCurves(type) {
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.NONE, this.game.currentStage, type, false);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.MEDIUM,  ROAD.HILL.MEDIUM, this.game.currentStage, type, false);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.EASY,   -ROAD.HILL.LOW, this.game.currentStage, type, false);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.MEDIUM, this.game.currentStage, type, false);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM, this.game.currentStage, type, false);
        this.updateRoadSize()
    }

    // ---------------------------------------------------------------------------------
    // Segments
    // ---------------------------------------------------------------------------------

    StartSegment(){
        this.addStraight(ROAD.LENGTH.LONG, Segment.BILLBOARDS)
        this.addStraight(ROAD.LENGTH.LONG*2, Segment.REGULAR)
    }

    hillsSegment(){
        let startSegment = this.road.segments.length
        this.addHill(ROAD.LENGTH.SHORT, ROAD.HILL.LOW, Segment.REGULAR);
        this.addLowRollingHills(Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW, Segment.REGULAR);
        this.addLowRollingHills(Segment.REGULAR);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
    }
    curvesSegment(){
        let startSegment = this.road.segments.length
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(null, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM, Segment.REGULAR);
        let finalSegment = this.road.segments.length- 500
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    animalSegment() {
        let startSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.SHORT, Segment.ANIMALS);
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW, Segment.REGULAR);
        this.addHill(ROAD.LENGTH.LONG, -ROAD.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(ROAD.LENGTH.SHORT, Segment.ANIMALS);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.ANIMALS)
    }

    sCurveSegment(){
        let startSegment = this.road.segments.length
        this.addCurve(null, null, null, Segment.REGULAR);
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM, Segment.REGULAR);
        this.addStraight(ROAD.LENGTH.SHORT, Segment.REGULAR);
        let finalSegment = this.road.segments.length - 500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
    }

    crazySegment(){
        let startSegment = this.road.segments.length
        this.addSCurves(Segment.REGULAR);
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW, Segment.REGULAR);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM, Segment.REGULAR);
        this.addHill(ROAD.LENGTH.LONG, -ROAD.HILL.HIGH, Segment.REGULAR);
        this.addSCurves(Segment.REGULAR)
        this.addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, -ROAD.HILL.HIGH, Segment.REGULAR);
        let finalSegment = this.road.segments.length-500
        this.addObstacles(startSegment, finalSegment, this.OBSTACLES)
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    straightSegment(){
        let startSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.LONG*7, Segment.REGULAR);
        let finalSegment = this.road.segments.length-500
        this.addObstacles(startSegment, finalSegment, this.TRAFFIC)
    }

    // ---------------------------------------------------------------------------------
    // Add Objects
    // ---------------------------------------------------------------------------------

    addObstacles(start, finish, type){
        let max = type === this.CARS? this.game.player.difficulty.MAX_CARS : this.game.player.difficulty.MAX_OBSTACLES
        for (let n = 0; n < max; n++){
            let random = randomIntFromInterval(start, Math.min(finish, this.road.segments.length - 100))
            let startSegment = this.road.segments[random]
            let z = startSegment.worldPoints.z
            let y = startSegment.worldPoints.y
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let sprite = null
            switch (type) {
                case this.CARS:
                    sprite = racers[Math.floor(Math.random() * 8)]
                    this.road.totalCars.push(new Cars(sprite, roadLane, y,  z, SPRITE_SIZE, this.road))
                    break;
                case this.ANIMALS:
                    sprite = null
                    let animalType = Math.floor(Math.random() * 2)
                    let x = Math.random()-2
                    this.road.totalAnimals.push(new Animals(null, x, y, z, SPRITE_SIZE, this.road,animalType))
                    break;
                case this.OBSTACLES:
                    sprite = stageObjects[startSegment.stage].OBSTACLES[Math.floor(Math.random() * 2)]
                    this.road.totalObstacles.push(new Obstacles(sprite, roadLane, y,  z, SPRITE_SIZE*2, this.road))
                    break;
                case this.TRAFFIC:
                    sprite = stageObjects[startSegment.stage].TRAFFIC[Math.floor(Math.random() * 5)]
                    this.road.totalTraffic.push(new Traffic(sprite, roadLane, y,  z, SPRITE_SIZE*1.5, this.road))
                    break;
            }
        }
    }

    addItems(start, finish){
        let totalPatterns = Math.floor((finish - start)/(250))
        let startSegment = start
        for (let n = 0; n < totalPatterns ; n++){
            let currentPattern = this.coinPatterns[randomIntFromInterval(0,10)]
            let roadLane = 0
            let segment = startSegment
            for (let i = 0; i < currentPattern.length; i ++){
                let z = this.road.segments[segment].worldPoints.z
                let y = this.road.segments[segment].worldPoints.y+100
                let roadLaneX = ROAD_LANES[roadLane]
                if (currentPattern[i]){
                    this.road.totalCoins.push(new Coins(coin1, roadLaneX, y, z, SPRITE_SIZE, this.road))
                } else{
                    if (Math.random() > 0.95){
                        if (Math.random() > 0.5){
                            this.road.totalFuel.push(new Fuel(gas1, roadLaneX, y, z, SPRITE_SIZE, this.road))
                        } else {
                            let powerUpType = randomIntFromInterval(6,9)
                            this.road.totalPowerUps.push(new PowerUps(null,roadLaneX, y, z, SPRITE_SIZE, this.road, powerUpType))
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
        this.addStraight(ROAD.LENGTH.MEDIUM, Segment.YROAD);
        this.game.decideSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.LONG, Segment.TUNNEL)
        this.game.yRoadStartSegment = this.road.segments.length
    }

    // TODO - Add Change Screen GUI
    selectStage(){
        let stages = [FOREST, BEACH, CITY, FARM]
        if (stages.includes(this.game.currentStage)){
            stages = stages.filter(x => x!== this.game.currentStage)
        }
        let stageRight = stages[randomIntFromInterval(0,stages.length-1)]
        stages = stages.filter(x => x!== stageRight)
        let stageLeft = stages[randomIntFromInterval(0,stages.length-1)]
        this.game.nextRight = stageRight
        this.game.nextLeft = stageLeft
    }

    yRoadSegment(dir){
        this.addStraight(ROAD.LENGTH.MEDIUM, Segment.TUNNEL);
        this.addYCurve(dir)
        this.game.newStageSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.LONG*2, Segment.EMPTY)
        this.updateRoadSize()
    }

    newStageSegment(){
        this.addStraight(ROAD.LENGTH.LONG, Segment.BILLBOARDS);
        this.addStraight(ROAD.LENGTH.LONG*4, Segment.REGULAR);
        this.addMoreRoad()
    }

}
