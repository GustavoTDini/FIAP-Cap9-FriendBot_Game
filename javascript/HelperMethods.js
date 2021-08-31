// define um novo angulo em radianos
function setAngle() {
    let degreeAngle = Math.random() * FULL_CIRCLE;
    return degreeAngle * (PI / SEMI_CIRCLE)
}

// com o angulo achado define o x e y com o seno e cosseno
function setAngleSpeed(angle) {
    return [Math.cos(angle), Math.sin(angle)]
}

// função para inverter um angulo
function invertAngle(currentAngle) {
    if (currentAngle >= PI) {
        return currentAngle - PI
    } else {
        return currentAngle + PI;
    }
}

function rideRoad(){
    // ctx.setTransform(1,0,-3,1,300,0)
    // ctx.drawImage(road, 0, 0,
    //                     256,128,
    //                     0,100,
    //                     640,128)
    // ctx.setTransform(1,0,3,1,-300,0)
    // ctx.drawImage(road, 256, 0,
    //                     256,128,
    //                     640,100,
    //                     640,128)
    // for (let j = 1; j <= 16; j++){
        for (let i = 0; i < 32; i++){
            ctx.setTransform(1,0,(i*(3/32)-3),1,0,0)
            ctx.drawImage(road, 8*(i+1), 0,
                                8,128,
                                20*(i+1),100,
                                40,128)
            ctx.setTransform(1,0,i*(3/32),1,0,0)
            ctx.drawImage(road, 256 + 8*(i+1), 0,
                                8,128,
                                640 + 20*(i+1),100,
                                40,128)
        }
    // }
}

// for (let i = 0; i < 32; i++) {
//     ctx.setTransform(1, 0, (i * (3 / 32) - 3), 1, 0, 0)
//     ctx.drawImage(road, 8 * (i + 1), 0,
//         8, 128,
//         20 * (i + 1), 100,
//         20, 128)
//     ctx.setTransform(1, 0, i * (3 / 32), 1, 0, 0)
//     ctx.drawImage(road, 256 + 8 * (i + 1), 0,
//         8, 128,
//         640 + 20 * (i + 1), 100,
//         20, 128)
// }

// para rotacionar os sprites
function rotateSprite(ctx, angle, sprite, x, y) {
    ctx.save();
    ctx.translate(x + SPRITE_SIZE / 2, y + SPRITE_SIZE / 2);
    ctx.rotate(angle * (PI / SEMI_CIRCLE));
    ctx.drawImage(...sprite, (-SPRITE_SIZE / 2), (-SPRITE_SIZE / 2), SPRITE_SIZE, SPRITE_SIZE);
    ctx.restore();
}

// função para definir uma colisão entre 2 entidades
function isColliding(entity1, entity2) {
    return (((entity1.maskX + entity1.xSpeed + entity1.spriteSize) > entity2.maskX
        && (entity1.maskX + entity1.xSpeed) < (entity2.maskX + entity2.spriteSize))
        && ((entity1.maskY + entity1.ySpeed + entity1.spriteSize) > entity2.maskY
            && (entity1.maskY + entity1.ySpeed) < (entity2.maskY + entity1.spriteSize)
        ))
}




