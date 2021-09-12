// Classe com os atributos da camera para calculo dos pontos da tela
class Camera {

    constructor(game){
        this.x = 0;
        this.y = 1000;
        this.z = 0;
        this.distToPlayer = 1000;
        this.distToPlane = null;
        this.drawDistance = 150;
        this.cameraHeight  = 1000;
        this.fogDensity    = 5;
        this.game = game
    }

    init(){
        this.distToPlane = 1 / (this.y / this.distToPlayer);
    }

    update(){
        let player = this.game.player
        let road = this.game.road

        this.z = -this.distToPlayer;
        this.x = player.x * road.roadWidth;
        let YSegment = road.findSegment(player.z)
        this.y = (YSegment.worldPoints.y + 1000)

        this.z = player.z - this.distToPlayer;

        if (this.z<0) this.z += road.roadLength;
    }
}

// Classe com os atributos de cada segmento da estrada a serem renderizados
class Segment {

    constructor(segments, curve, y, road){
        this.road = road
        this.index = segments.length;
        this.worldPoints = {x: 0, y:y, z: this.index*SEGMENT_LENGTH}
        this.screenPoints = {x:0, y:0, w:0}
        this.lastScreenPoints = {x:0, y:0, w:0}
        this.maxHeight = CANVAS_HEIGHT
        this.scale = -1;
        this.curve = curve
        this.color = this.getColors(this.index)
        this.roadSideObjects = []
        this.inRoadObjects = []
    }

    getColors(index) {
        let colorIndex = index%3
        switch (colorIndex){
            case 0:
                return COLORS.LIGHT
            case 1:
                return COLORS.DARK
            case 2:
                return COLORS.DARKER
        }
    }
}

// classe que define a estrada a ser percorrida
class Road {

    constructor(game) {
        this.game = game
        this.segments = []
        this.totalSegments = null
        this.roadLength = null;
        this.roadWidth = MAX_ROAD_WIDTH;
        this.totalCars = [];
        this.totalTraffic = [];
        this.totalCoins = [];
    }

    render(ctx) {
        let gameCamera = this.game.gameCamera

        let baseSegment = this.findSegment(gameCamera.z);
        let baseSegmentIndex = baseSegment.index;
        let basePercent   = percentageLeft(gameCamera.z, SEGMENT_LENGTH);
        let x  = 0;
        let dx = - (baseSegment.curve * basePercent);
        let maxBottomLine        = CANVAS_HEIGHT;

        for (let n=0; n<gameCamera.drawDistance; n++){
            // get the current segment
            let currIndex = (baseSegmentIndex + n) % this.totalSegments;
            let currSegment = this.segments[currIndex];
            let offsetZ = (currIndex < baseSegmentIndex) ? this.roadLength : 0;
            // project the segment to the screen space
            currSegment.screenPoints = this.project3D(currSegment, gameCamera, offsetZ, x);
            currSegment.lastScreenPoints = this.correctedLastPoints(currIndex)
            currSegment.maxHeight = maxBottomLine
            // draw this segment only if it is above the clipping bottom line
            let currBottomLine = currSegment.screenPoints.y;
            x  = x + dx;
            dx = dx + currSegment.curve;

            if ((currSegment.screenPoints.z <= gameCamera.distToPlayer) ||
                (currSegment.screenPoints.y >= maxBottomLine))
                continue;

            if (n>0 && currBottomLine < maxBottomLine){

                let screenPoints = currSegment.screenPoints;
                let lastScreenPoints = currSegment.lastScreenPoints

                    this.renderSegment(
                        lastScreenPoints.x, lastScreenPoints.y, lastScreenPoints.w,
                        screenPoints.x, screenPoints.y, screenPoints.w,
                        currSegment.color, ctx
                    );
                // move the clipping bottom line up
                maxBottomLine = currBottomLine;
            }
        }

        for(let n = (gameCamera.drawDistance-1) ; n >= 0 ; n--) {
            let currIndex = (baseSegmentIndex + n) % this.totalSegments;
            let currSegment = this.segments[currIndex];

            for(let i = 0 ; i < currSegment.roadSideObjects.length ; i++) {
                let sideObject = currSegment.roadSideObjects[i]
                let spriteScale = currSegment.scale*2;
                let x     = currSegment.screenPoints.x + currSegment.screenPoints.w*currSegment.roadSideObjects[i].x
                let y     = currSegment.screenPoints.y;
                sideObject.render(ctx, spriteScale, x, y, currSegment.maxHeight)
            }
            for(let j = 0 ; j < currSegment.inRoadObjects.length ; j++) {
                let car = currSegment.inRoadObjects[j]
                let spriteScale = currSegment.scale;
                let x     = currSegment.screenPoints.x + currSegment.screenPoints.w*currSegment.inRoadObjects[j].x
                let y     = currSegment.screenPoints.y;
                car.render(ctx, spriteScale, x, y, currSegment.maxHeight)
            }

        }

    }

