// Se For utilizar texto no jogo, já tem uma classe pronta
// class CanvasText {
//     constructor(x, y, text, type) {
//         this.x = x;
//         this.y = y;
//         this.text = text;
//         this.time = TEXT_TIME_START;
//         this.type = type
//         this.textChanger = 5
//         this.xText = 0
//         this.yText = 0;
//         this.fontSize = 15;
//         this.currentChar = 1;
//     }
//
//     // de acordo com o tipo de texto é definido uma renderização e um update
//     render(ctx) {
//         switch (this.type) {
//             case(PLAIN_TEXT):
//                 ctx.font = "25px verdana";
//                 ctx.fillStyle = "red"
//                 ctx.strokeStyle = "white"
//                 this.x = 20;
//                 this.y = 40;
//                 ctx.fillText(this.text, this.x, this.y);
//                 ctx.strokeText(this.text, this.x, this.y);
//                 break;
//             case (PENALTY_TEXT):
//                 ctx.font = "35px verdana";
//                 if (this.textChanger % 2 === 0) {
//                     ctx.fillStyle = "black"
//                 } else {
//                     ctx.fillStyle = "white"
//                 }
//                 ctx.strokeStyle = "red"
//                 ctx.lineWidth = 2;
//                 this.xText = this.x + (ctx.measureText(this.text).width / 3);
//                 this.yText = this.y + (SPRITE_SIZE * 1.2);
//                 ctx.fillText(this.text, this.xText, this.yText);
//                 ctx.strokeText(this.text, this.xText, this.yText);
//                 break;
//             case (STAGE_TEXT):
//                 ctx.font = this.fontSize + "px verdana";
//                 ctx.lineWidth = 2;
//                 ctx.fillStyle = "white"
//                 ctx.strokeStyle = "white"
//                 ctx.textBaseline = "top"
//                 this.xText = this.x - (ctx.measureText(this.text).width / 2);
//                 this.yText = this.y - (ctx.measureText('M').width / 8);
//                 ctx.fillText(this.text, this.xText, this.yText);
//                 ctx.strokeText(this.text, this.xText, this.yText);
//                 break;
//             case (FULL_TEXT):
//                 ctx.font = "70px verdana";
//                 ctx.lineWidth = 1;
//                 ctx.fillStyle = "black"
//                 ctx.strokeStyle = "white"
//                 ctx.textBaseline = "top"
//                 this.xText = this.x - (ctx.measureText(this.text).width / 2);
//                 this.yText = this.y - (ctx.measureText('M').width / 8);
//                 ctx.fillText(this.text.substring(0, this.currentChar), this.xText, this.yText);
//                 ctx.strokeText(this.text.substring(0, this.currentChar), this.xText, this.yText);
//                 break;
//         }
//     }
//
//     update() {
//         switch (this.type) {
//             case(PLAIN_TEXT):
//                 this.text = "Score: " + score
//                 break;
//             case (PENALTY_TEXT):
//                 this.y--;
//                 this.time -= 2;
//                 if (this.time % 10 === 0) {
//                     this.textChanger--;
//                 }
//                 break;
//             case (STAGE_TEXT):
//                 this.time--;
//                 if (this.time % 2 === 0) {
//                     this.fontSize++;
//                 }
//                 break;
//             case (FULL_TEXT):
//                 if (this.time > 1) {
//                     this.time--
//                     if (this.time % 10 === 0 && this.currentChar < this.text.length) {
//                         this.currentChar++;
//                     }
//                 }
//                 break;
//
//         }
//         if (this.time < 0) {
//             this.time = 0
//         }
//     }
// }
