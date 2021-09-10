// Classe com os atributos da camera para calculo dos pontos da tela
class Camera {

    constructor(game){
        this.x = 0;
        this.y = 1000;
        this.z = 0;
        this.distToPlayer = 1000;
        this.distToPlane = null;
        this.drawDistace = 150;
        this.cameraHeight  = 1000;
        this.cameraDepth   = null;
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
        this.worldPoints = {x: 0, y:y, z: this.index*road.segmentLength}
        this.screenPoints = {x:0, y:0, w:0}
        this.lastScreenPoints = {x:0, y:0, w:0}
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
        this.roadWidth = 1000;
        this.segmentLength = 100;
    }

    render(ctx) {
        let gameCamera = this.game.gameCamera

        let baseSegment = this.findSegment(gameCamera.z);
        let baseSegmentIndex = baseSegment.index;
        let basePercent   = percentageLeft(gameCamera.z, this.segmentLength);

        let x  = 0;
        let dx = - (baseSegment.curve * basePercent);

        let maxBottomLine        = CANVAS_HEIGHT;
        for (let n=0; n<gameCamera.drawDistace; n++){
            // get the current segment
            let currIndex = (baseSegmentIndex + n) % this.totalSegments;
            let currSegment = this.segments[currIndex];
            let offsetZ = (currIndex < baseSegmentIndex) ? this.roadLength : 0;
            // project the segment to the screen space
            currSegment.screenPoints = this.project3D(currSegment, gameCamera, offsetZ, x);
            currSegment.lastScreenPoints = this.correctedLastPoints(currIndex)
            // draw this segment only if it is above the clipping bottom line
            let currBottomLine = currSegment.screenPoints.y;
            x  = x + dx;
            dx = dx + currSegment.curve;
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
        console.log(this.game.player.lanes)
    }

    findSegment(z) {
        return this.segments[Math.floor(z/this.segmentLength) % this.segments.length];
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
        this.roadLength = this.totalSegments * this.segmentLength;
    }

    getLastY() { return (this.segments.length === 0) ? 0 : this.segments[this.segments.length-1].worldPoints.y; }

    addMoreSegments(enter, hold, leave, curve, y) {
        let lastY   = this.getLastY();
        let endY     = lastY + (toInt(y, 0) * this.segmentLength);
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

    addDownhillToEnd(num) {
        num = num || 200;
        this.addMoreSegments(num, num, num, -ROAD.CURVE.EASY, -this.getLastY()/this.segmentLength);
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
        create3dRoad(roadTextures[Math.floor(Math.random()*5)],grassTextures[color.grassTexture], x1, y1, w1, x2, y2, w2, ctx, color.road);
        drawPolygon(x1-w1, y1,	x1-w1+linesWidth1, y1, x2-w2+linesWidth2, y2, x2-w2, y2, color.shoulder, ctx);
        drawPolygon(x1+w1-linesWidth1, y1,	x1+w1, y1, x2+w2, y2, x2+w2-linesWidth2, y2, color.shoulder, ctx);
        if (color.lane){
            drawPolygon(x1+(linesWidth1/2), y1,	x1-(linesWidth1/2), y1, x2-(linesWidth2/2), y2, x2+(linesWidth2/2), y2, color.lane, ctx);
            drawPolygon(x1+lineDistance1, y1,	x1+lineDistance1+linesWidth1, y1, x2+lineDistance2+linesWidth2, y2, x2+lineDistance2, y2, color.lane, ctx);
            drawPolygon(x1-lineDistance1, y1,	x1-lineDistance1-linesWidth1, y1, x2-lineDistance2-linesWidth2, y2, x2-lineDistance2, y2, color.lane, ctx);
        }


    }
}



