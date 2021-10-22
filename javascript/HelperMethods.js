// ---------------------------------------------------------------------------------
// Math Helpers
// ---------------------------------------------------------------------------------

function percentageLeft(n, total) {
    return (n % total) / total;
}

function toInt(obj, def){
    if (obj !== null) {
        let x = parseInt(obj, 10);
        if (!isNaN(x)) return x;
    }
    return toInt(def, 0);
}

function smoothIn(a, b, percent) {
    return a + (b - a) * Math.pow(percent, 2);
}

function smoothInOut(a, b, percent) {
    return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
}

function limitMaxMin(current, next, max, min) {
    let result
    if (next > current){
        next > max ? result = max : result = next
    } else {
        next < min ? result = min : result = next
    }
    return  result
}

function setMaxMin(current, max, min) {
    if (current > max){
        return max
    } else if (current < min){
        return min
    }
    return  current
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function fatorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * fatorial(n - 1);
}

function interpolate(x1, x2, y1,y2, x) {
    return y1 + (((x-x1)/(x2-x1))*(y2-y1))
}

// ---------------------------------------------------------------------------------
// Matrix  & 3d Helpers
// ---------------------------------------------------------------------------------

//Função para multiplicar 2 matrizes(a,b) 3x3
function multiply3x3Matrix(a, b) {
    let c = Array(9);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cij = 0;
            for (let k = 0; k < 3; k++) {
                cij += a[3*i + k]*b[3*k + j];
            }
            c[3*i + j] = cij;
        }
    }
    return c;
}

// função fazer uma matrix adjunta de M
function matrixAdj(m) {
    return [
        m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
        m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
        m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]
    ];
}

// Função para multiplicar uma matrix 3x3 (m), por um vetor de 3 (v)
function multiplyMatrixXVector(m, v) {
    return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
        m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
    ];
}

// Função que resolve as equações lineares de 4 pontos
function solveLinearEquations(x1, y1, x2, y2, x3, y3, x4, y4){
    let matrix1 = [x1, x2, x3,
        y1, y2, y3,
        1,  1,  1 ]
    let v = multiplyMatrixXVector(matrixAdj(matrix1), [x4,y4, 1])
    return multiply3x3Matrix(matrix1,
        [v[0],0,0,
            0,v[1],0,
            0,0,v[2]])
}

// Função que cria a Matrix de transformação entre 2 planos de 4 pontos
function setTransformMatrix(x1, y1, tx1, ty1,
                            x2, y2, tx2, ty2,
                            x3, y3, tx3, ty3,
                            x4, y4, tx4, ty4) {
    let sourceMatrix = solveLinearEquations(x1, y1, x2, y2, x3, y3, x4, y4)
    let destinyMatrix = solveLinearEquations(tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4)
    return multiply3x3Matrix(destinyMatrix, matrixAdj(sourceMatrix))
}

function renderTexturePoints(width, height, jMax, iMax, drawCorrectionPoint, roadWidth, y1, y2, t, ctx, image) {
    let destMatrix = Array(3)
    let newX = 0;
    let newY = 0;
    let cutWidth = width / iMax
    let cutHeight = height / jMax
    let drawWidth = (roadWidth / iMax) * drawCorrectionPoint;
    let drawHeight = ((y1 - y2) / jMax) * drawCorrectionPoint

    for (let j = 0; j <= jMax; j++) {
        for (let i = 0; i <= iMax; i++) {
            let oldX = i * cutWidth
            let oldY = j * cutHeight
            destMatrix = multiplyMatrixXVector(t, [oldX, oldY, 1])
            newX = destMatrix[0] / destMatrix[2]
            newY = destMatrix[1] / destMatrix[2]
            ctx.drawImage(image, i * cutWidth, j * cutHeight,
                cutWidth, cutHeight,
                newX, newY,
                drawWidth, drawHeight)
        }
    }
}

function define3dScale(roadWidth, jMax, iMax) {
    let drawCorrectionPoint = 1.5
    if (roadWidth < 300) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1.4
    }
    if (roadWidth < 100) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1.3
    }
    if (roadWidth < 50) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1.2
    }
    if (roadWidth < 30) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1.1
    }
    if (roadWidth < 10) {
        iMax /= 2
    }
    if (iMax < 1) {
        iMax = 1
    }
    if (jMax < 1) {
        jMax = 1
    }
    return {jMax, iMax, drawCorrectionPoint};
}

// Função que cria a renderização em fake3d no segmento de pista
function create3dRoad(roadImage, x1, y1, w1, x2, y2, w2, ctx) {
    let roadImageWidth = roadImage.width
    let height = roadImage.height
    let roadWidth = w1*2
    let jMax = 6;
    let iMax = 24;
    let correctionFactor = 0.98
    const scale = define3dScale(roadWidth, jMax, iMax);
    let correctedWidth1 = w1*correctionFactor
    let correctedWidth2 = w2*correctionFactor
    let tRoad = setTransformMatrix(0, 0, x2-correctedWidth2, y2, roadImageWidth, 0, x2+correctedWidth2, y2, roadImageWidth, height, x1+correctedWidth1, y1, 0, height, x1-correctedWidth1, y1);
    renderTexturePoints(roadImageWidth, height, scale.jMax, scale.iMax, scale.drawCorrectionPoint, roadWidth, y1, y2, tRoad, ctx, roadImage);
}

