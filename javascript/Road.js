// classe que define a estrada a ser percorrida
class Road {

    constructor(game) {
        this.game = game
        this.segments = []
        this.totalSegments = null
        this.roadLength = null;
        this.roadWidth = MAX_ROAD_WIDTH;
        this.roadConstructor = new RoadConstructor(this, game)
        this.totalCars = [];
        this.totalTraffic = [];
        this.totalCoins = [];
        this.totalFuel = []
        this.powerUps = [];
        this.obstacles = []
        this.animals = []
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
                        currSegment.color, ctx, currSegment.stage, currSegment.texture
                    );
                // move the clipping bottom line up
                maxBottomLine = currBottomLine;
            }
        }

        for(let n = (gameCamera.drawDistance-1) ; n >= 0 ; n--) {
            let currIndex = (baseSegmentIndex + n) % this.totalSegments;
            let currSegment = this.segments[currIndex];
            let maxBottomLine = CANVAS_HEIGHT;
            for (let j=0; j<n; j++){
                let maxLineIndex = (baseSegmentIndex + n) % this.totalSegments;
                maxBottomLine = Math.min(maxBottomLine, this.segments[maxLineIndex].maxHeight)
            }
            for(let i = 0 ; i < currSegment.roadSideObjects.length ; i++) {
                currSegment.roadSideObjects[i].render(ctx, maxBottomLine)
            }
            for(let j = 0 ; j < currSegment.inRoadObjects.length ; j++) {
                currSegment.inRoadObjects[j].render(ctx, maxBottomLine)
            }

        }

    }

    update(dt) {
        let player = this.game.player

        let playerSegment = this.findSegment(player.z);

        let centrifugal = 30;
        let currentCurve = playerSegment.curve
        if (currentCurve){
            this.game.player.screen.x =  CANVAS_CENTER_X - SPRITE_SIZE/2 + currentCurve*centrifugal
        } else {
            this.game.player.screen.x =  CANVAS_CENTER_X - SPRITE_SIZE/2
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
        for (let i = 0; i < this.powerUps.length; i++){
            let upSegment = this.findSegment(this.powerUps[i].z)
            upSegment.inRoadObjects.push(this.powerUps[i])
            this.powerUps[i].update(dt)
        }
        for (let i = 0; i < this.obstacles.length; i++){
            let obstaclesSegment = this.findSegment(this.obstacles[i].z)
            obstaclesSegment.inRoadObjects.push(this.obstacles[i])
            this.obstacles[i].update(dt)
        }
        for (let i = 0; i < this.animals.length; i++){
            let animalSegment = this.findSegment(this.animals[i].z)
            animalSegment.inRoadObjects.push(this.animals[i])
            this.animals[i].update(dt)
        }

        for (let i = 0; i < this.totalFuel.length; i++){
            let fuelSegment = this.findSegment(this.totalFuel[i].z)
            fuelSegment.inRoadObjects.push(this.totalFuel[i])
            this.totalFuel[i].update(dt)
        }
        this.roadConstructor.addMoreRoad()
    }

    findSegment(z) {
        return this.segments[Math.floor(z/SEGMENT_LENGTH) % this.segments.length];
    }

    // Função para fazer a projeção dos pontos em 3D - usa a regra dos triangulos iguais
    project3D(segment, camera, offSetZ, xCurve){
        // definimos as distancias em relação a camera
        let transX = segment.worldPoints.x - (camera.x - xCurve);
        let transY = segment.worldPoints.y - camera.y;
        let transZ = segment.worldPoints.z - (camera.z - offSetZ);

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

    renderSegment(x1, y1, w1, x2, y2, w2, color, ctx, stage, texture){
        let linesWidth1 = w1/20
        let linesWidth2 = w2/20
        let lineDistance1 = w1/2.5
        let lineDistance2 = w2/2.5
        //ctx.fillStyle = color.grass
        ctx.fillStyle = ctx.createPattern(stageObjects[stage].SIDE_TEXTURES[color.grassTextures], "repeat")
        ctx.fillRect(0, y2-1, CANVAS_WIDTH, y1 - y2);
        // draw road
        ctx.restore()
        drawPolygon(x1-w1, y1,	x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road, ctx);
        this.game.settings.threeD && create3dRoad(stageObjects[stage].ROAD_TEXTURES[texture], x1, y1, w1, x2, y2, w2, ctx);
        drawPolygon(x1-w1, y1,	x1-w1+linesWidth1, y1, x2-w2+linesWidth2, y2, x2-w2, y2, color.shoulder, ctx);
        drawPolygon(x1+w1-linesWidth1, y1,	x1+w1, y1, x2+w2, y2, x2+w2-linesWidth2, y2, color.shoulder, ctx);
        if (color.lane){
            drawPolygon(x1+(linesWidth1/2), y1,	x1-(linesWidth1/2), y1, x2-(linesWidth2/2), y2, x2+(linesWidth2/2), y2, color.lane, ctx);
            drawPolygon(x1+lineDistance1, y1,	x1+lineDistance1+linesWidth1, y1, x2+lineDistance2+linesWidth2, y2, x2+lineDistance2, y2, color.lane, ctx);
            drawPolygon(x1-lineDistance1, y1,	x1-lineDistance1-linesWidth1, y1, x2-lineDistance2-linesWidth2, y2, x2-lineDistance2, y2, color.lane, ctx);
        }
    }
}



