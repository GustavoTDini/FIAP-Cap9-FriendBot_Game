class RoadConstructor {

    constructor(road, game) {
        this.road = road
        this.game = game
    }

//TODO - fazer um editor de pista melhor

    // ---------------------------------------------------------------------------------
    // Road Constructor
    // ---------------------------------------------------------------------------------

    createRoad() {
        this.StartSegment()
        this.addHill()
        this.hillsSegment()
        this.curvesSegment()
        this.animalSegment()
        this.addSCurves();
        this.addDownhillToEnd();
        this.crazySegment()
        this.road.totalSegments = this.road.segments.length
        this.road.roadLength = this.road.totalSegments * SEGMENT_LENGTH;
        this.addCars(500, this.road.totalSegments-100)
        this.addCoins(100, this.road.totalSegments-100)
        this.addPowerUps(100, this.road.totalSegments-100)
        this.addFuel(100, this.road.totalSegments - 100)
        this.addAnimals(500, this.road.totalSegments - 100)
    }

    addMoreRoad(){
        if (this.game.player.currentSegment.index > this.road.totalSegments -1000){
            let startSegment = this.road.segments.length
            for (let n = 1; n < 20; n++){
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
                this.road.totalSegments = this.road.segments.length
                this.roadLength = this.road.totalSegments * SEGMENT_LENGTH;
                this.addCoins(startSegment, this.road.totalSegments-1)
                this.addPowerUps(startSegment, this.road.totalSegments-1)
            }
        }
    }

    getLastY() { return (this.road.segments.length === 0) ? 0 : this.road.segments[this.road.segments.length-1].worldPoints.y; }

    addMoreSegments(enter, hold, leave, curve, y, stage) {
        let lastY   = this.getLastY();
        let endY     = lastY + (toInt(y, 0) * SEGMENT_LENGTH);
        let n, total = enter + hold + leave;
        for(n = 0 ; n < enter ; n++)
            this.road.segments.push( new Segment(this.road.segments, smoothIn(0, curve, n/enter), smoothInOut(lastY, endY, n/total), this.road, stage));
        for(n = 0 ; n < hold  ; n++)
            this.road.segments.push( new Segment(this.road.segments, curve, smoothInOut(lastY, endY, (enter+n)/total), this.road, stage));
        for(n = 0 ; n < leave ; n++)
            this.road.segments.push( new Segment(this.road.segments, smoothInOut(curve, 0, n/leave), smoothInOut(lastY, endY, (enter+hold+n)/total), this.road, stage));
    }

    // ---------------------------------------------------------------------------------
    // Add Road Pieces
    // ---------------------------------------------------------------------------------

    addStraight(num) {
        num = num || ROAD.LENGTH.MEDIUM;
        this.addMoreSegments(num, num, num, 0, 0, this.game.currentStage);
    }

    addHill(num, height) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        height = height || ROAD.HILL.MEDIUM;
        this.addMoreSegments(num, num, num, 0, height, this.game.currentStage);
    }

    addCurve(num, curve, height) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        curve  = curve  || ROAD.CURVE.MEDIUM;
        height = height || ROAD.HILL.NONE;
        this.addMoreSegments(num, num, num, curve, height, this.game.currentStage);
    }

    addLowRollingHills(num, height) {
        num    = num    || ROAD.LENGTH.SHORT;
        height = height || ROAD.HILL.LOW;
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage);
        this.addMoreSegments(num, num, num,  0, -height, this.game.currentStage);
        this.addMoreSegments(num, num, num,  0,  height, this.game.currentStage);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage);
        this.addMoreSegments(num, num, num,  0,  height/2, this.game.currentStage);
        this.addMoreSegments(num, num, num,  0,  0, this.game.currentStage);
    }

    addSCurves() {
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.NONE, this.game.currentStage);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.MEDIUM,  ROAD.HILL.MEDIUM, this.game.currentStage);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.EASY,   -ROAD.HILL.LOW, this.game.currentStage);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.MEDIUM, this.game.currentStage);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM, this.game.currentStage);
    }

    addDownhillToEnd(num) {
        num = num || 200;
        this.addMoreSegments(num, num, num, -ROAD.CURVE.EASY, -this.getLastY()/SEGMENT_LENGTH, this.game.currentStage);
    }

    // ---------------------------------------------------------------------------------
    // Segments
    // ---------------------------------------------------------------------------------

    StartSegment(){
        let startSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.LONG*2)
        this.addSprites(startSegment ,  ROAD.LENGTH.LONG, billboards[0])
        this.addSprites(startSegment, ROAD.LENGTH.LONG, billboards[1])
        this.addSprites(startSegment, ROAD.LENGTH.LONG, billboards[2])
    }

    hillsSegment(){
        let startSegment = this.road.segments.length
        this.addHill(ROAD.LENGTH.SHORT, ROAD.HILL.LOW);
        this.addLowRollingHills();
        this.addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW);
        this.addLowRollingHills();
        let finalSegment = this.road.segments.length
        this.addObstacles(startSegment, finalSegment)
    }
    curvesSegment(){
        let startSegment = this.road.segments.length
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        this.addStraight();
        this.addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        let finalSegment = this.road.segments.length
        this.addTraffic(startSegment, finalSegment)
    }

    animalSegment() {
        let startSegment = this.road.segments.length
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
        this.addHill(ROAD.LENGTH.LONG, -ROAD.HILL.MEDIUM);
        this.addStraight();
        let finalSegment = this.road.segments.length
        this.addAnimals(startSegment, finalSegment)
    }

    sCurveSegment(){
        let startSegment = this.road.segments.length
        this.addSCurves();
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        this.addStraight();
        let finalSegment = this.road.segments.length
        this.addObstacles(startSegment, finalSegment)
    }

    crazySegment(){
        let startSegment = this.road.segments.length
        this.addSCurves();
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        this.addHill(ROAD.LENGTH.LONG, -ROAD.HILL.HIGH);
        this.addSCurves()
        this.addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, -ROAD.HILL.HIGH);
        let finalSegment = this.road.segments.length
        this.addObstacles(startSegment, finalSegment)
        this.addTraffic(startSegment, finalSegment)

    }

    straightSegment(){
        let startSegment = this.road.segments.length
        this.addStraight(ROAD.LENGTH.LONG*3);
        let finalSegment = this.road.segments.length
    }

    // ---------------------------------------------------------------------------------
    // Add Objects
    // ---------------------------------------------------------------------------------

    addSprites(start, finish, sprite){
        for (let n = start; n < finish; n++){
            if (Math.random() > 0.8) {
                let x = -1.5;
                if (Math.random() > 0.5) {
                    x = 1.5
                }
                let segment = this.road.segments[n]
                let y = segment.worldPoints.y
                let z = segment.worldPoints.z
                segment.roadSideObjects.push(new SideObjects(sprite, x, y, z, LARGE_SPRITE_SIZE, this.road))
            }
        }
    }

    addCars(start, finish){
        for (let n = 0; n < 50; n++){
            let spriteInt = Math.floor(Math.random() * 8)
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let y = startSegment.worldPoints.y
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let sprite = racers[spriteInt]
            this.road.totalCars.push(new Cars(sprite, roadLane, y,  z, SPRITE_SIZE, this.road))
        }
    }

    addTraffic(start, finish){
        for (let n = 0; n < 20; n++){
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let y = startSegment.worldPoints.y
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let trafficColor = Math.floor(Math.random() * 5)
            let sprite = stageObjects[startSegment.stage].TRAFFIC[trafficColor]
            this.road.totalTraffic.push(new Traffic(sprite, roadLane, y,  z, SPRITE_SIZE*2, this.road))
        }
    }

    addCoins(start, finish){
        let totalPatterns = Math.floor((finish - start)/(250))
        let startSegment = start
        for (let n = 0; n < totalPatterns ; n++){
            let currentPattern = coinPatterns[randomIntFromInterval(0,10)]
            let roadLane = 0
            let segment = startSegment
            for (let i = 0; i < currentPattern.length; i ++){
                let z = this.road.segments[segment].worldPoints.z
                let y = this.road.segments[segment].worldPoints.y+100
                let roadLaneX = ROAD_LANES[roadLane]
                currentPattern[i] && this.road.totalCoins.push(new Coins(coin1, roadLaneX, y, z, SPRITE_SIZE*0.7, this.road))
                roadLane++
                if (roadLane > 3){
                    roadLane = 0
                    segment +=20
                }
            }
            startSegment += 240
        }
    }

    addFuel(start, finish){
        for (let n = 0; n < 50 ; n++){
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let y = startSegment.worldPoints.y+100
            this.road.totalFuel.push(new Fuel(gas1, roadLane, y, z, SPRITE_SIZE, this.road))
        }
    }

    addPowerUps(start, finish){
        for (let n = 0; n < 10 ; n++){
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let y = startSegment.worldPoints.y+100
            let type = randomIntFromInterval(6,9)
            this.road.powerUps.push(new PowerUps(null,roadLane, y, z, SPRITE_SIZE, this.road,type))
        }
    }

    addObstacles(start, finish){
        for (let n = 0; n < 10 ; n++){
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let type = Math.floor(Math.random() * 2)
            let roadLane = ROAD_LANES[randomIntFromInterval(0,3)]
            let y = startSegment.worldPoints.y+100
            let sprite = stageObjects[startSegment.stage].OBSTACLES[type]
            this.road.obstacles.push(new Obstacles(sprite, roadLane, y, z, SPRITE_SIZE*2, this.road ))
        }
    }

    addAnimals(start, finish){
        for (let n = 0; n < 50 ; n++){
            let startSegment = this.road.segments[randomIntFromInterval(start, finish)]
            let z = startSegment.worldPoints.z
            let type = Math.floor(Math.random() * 2)
            let y = startSegment.worldPoints.y+100
            let x = Math.random()-2
            this.road.animals.push(new Animals(null, x, y, z, SPRITE_SIZE, this.road,type))
        }
    }

}