// Função que cria a renderização em Canvas Transform no segmento de pista
function createTransformRoad(roadImage, x1, y1, w1, x2, y2, w2, ctx) {
    let roadImageWidth = roadImage.width
    let height = roadImage.height
    let roadWidth = w1*2
    let jMax = 2;
    let iMax = 1;

    //const scale = define3dScale(roadWidth, jMax, iMax);

    let cutWidth = roadImageWidth / iMax
    let cutHeight = height / jMax
    let drawWidth = (roadWidth / iMax);
    let drawHeight = ((y1 - y2) / jMax)
    for (let j = 0; j <= jMax; j++) {
        for (let i = 0; i <= iMax; i++) {
            ctx.setTransform(1,0,-1,1,0,0)
            ctx.drawImage(roadImage, i * cutWidth, j * cutHeight,
                cutWidth, cutHeight,
                newX, newY,
                drawWidth, drawHeight)
        }
    }

}

// ---------------------------------------------------------------------------------
// Draw Helpers
// ---------------------------------------------------------------------------------

async function getImages(imageName) {
    let url = "./images/" +  imageName.toString() + ".png"
    const response = await fetch(url);
    images[imageName].src = response.url
}

async function preloadImages(images) {
      for (let image in images) {
         await getImages(image)
    }
}

function drawPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color, ctx){
    ctx.fillStyle = color

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4)

    ctx.closePath();
    ctx.fill();
}

function drawShadow(x, y, SpriteSize, ctx){
    ctx.fillStyle = "rgba(50, 50, 50, 0.6)";
    ctx.beginPath();
    ctx.ellipse(x+SPRITE_SIZE/2, y+SPRITE_SIZE*0.85, SpriteSize/3, SpriteSize/8, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function scaleXDraw(canvasWidth, currentValue){
    let standardWidth = 1280
    return canvasWidth*currentValue/standardWidth
}

function scaleYDraw(canvasHeight, currentValue){
    let standardHeight = 720
    return canvasHeight*currentValue/standardHeight
}

function drawToCanvas(canvas, ctx, sprite, x, y, width, height){
    ctx.drawImage(...sprite, scaleXDraw(canvas.width, x), scaleYDraw(canvas.height, y), scaleXDraw(canvas.width, width), scaleYDraw(canvas.height, height))
}

function drawRectToCanvas(canvas, ctx, x, y, width, height){
    ctx.fillRect(scaleXDraw(canvas.width, x), scaleYDraw(canvas.height, y), scaleXDraw(canvas.width, width), scaleYDraw(canvas.height, height) )
}

// para mudar a opacidade do desenho
function drawSpriteWithAlpha(ctx, sprite, x, y, width, height, alpha, canvasWidth, canvasHeight) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, scaleXDraw(canvasWidth,x), scaleYDraw(canvasHeight,y), scaleXDraw(canvasWidth,width), scaleYDraw(canvasHeight,height));
    ctx.globalAlpha = 1
    ctx.restore();
}

// ---------------------------------------------------------------------------------
// Sound Helpers
// ---------------------------------------------------------------------------------

async function getSound(soundName, audioCtx) {
    let url = "./sounds/" +  soundName + ".mp3"
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioCtx.decodeAudioData(arrayBuffer);
}

async function loadSound(soundName, audioCtx) {
    contextSounds[soundName] = await getSound(soundName, audioCtx)
}

async function preloadSounds(sounds, audioCtx) {
    for (let i in sounds) {
        await loadSound(sounds[i], audioCtx)
    }
}

function playTrack(audioBuffer, audioCtx, soundSetting) {
    if (soundSetting){
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.5
        trackSource.connect(gainNode).connect(audioCtx.destination)
        trackSource.start();
    }

}

function playMusic(audioBuffer, audioCtx, musicSetting) {
    if (musicSetting){
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(audioCtx.destination)
        if (trackSource.buffer !== null){
            trackSource.start();
            return trackSource
        }
        return null
    }
    return null
}


// ---------------------------------------------------------------------------------
// Mouse & Touch Helpers
// ---------------------------------------------------------------------------------
function scaleXPoint(currentValue){
    return screen.width*currentValue/STANDARD_WIDTH
}

function scaleYPoint(currentValue){
    return screen.width*currentValue/STANDARD_HEIGHT
}


function getMouseCanvasArea(mouseX, mouseY, x, y, width, height){
    let correctedX = scaleXPoint(mouseX)
    let correctedY = scaleYPoint(mouseY)
    console.log(mouseX, mouseY)
    console.log(correctedX, correctedY)
    return ((correctedX >  x) && (correctedX < x+width) && (correctedY >  y) && (correctedY < y+height));
}

// ---------------------------------------------------------------------------------
// FullScreen Helpers
// ---------------------------------------------------------------------------------

function toggleFullScreen(element) {
    if (!element.fullscreenElement) {
        element.requestFullscreen().then(r =>console.log(r));
    } else {
        if (element.exitFullscreen) {
            element.exitFullscreen().then(r =>console.log(r));
        }
    }
}

function isGameInFullscreen(elementNodeName) {
    if (document.fullscreenElement && document.fullscreenElement.nodeName === elementNodeName) {
        return true;
    }
    return false;
}
