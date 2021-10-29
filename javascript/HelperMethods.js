// Classe com os métodos auxiliares para realizar diversas funções, como matemática e renderização
class HelperMethods {

// ---------------------------------------------------------------------------------
// Math Helpers
// ---------------------------------------------------------------------------------
    static math = {
        // função para calcular a porcentagem restante
        percentageLeft: function (n, total) {
            return (n % total) / total;
        },
        // função para tranformar um numero em Int
        toInt: function (obj, def) {
            if (obj !== null) {
                let x = parseInt(obj, 10);
                if (!isNaN(x)) return x;
            }
            return HelperMethods.math.toInt(def, 0);
        },
        // função para fazer uma transição suave de entrada
        smoothIn: function (a, b, percent) {
            return a + (b - a) * Math.pow(percent, 2);
        },
        // função para fazer uma transição suave de entrada e saida
        smoothInOut: function (a, b, percent) {
            return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
        },
        //função para definir um limite em um incremento ou decremento
        limitMaxMin: function (current, next, max, min) {
            let result
            if (next > current) {
                next > max ? result = max : result = next
            } else {
                next < min ? result = min : result = next
            }
            return result
        },
        //função para definir um maximo e minimo de um numero
        setMaxMin: function (current, max, min) {
            if (current > max) {
                return max
            } else if (current < min) {
                return min
            }
            return current
        },
        // função que retorna um inteiro randomico entre dois valores
        randomIntFromInterval: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        // função para calcular o fatorial de um numero
        fatorial: function (n) {
            if (n === 0 || n === 1) {
                return 1;
            }
            return n * HelperMethods.math.fatorial(n - 1);
        },
        // função para calcular uma interpolação entre 2 razões
        interpolate: function (x1, x2, y1, y2, x) {
            return y1 + (((x - x1) / (x2 - x1)) * (y2 - y1))
        }
    }


    // ---------------------------------------------------------------------------------
    // Matrix  & 3d Helpers
    // ---------------------------------------------------------------------------------