    update(dt) {
        let player = this.game.player

        let playerSegment = this.findSegment(player.z);

        let centrifugal = 0.06;
        let currentCurve = playerSegment.curve
        if (currentCurve){
            this.game.player.lanes = ROAD_LANES.map(x => x + currentCurve*centrifugal);
        } else {
            this.game.player.lanes = ROAD_LANES
        }
        for (let j = 0; j< this.segments.length; j++){
            this.segments[j].inRoadObjects = []
        }
        for (let i = 0; i < this.totalCars.length; i++){
            let carSegment = this.findSegment(this.totalCars[i].z)
            carSegment.inRoadObjects.push(this.totalCars[i])
            this.totalCars[i].update(dt)
        }
        for (let i = 0; i < this.totalTraffic.length; i++){
            let trafficSegment = this.findSegment(this.totalTraffic[i].z)
            trafficSegment.inRoadObjects.push(this.totalTraffic[i])
            this.totalTraffic[i].update(dt)
        }
        for (let i = 0; i < this.totalCoins.length; i++){
            let coinSegment = this.findSegment(this.totalCoins[i].z)
            coinSegment.inRoadObjects.push(this.totalCoins[i])
            this.totalCoins[i].update(dt)
        }
    }

    findSegment(z) {
        return this.segments[Math.floor(z/SEGMENT_LENGTH) % this.segments.length];
    }

