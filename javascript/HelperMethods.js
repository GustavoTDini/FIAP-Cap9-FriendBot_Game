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

function smoothOut(a, b, percent) {
    return a + (b - a) * (1 - Math.pow(1 - percent, 2));
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
    let drawCorrectionPoint = 1.3
    if (roadWidth < 300) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1.1
    }
    if (roadWidth < 150) {
        jMax /= 2;
        iMax /= 2
    }
    if (roadWidth < 50) {
        jMax /= 2;
        iMax /= 2
        drawCorrectionPoint = 1
    }
    if (roadWidth < 30) {
        jMax /= 2;
        iMax /= 2
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
function create3dRoad(roadImage, grassImage, x1, y1, w1, x2, y2, w2, ctx, color) {
    let roadImageWidth = roadImage.width
    let grassImageWidth = grassImage.width
    let height = roadImage.height
    let roadWidth = w1*2
    let jMax = 12;
    let iMax = 24;
    let correctionFactor = 0.98
    const scale = define3dScale(roadWidth, jMax, iMax);
    let correctedWidth1 = w1*correctionFactor
    let correctedWidth2 = w2*correctionFactor
    let tRoad = setTransformMatrix(0, 0, x2-correctedWidth2, y2, roadImageWidth, 0, x2+correctedWidth2, y2, roadImageWidth, height, x1+correctedWidth1, y1, 0, height, x1-correctedWidth1, y1);
    let tGrassLeft = setTransformMatrix(0, 0,
                                    -200, y2,
                                    grassImageWidth, 0,
                                    x2-correctedWidth2, y2,
                                    grassImageWidth, height,
                                x1-correctedWidth1, y1,
                                    0, height,
                                    -200, y1);
    let tGrassRight = setTransformMatrix(0, 0,
                                    x2 + correctedWidth2, y2,
                            grassImageWidth, 0,
                        CANVAS_WIDTH+200, y2,
                        grassImageWidth, height,
                        CANVAS_WIDTH + 200, y1,
                        0, height,
                        x1 + correctedWidth1, y1);

   // renderTexturePoints(grassImageWidth, height, scale.jMax/4, scale.iMax/4, scale.drawCorrectionPoint, roadWidth, y1, y2, tGrassLeft, ctx, grassImage);
   // renderTexturePoints(grassImageWidth, height, scale.jMax/4, scale.iMax/4, scale.drawCorrectionPoint, roadWidth, y1, y2, tGrassRight, ctx, grassImage);
    drawPolygon(x1-w1, y1,	x1+w1, y1, x2+w2, y2, x2-w2, y2, color, ctx);
    renderTexturePoints(roadImageWidth, height, scale.jMax, scale.iMax, scale.drawCorrectionPoint, roadWidth, y1, y2, tRoad, ctx, roadImage);
}

//width, height, scale, roadWidth, y1, y2, t, ctx, image
// ---------------------------------------------------------------------------------
// Draw Helpers
// ---------------------------------------------------------------------------------

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
    ctx.ellipse(x+SpriteSize/2, y+SpriteSize*0.85, SpriteSize/3, SpriteSize/8, 0, 0, 2 * Math.PI);
    ctx.fill();
}