    static matrix = {
        //Função para multiplicar 2 matrizes(a,b) 3x3
        multiply3x3Matrix: function(a, b) {
            let c = Array(9);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let cij = 0;
                    for (let k = 0; k < 3; k++) {
                        cij += a[3 * i + k] * b[3 * k + j];
                    }
                    c[3 * i + j] = cij;
                }
            }
            return c;
        },
        // função fazer uma matrix adjunta de M
        matrixAdj: function(m) {
            return [
                m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
                m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
                m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]
            ];
        },
        // Função para multiplicar uma matrix 3x3 (m), por um vetor de 3 (v)
        multiplyMatrixXVector: function(m, v) {
            return [
                m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
                m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
                m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
            ];
        },
        // Função que resolve as equações lineares de 4 pontos
        solveLinearEquations: function(x1, y1, x2, y2, x3, y3, x4, y4) {
            let matrix1 = [x1, x2, x3,
                y1, y2, y3,
                1, 1, 1]
            let v = HelperMethods.matrix.multiplyMatrixXVector(HelperMethods.matrix.matrixAdj(matrix1), [x4, y4, 1])
            return HelperMethods.matrix.multiply3x3Matrix(matrix1,
                [v[0], 0, 0,
                    0, v[1], 0,
                    0, 0, v[2]])
        },
        // Função que cria a Matrix de transformação entre 2 planos de 4 pontos
        setTransformMatrix: function(x1, y1, tx1, ty1,
                           x2, y2, tx2, ty2,
                           x3, y3, tx3, ty3,
                           x4, y4, tx4, ty4) {
            let sourceMatrix = HelperMethods.matrix.solveLinearEquations(x1, y1, x2, y2, x3, y3, x4, y4)
            let destinyMatrix = HelperMethods.matrix.solveLinearEquations(tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4)
            return HelperMethods.matrix.multiply3x3Matrix(destinyMatrix, HelperMethods.matrix.matrixAdj(sourceMatrix))
        },
        // Função que utiliza as matrizes para definir os pontos de transformação em 3d
        renderTexturePoints: function(width, height, jMax, iMax, drawCorrectionPoint, roadWidth, y1, y2, t, ctx, image) {
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
                    destMatrix = HelperMethods.matrix.multiplyMatrixXVector(t, [oldX, oldY, 1])
                    newX = destMatrix[0] / destMatrix[2]
                    newY = destMatrix[1] / destMatrix[2]
                    ctx.drawImage(image, i * cutWidth, j * cutHeight,
                        cutWidth, cutHeight,
                        newX, newY,
                        drawWidth, drawHeight)
                }
            }
        },
        // Função que define as escalas a depender da distancia, para melhorar a performance
        define3dScale: function(roadWidth, jMax, iMax) {
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
        },
        // Função que cria a renderização em fake3d no segmento de pista
        create3dRoad: function(roadImage, x1, y1, w1, x2, y2, w2, ctx) {
            let roadImageWidth = roadImage.width
            let height = roadImage.height
            let roadWidth = w1 * 2
            let jMax = 6;
            let iMax = 24;
            let correctionFactor = 0.98
            const scale = HelperMethods.matrix.define3dScale(roadWidth, jMax, iMax);
            let correctedWidth1 = w1 * correctionFactor
            let correctedWidth2 = w2 * correctionFactor
            let tRoad = HelperMethods.matrix.setTransformMatrix(0, 0, x2 - correctedWidth2, y2, roadImageWidth, 0, x2 + correctedWidth2, y2, roadImageWidth, height, x1 + correctedWidth1, y1, 0, height, x1 - correctedWidth1, y1);
            HelperMethods.matrix.renderTexturePoints(roadImageWidth, height, scale.jMax, scale.iMax, scale.drawCorrectionPoint, roadWidth, y1, y2, tRoad, ctx, roadImage);
        }
    }

    // ---------------------------------------------------------------------------------
    // Draw Helpers
    // ---------------------------------------------------------------------------------

    static draw = {
        // função para pré carregar uma imagem
        getImages: async function(imageName) {
            let url = "./images/" + imageName.toString() + ".png"
            const response = await fetch(url);
            Images.imageFiles[imageName].src = response.url
        },
        // função para pré carregar todas as imagens em uma array
        preloadImages: async function(images) {
            for (let image in images) {
                await HelperMethods.draw.getImages(image)
            }
        },
        // função para desenhar um polígono trapezoide
        drawPolygon: function(x1, y1, x2, y2, x3, y3, x4, y4, color, ctx) {
            ctx.fillStyle = color
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4)
            ctx.closePath();
            ctx.fill();
        },
        // função para desenhar a sombra do personagem
        drawShadow: function(x, y, spriteSize, ctx, canvas) {
            ctx.fillStyle = "rgba(50, 50, 50, 0.6)";
            ctx.beginPath();
            HelperMethods.draw.drawEllipseToCanvas(canvas, ctx, x, y, spriteSize)
            ctx.fill();
        },
        // função para escalar as imagens em relação a resolução na altura
        scaleXDraw: function(canvasWidth, currentValue) {
            let standardWidth = 1280
            return canvasWidth * currentValue / standardWidth
        },
        // função para escalar as imagens em relação a resolução no comprimento
        scaleYDraw: function(canvasHeight, currentValue) {
            let standardHeight = 720
            return canvasHeight * currentValue / standardHeight
        },
        // função para desenhar os sprites em relação a resolução
        drawToCanvas: function(canvas, ctx, sprite, x, y, width, height) {
            ctx.drawImage(...sprite, HelperMethods.draw.scaleXDraw(canvas.width, x), HelperMethods.draw.scaleYDraw(canvas.height, y), HelperMethods.draw.scaleXDraw(canvas.width, width), HelperMethods.draw.scaleYDraw(canvas.height, height))
        },
        // função para desenhar um retângulo em relação a resolução
        drawRectToCanvas: function(canvas, ctx, x, y, width, height) {
            ctx.fillRect(HelperMethods.draw.scaleXDraw(canvas.width, x), HelperMethods.draw.scaleYDraw(canvas.height, y), HelperMethods.draw.scaleXDraw(canvas.width, width), HelperMethods.draw.scaleYDraw(canvas.height, height))
        },
        // função para desenhar uma elipse em relação a resolução
        drawEllipseToCanvas: function(canvas, ctx, x, y, spriteSize) {
            ctx.ellipse(HelperMethods.draw.scaleXDraw(canvas.width, x + Images.SPRITE_SIZE / 2), HelperMethods.draw.scaleYDraw(canvas.height, y + Images.SPRITE_SIZE * 0.85), HelperMethods.draw.scaleXDraw(canvas.width, spriteSize / 3), HelperMethods.draw.scaleYDraw(canvas.height, spriteSize / 8), 0, 0, 2 * Math.PI)
        },
        // Função para desenhar um sprite com mudanção de opacidade do desenho
        drawSpriteWithAlpha: function (ctx, sprite, x, y, width, height, alpha, canvasWidth, canvasHeight) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.drawImage(sprite, HelperMethods.draw.scaleXDraw(canvasWidth, x), HelperMethods.draw.scaleYDraw(canvasHeight, y), HelperMethods.draw.scaleXDraw(canvasWidth, width), HelperMethods.draw.scaleYDraw(canvasHeight, height));
            ctx.globalAlpha = 1
            ctx.restore();
        }
    }