    createRoad() {
        this.addStraight(ROAD.LENGTH.SHORT/2);
        this.addHill(ROAD.LENGTH.SHORT, ROAD.HILL.LOW);
        this.addLowRollingHills();
        this.addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW);
        this.addLowRollingHills();
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        this.addStraight();
        this.addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
        this.addHill(ROAD.LENGTH.LONG, -ROAD.HILL.MEDIUM);
        this.addStraight();
        this.addDownhillToEnd();
        this.totalSegments = this.segments.length
        this.roadLength = this.totalSegments * SEGMENT_LENGTH;
        this.addSprites()
        this.addCars()
        this.addTraffic()
        this.addCoins()
    }

    getLastY() { return (this.segments.length === 0) ? 0 : this.segments[this.segments.length-1].worldPoints.y; }

    addMoreSegments(enter, hold, leave, curve, y) {
        let lastY   = this.getLastY();
        let endY     = lastY + (toInt(y, 0) * SEGMENT_LENGTH);
        let n, total = enter + hold + leave;
        for(n = 0 ; n < enter ; n++)
            this.segments.push( new Segment(this.segments, smoothIn(0, curve, n/enter), smoothInOut(lastY, endY, n/total), this));
        for(n = 0 ; n < hold  ; n++)
            this.segments.push( new Segment(this.segments, curve, smoothInOut(lastY, endY, (enter+n)/total), this));
        for(n = 0 ; n < leave ; n++)
            this.segments.push( new Segment(this.segments, smoothInOut(curve, 0, n/leave), smoothInOut(lastY, endY, (enter+hold+n)/total), this));
    }

    addStraight(num) {
        num = num || ROAD.LENGTH.MEDIUM;
        this.addMoreSegments(num, num, num, 0, 0);
    }

    addHill(num, height) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        height = height || ROAD.HILL.MEDIUM;
        this.addMoreSegments(num, num, num, 0, height);
    }

    addCurve(num, curve, height) {
        num    = num    || ROAD.LENGTH.MEDIUM;
        curve  = curve  || ROAD.CURVE.MEDIUM;
        height = height || ROAD.HILL.NONE;
        this.addMoreSegments(num, num, num, curve, height);
    }

    addLowRollingHills(num, height) {
        num    = num    || ROAD.LENGTH.SHORT;
        height = height || ROAD.HILL.LOW;
        this.addMoreSegments(num, num, num,  0,  height/2);
        this.addMoreSegments(num, num, num,  0, -height);
        this.addMoreSegments(num, num, num,  0,  height);
        this.addMoreSegments(num, num, num,  0,  0);
        this.addMoreSegments(num, num, num,  0,  height/2);
        this.addMoreSegments(num, num, num,  0,  0);
    }

    addSCurves() {
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.NONE);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.MEDIUM,  ROAD.HILL.MEDIUM);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.EASY,   -ROAD.HILL.LOW);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.MEDIUM);
        this.addMoreSegments(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM);
    }

    addSprites(){
            for (let n = 0; n < this.segments.length; n++){
                if (Math.random() > 0.8) {
                    let spriteInt = Math.floor(Math.random() * 5)
                    let x = -1.5;
                    if (Math.random() > 0.5) {
                        x = 1.5
                    }
                    this.segments[n].roadSideObjects.push(new SideObjects(roadSidesSprites[spriteInt], x, this.segments[n].worldPoints.y, LARGE_SPRITE_SIZE, this))
                }
            }
        }

    addCars(){
        for (let n = 0; n < 200; n++){
            let spriteInt = Math.floor(Math.random() * 5)
            let speed = (Math.random()*(MAX_SPEED*0.4 - MAX_SPEED*0.1)) + MAX_SPEED*0.1
            let z = Math.random()*this.roadLength
            let startSegment = this.findSegment(z)
            this.totalCars.push(new Cars(racers[spriteInt], ROAD_LANES[Math.floor(Math.random()*4)], startSegment.worldPoints.y,  speed, z, SPRITE_SIZE, this))
        }
    }

    addTraffic(){
        for (let n = 0; n < 50 ; n++){
            let speed = (Math.random()*(MAX_SPEED*0.4 - MAX_SPEED*0.1)) + MAX_SPEED*0.1
            let z = Math.random()*this.roadLength
            let startSegment = this.findSegment(z)
            this.totalTraffic.push(new Traffic(jeep, ROAD_LANES[Math.floor(Math.random()*4)], startSegment.worldPoints.y,  speed, z, SPRITE_SIZE, this))
        }
    }

    addCoins(){
        for (let n = 0; n < 500 ; n++){
            let z = Math.random()*this.roadLength
            let startSegment = this.findSegment(z)
            this.totalCoins.push(new Coins(coin1, ROAD_LANES[Math.floor(Math.random()*4)], startSegment.worldPoints.y+50, z, SPRITE_SIZE, this))
        }
    }


    addDownhillToEnd(num) {
        num = num || 200;
        this.addMoreSegments(num, num, num, -ROAD.CURVE.EASY, -this.getLastY()/SEGMENT_LENGTH);
    }

    // Função para fazer a projeção dos pontos em 3D - usa a regra dos triangulos iguais
    project3D(segment, camera, offSetZ, xCurve){
        // definimos as distancias em relação a camera
        let transX = segment.worldPoints.x - (camera.x - xCurve);
        let transY = segment.worldPoints.y - camera.y;
        let transZ = segment.worldPoints.z - camera.z - offSetZ;

        // escalamos com base nos triangulos iguais
        segment.scale = camera.distToPlane/transZ;

        // definimos esses pontos no plano cartesiano utilizando a escala
        let projectedX = segment.scale * transX;
        let projectedY = segment.scale * transY;
        let projectedW = segment.scale * this.roadWidth;

        // utilizando a pontos do plano, e o tamanho da tela - definimos os segmentos na Canvas
        let x = Math.round((1 + projectedX) * CANVAS_CENTER_X);
        let y = Math.round((1 - projectedY) * CANVAS_CENTER_Y);
        let w = Math.round(projectedW * CANVAS_CENTER_X);
        return {x:x, y:y, w:w}
    }

    correctedLastPoints(currIndex){
        return (currIndex === 0) ? {x: 0, y: 0, w: 0} : this.segments[currIndex - 1].screenPoints;
    }


    renderSegment(x1, y1, w1, x2, y2, w2, color, ctx){
        let linesWidth1 = w1/20
        let linesWidth2 = w2/20
        let lineDistance1 = w1/2.5
        let lineDistance2 = w2/2.5
        ctx.fillStyle = color.grass
        ctx.fillRect(0, y2, CANVAS_WIDTH, y1 - y2);
        // draw road
        drawPolygon(x1-w1, y1,	x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road, ctx);
        create3dRoad(roadTextures[Math.floor(Math.random()*5)], x1, y1, w1, x2, y2, w2, ctx);
        drawPolygon(x1-w1, y1,	x1-w1+linesWidth1, y1, x2-w2+linesWidth2, y2, x2-w2, y2, color.shoulder, ctx);
        drawPolygon(x1+w1-linesWidth1, y1,	x1+w1, y1, x2+w2, y2, x2+w2-linesWidth2, y2, color.shoulder, ctx);
        if (color.lane){
            drawPolygon(x1+(linesWidth1/2), y1,	x1-(linesWidth1/2), y1, x2-(linesWidth2/2), y2, x2+(linesWidth2/2), y2, color.lane, ctx);
            drawPolygon(x1+lineDistance1, y1,	x1+lineDistance1+linesWidth1, y1, x2+lineDistance2+linesWidth2, y2, x2+lineDistance2, y2, color.lane, ctx);
            drawPolygon(x1-lineDistance1, y1,	x1-lineDistance1-linesWidth1, y1, x2-lineDistance2-linesWidth2, y2, x2-lineDistance2, y2, color.lane, ctx);
        }


    }
}



