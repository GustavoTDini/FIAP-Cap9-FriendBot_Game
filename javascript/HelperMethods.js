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
    // ctx.setTransform(1,0,-3,1,0,0)
    // ctx.drawImage(road, 0, 0,32,128,110,100, CUT_CANVAS,16)
    // ctx.setTransform(1,0,-0.8,1,0,0)
    // ctx.drawImage(road, 32, 0,32,128,105,100, CUT_CANVAS,16)
    // ctx.setTransform(1,0,-0.6,1,0,0)
    // ctx.drawImage(road, 64,0,32,128,105,100, CUT_CANVAS,16)
    // ctx.setTransform(1,0,-0.4,1,0,0)
    // ctx.drawImage(road,96,0,32,128,105,100, CUT_CANVAS,16)
    // ctx.setTransform(1,0,-0.2,1,0,0)
    // ctx.drawImage(road, 128, 0,32,128,105,100, CUT_CANVAS,16)
    // ctx.setTransform(1,0,-1,1,0,0)
    // ctx.drawImage(road, 0, 0,32,128,105,100, CUT_CANVAS,16)

    // ctx.setTransform(0.9,0,(1*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*1+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(1-1),100 + (1+1)*(1+1),(1+1)*(1+2),(1+1)*(1+2))
    // ctx.setTransform(0.9,0,(2*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*2+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(2-1),100 + (1+1)*(1+1),(1+1)*(1+2),(1+1)*(1+2))
    // ctx.setTransform(0.9,0,(3*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*3+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(3-1),100 + (1+1)*(1+1),(1+1)*(1+2),(1+1)*(1+2))
    // ctx.setTransform(0.9,0,(4*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*4+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(4-1),100 + (1+1)*(1+1),(1+1)*(1+2),(1+1)*(1+2))
    // ctx.setTransform(0.9,0,(5*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*5+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(5-1),100 + (j+1)*(j+1),(j+1)*(j+2),(j+1)*(j+2))
    // ctx.setTransform(0.9,0,(6*(3/32)-3),1,0,0)
    // ctx.drawImage(road, CUT_SIZE*6+10, 0,CUT_SIZE,128,10*1+CUT_CANVAS*(6-1),100 + (j+1)*(j+1),(j+1)*(j+2),(j+1)*(j+2))
    for (let j = 1; j <= 8; j++){
        for (let i = 0; i < 32; i++){
            ctx.setTransform(1,0,(i*(3/32)-3),1,0,0)
            ctx.drawImage(road, CUT_SIZE*i, 0,CUT_SIZE,128,CUT_CANVAS*i,100+j*i,CUT_CANVAS + 4*j,j*j*8)
            // ctx.setTransform(1,0,i*(3/32),1,0,0)
            // ctx.drawImage(road, 256 + CUT_SIZE*i, 0,CUT_SIZE,128,CANVAS_WIDTH/2 + CUT_CANVAS*i,100 + CUT_CANVAS*j,CUT_CANVAS,j*j*4)
        }
    }
}

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