// ---------------------------------------------------------------------------------
// Sound Helpers
// ---------------------------------------------------------------------------------

    static sound ={
        // Função para decodificar um arquivo de musica
        getSound: async function(soundName, audioCtx) {
            let url = "./sounds/" + soundName + ".mp3"
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await audioCtx.decodeAudioData(arrayBuffer);
        },
        // Função para pré carregar um arquivo de musica
        loadSound: async function(soundName, audioCtx) {
            Sounds.contextSounds[soundName] = await HelperMethods.sound.getSound(soundName, audioCtx)
        },
        // função para pré carregar todas os sons em uma array
        preloadSounds: async function(sounds, audioCtx) {
            for (let i in sounds) {
                await HelperMethods.sound.loadSound(sounds[i], audioCtx)
            }
        },
        // função para tocar um arquivo curto de efeito sonoro
        playTrack: function(audioBuffer, audioCtx, soundSetting, gain) {
            if (soundSetting) {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                const trackSource = audioCtx.createBufferSource();
                trackSource.buffer = audioBuffer;
                const gainNode = audioCtx.createGain();
                gainNode.gain.value = gain
                trackSource.connect(gainNode).connect(audioCtx.destination)
                trackSource.start();
            }
        },
        // função para tocar um arquivo de musica
        playMusic: function(audioBuffer, audioCtx, musicSetting, gainNode) {
            if (musicSetting) {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                const trackSource = audioCtx.createBufferSource();
                trackSource.buffer = audioBuffer;
                trackSource.connect(gainNode).connect(audioCtx.destination)
                if (trackSource.buffer !== null) {
                    trackSource.start();
                    return trackSource
                }
                return null
            }
            return null
        }
    }

// ---------------------------------------------------------------------------------
// Mouse & Touch Helpers
// ---------------------------------------------------------------------------------

    static mouseTouch = {
        // função para escalar o ponto de toque em relação a tela cheia ou não, pela altura
        scaleXPoint: function(currentValue) {
            let width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            return width * currentValue / Game.STANDARD_WIDTH
        },
        // função para escalar o ponto de toque em relação a tela cheia ou não, pela largura
        scaleYPoint: function(currentValue) {
            let height = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            return height * currentValue / Game.STANDARD_HEIGHT
        },
        // função para definir o ponto de toque a ser considerado para um toque oou clique no canvas
        getMouseCanvasArea: function(mouseX, mouseY, x, y, width, height, fullScreen) {
            if (fullScreen) {
                x = HelperMethods.mouseTouch.scaleXPoint(x)
                y = HelperMethods.mouseTouch.scaleYPoint(y)
                width = HelperMethods.mouseTouch.scaleXPoint(width)
                height = HelperMethods.mouseTouch.scaleYPoint(height)
            }

            return ((mouseX > x) && (mouseX < x + width) && (mouseY > y) && (mouseY < y + height));
        },
        // função para detectar um deslizar na tela e retornar a direção
        swipeDetect: function(el, callback){

            let touchSurface = el,
                swipeDir,
                startX,
                startY,
                distX,
                distY,
                threshold = 150, //required min distance traveled to be considered swipe
                restraint = 100, // maximum distance allowed at the same time in perpendicular direction
                allowedTime = 300, // maximum time allowed to travel that distance
                elapsedTime,
                startTime,
                handleSwipe = callback || function(swipeDir){}

            touchSurface.addEventListener('touchstart', function(e){
                let touchObj = e.changedTouches[0];
                swipeDir = 'none'
                startX = touchObj.pageX
                startY = touchObj.pageY
                startTime = new Date().getTime() // record time when finger first makes contact with surface
                e.preventDefault()
            }, false)

            touchSurface.addEventListener('touchmove', function(e){
                e.preventDefault() // prevent scrolling when inside DIV
            }, false)

            touchSurface.addEventListener('touchend', function(e){
                let touchObj = e.changedTouches[0]
                distX = touchObj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
                distY = touchObj.pageY - startY // get vertical dist traveled by finger while in contact with surface
                elapsedTime = new Date().getTime() - startTime // get time elapsed
                if (elapsedTime <= allowedTime){ // first condition for swipe met
                    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                        swipeDir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                    }
                    else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                        swipeDir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                    }
                }
                handleSwipe(swipeDir)
                e.preventDefault()
            }, false)
        }
    }

// ---------------------------------------------------------------------------------
// FullScreen Helpers
// ---------------------------------------------------------------------------------

    static fullscreen = {
        // função para colocar em tela cheia
        toggleFullScreen: function(element) {
            if (!element.fullscreenElement) {
                if (element.requestFullscreen) {
                    element.requestFullscreen().then(r => console.log(r));
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen(Element);
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            } else {
                if (element.exitFullscreen) {
                    element.exitFullscreen().then(r => console.log(r));
                }
            }
        },
        // função para verificar se está em tela cheia
        isGameInFullscreen: function(elementNodeName) {
            return document.fullscreenElement && document.fullscreenElement.nodeName === elementNodeName;
        }
    }





}
