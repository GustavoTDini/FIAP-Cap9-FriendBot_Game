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
        this.totalPowerUps = [];
        this.totalObstacles = []
        this.totalAnimals = []
    }

    findSegment(z) {
        return this.segments[Math.floor(z/SEGMENT_LENGTH) % this.segments.length];
    }

    render(ctx) {
        let gameCamera = this.game.gameCamera

        let baseSegment = this.findSegment(gameCamera.z);
        let baseSegmentIndex = baseSegment.index;
        let basePercent   = percentageLeft(gameCamera.z, SEGMENT_LENGTH);
        let x  = 0;
        let dx = - (baseSegment.curve * basePercent);
        let maxBottomLine = CANVAS_HEIGHT;

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
                (currSegment.screenPoints.y >= maxBottomLine)){
                continue;
            }

            if (n>0 && currBottomLine < maxBottomLine){
                let screenPoints = currSegment.screenPoints;
                let lastScreenPoints = currSegment.lastScreenPoints
                this.renderGrass(ctx, currSegment.stage, currSegment.color, screenPoints.y, lastScreenPoints.y);
                if (currSegment.YRoad && Math.abs(currSegment.curve)> 1.5){
                    let currSegmentCounter = currSegment.YRoadCounter
                    let lastSegmentCounter = this.segments[currIndex-1].YRoadCounter ? this.segments[currIndex-1].YRoadCounter:0
                    let dir = currSegment.curve > 0? 1:-1
                    let curve = ROAD.CURVE.EASY*dir
                    let lastX = lastScreenPoints.x + smoothIn(lastSegmentCounter*dir, curve, lastSegmentCounter/101)
                    let currX = screenPoints.x + smoothIn(currSegmentCounter*dir, curve, currSegmentCounter/101)
                    //drawPolygon(currX - screenPoints.w, screenPoints.y, currX + screenPoints.w, screenPoints.y, lastX + lastScreenPoints.w, lastScreenPoints.y, lastX - lastScreenPoints.w, lastScreenPoints.y, "#ff0000", ctx)
                    this.renderSegment(
                        lastX, lastScreenPoints.y, lastScreenPoints.w,
                        currX, screenPoints.y, screenPoints.w,
                        currSegment.color, ctx, currSegment.stage, currSegment.texture, currSegment.index);
                }

                this.renderSegment(
                    lastScreenPoints.x, lastScreenPoints.y, lastScreenPoints.w,
                    screenPoints.x, screenPoints.y, screenPoints.w,
                    currSegment.color, ctx, currSegment.stage, currSegment.texture, currSegment.index);
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
                let maxHeight = this.segments[maxLineIndex].maxHeight
                if (maxHeight > 0){
                    maxBottomLine = Math.min(maxBottomLine, maxHeight)
                }
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
        this.setPlayerXScreen(player);
        this.updateObjects(dt);
        this.removeObjects()
        this.defineNewStage(player);
    }

    setPlayerXScreen(player) {
        let playerSegment = this.findSegment(player.z);
        let centrifugal = 30;
        let currentCurve = playerSegment.curve
        if (currentCurve) {
            player.screen.x = CANVAS_CENTER_X - SPRITE_SIZE / 2 + currentCurve * centrifugal
        } else {
            player.screen.x = CANVAS_CENTER_X - SPRITE_SIZE / 2
        }
    }

    defineNewStage(player) {
        if (player.currentSegment.index > this.game.decideSegment && !player.changingStage) {
            player.changingStage = true
            let dir = 1
            if (player.currentLane === 0 || player.currentLane === 1) {
                this.game.nextStage = this.game.nextLeft
                dir = -1
            } else if (player.currentLane === 2 || player.currentLane === 3) {
                this.game.nextStage = this.game.nextRight
            }
            this.roadConstructor.yRoadSegment(dir)
        }
        if (player.currentSegment.index > this.game.newStageSegment && player.changingStage) {
            player.changingStage = false
            this.game.background.nextAlpha = 0
            this.game.background.changeBackground(this.game.nextStage, true)
            this.game.currentStage = this.game.nextStage
            this.game.nextStage = null
            this.roadConstructor.newStageSegment()
        }
    }

    updateObjects(dt) {
        for (let j = 0; j < this.segments.length; j++) {
            this.segments[j].inRoadObjects = []
        }
        for (let i = 0; i < this.totalCars.length; i++) {
            let carSegment = this.findSegment(this.totalCars[i].z)
            carSegment.inRoadObjects.push(this.totalCars[i])
            this.totalCars[i].update(dt)
        }
        for (let i = 0; i < this.totalTraffic.length; i++) {
            let trafficSegment = this.findSegment(this.totalTraffic[i].z)
            trafficSegment.inRoadObjects.push(this.totalTraffic[i])
            this.totalTraffic[i].update(dt)
        }
        for (let i = 0; i < this.totalCoins.length; i++) {
            let coinSegment = this.findSegment(this.totalCoins[i].z)
            coinSegment.inRoadObjects.push(this.totalCoins[i])
            this.totalCoins[i].update(dt)
        }
        for (let i = 0; i < this.totalPowerUps.length; i++) {
            let upSegment = this.findSegment(this.totalPowerUps[i].z)
            upSegment.inRoadObjects.push(this.totalPowerUps[i])
            this.totalPowerUps[i].update(dt)
        }
        for (let i = 0; i < this.totalObstacles.length; i++) {
            let obstaclesSegment = this.findSegment(this.totalObstacles[i].z)
            obstaclesSegment.inRoadObjects.push(this.totalObstacles[i])
            this.totalObstacles[i].update(dt)
        }
        for (let i = 0; i < this.totalAnimals.length; i++) {
            let animalSegment = this.findSegment(this.totalAnimals[i].z)
            animalSegment.inRoadObjects.push(this.totalAnimals[i])
            this.totalAnimals[i].update(dt)
        }
        for (let i = 0; i < this.totalFuel.length; i++) {
            let fuelSegment = this.findSegment(this.totalFuel[i].z)
            fuelSegment.inRoadObjects.push(this.totalFuel[i])
            this.totalFuel[i].update(dt)
        }
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

    removeObjects(){
        let removeSegment = this.game.player.currentSegment.index - 50
        for (let i = 0; i < this.totalCars.length; i++){
            if (this.findSegment(this.totalCars[i].z).index < removeSegment){
                this.totalCars.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalTraffic.length; i++){
            if (this.findSegment(this.totalTraffic[i].z).index < removeSegment){
                this.totalTraffic.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalCoins.length; i++){
            if (this.findSegment(this.totalCoins[i].z).index < removeSegment){
                this.totalCoins.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalFuel.length; i++){
            if (this.findSegment(this.totalFuel[i].z).index < removeSegment){
                this.totalFuel.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalPowerUps.length; i++){
            if (this.findSegment(this.totalPowerUps[i].z).index < removeSegment){
                this.totalPowerUps.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalObstacles.length; i++){
            if (this.findSegment(this.totalObstacles[i].z).index < removeSegment){
                this.totalObstacles.splice(i,1)
            }
        }
        for (let i = 0; i < this.totalAnimals.length; i++){
            if (this.findSegment(this.totalAnimals[i].z).index < removeSegment){
                this.totalAnimals.splice(i,1)
            }
        }
    }

    renderSegment(x1, y1, w1, x2, y2, w2, color, ctx, stage, texture, index){
        let linesWidth1 = w1/12
        let linesWidth2 = w2/12
        let lineDistance1 = w1/2.5
        let lineDistance2 = w2/2.5
        let squareWidth1 = w1/4
        let squareWidth2 = w2/4
        let roadTexture = stageObjects[stage].ROAD_TEXTURES[texture]
        if (index <= 25) {
            if (index % 2 === 0) {
                roadTexture = START_COLORS.DARK.roadTexture
                color = START_COLORS.DARK
            } else {
                roadTexture = START_COLORS.LIGHT.roadTexture
                color = START_COLORS.LIGHT
            }
        }
        drawPolygon(x1-w1, y1,	x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road, ctx);
        if (color.oppositeRoad){
            drawPolygon(x1-w1 + 0.5*squareWidth1, y1,	x1+w1 - 0.5*squareWidth1, y1, x2+w2 - 0.5*squareWidth2, y2, x2-w2 + 0.5*squareWidth2, y2, color.oppositeRoad, ctx);
            drawPolygon(x1-w1 + squareWidth1, y1,	x1+w1 - squareWidth1, y1, x2+w2 - squareWidth2, y2, x2-w2 + squareWidth2, y2, color.road, ctx);
            drawPolygon(x1-w1 + 1.5*squareWidth1, y1,	x1+w1 - 1.5*squareWidth1, y1, x2+w2 - 1.5*squareWidth2, y2, x2-w2 + 1.5*squareWidth2, y2, color.oppositeRoad, ctx);
            drawPolygon(x1-w1 + 2*squareWidth1, y1,	x1+w1 - 2*squareWidth1, y1, x2+w2 - 2*squareWidth2, y2, x2-w2 + 2*squareWidth2, y2, color.road, ctx);
            drawPolygon(x1-w1 + 2.5*squareWidth1, y1,	x1+w1 - 2.5*squareWidth1, y1, x2+w2 - 2.5*squareWidth2, y2, x2-w2 + 2.5*squareWidth2, y2, color.oppositeRoad, ctx);
            drawPolygon(x1-w1 + 3*squareWidth1, y1,	x1+w1 - 3*squareWidth1, y1, x2+w2 - 3*squareWidth2, y2, x2-w2 + 3*squareWidth2, y2, color.road, ctx);
            drawPolygon(x1-w1 + 3.5*squareWidth1, y1,	x1+w1 - 3.5*squareWidth1, y1, x2+w2 - 3.5*squareWidth2, y2, x2-w2 + 3.5*squareWidth2, y2, color.oppositeRoad, ctx);
            drawPolygon(x1-w1 + 3.85*squareWidth1, y1,	x1+w1 - 3.85*squareWidth1, y1, x2+w2 - 3.85*squareWidth2, y2, x2-w2 + 3.85*squareWidth2, y2, color.road, ctx);
        }
        this.game.settings.threeD && create3dRoad(roadTexture, x1, y1, w1, x2, y2, w2, ctx);
        drawPolygon(x1-w1, y1,	x1-w1+linesWidth1, y1, x2-w2+linesWidth2, y2, x2-w2, y2, color.shoulder, ctx);
        drawPolygon(x1+w1+linesWidth1, y1,	x1+w1, y1, x2+w2, y2, x2+w2+linesWidth2, y2, color.shoulder, ctx);
        if (color.lane && index > 10){
            drawPolygon(x1+(linesWidth1/2), y1,	x1-(linesWidth1/2), y1, x2-(linesWidth2/2), y2, x2+(linesWidth2/2), y2, color.lane, ctx);
            drawPolygon(x1+lineDistance1, y1,	x1+lineDistance1+linesWidth1, y1, x2+lineDistance2+linesWidth2, y2, x2+lineDistance2, y2, color.lane, ctx);
            drawPolygon(x1-lineDistance1, y1,	x1-lineDistance1-linesWidth1, y1, x2-lineDistance2-linesWidth2, y2, x2-lineDistance2, y2, color.lane, ctx);
        }
    }

    renderGrass(ctx, stage, color, y2, y1) {
        ctx.fillStyle = ctx.createPattern(stageObjects[stage].SIDE_TEXTURES[color.grassTextures], "repeat")
        ctx.fillRect(0, y2 - 1, CANVAS_WIDTH, y1 - y2);
    }
}



