//Classe com o texto para os Escores e Moedas
class CanvasText {
    constructor(x, y, text, size, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size
        this.color = color
    }

    render(ctx, canvas) {
        let HMDraw = HelperMethods.draw
        ctx.font = HMDraw.scaleYDraw(canvas.height,this.size) + "px trebuchet MS";
        ctx.fillStyle = "black"
        ctx.strokeStyle = this.color
        ctx.fillText(this.text, HMDraw.scaleXDraw(canvas.width, this.x), HMDraw.scaleYDraw(canvas.height, this.y));
        ctx.strokeText(this.text, HMDraw.scaleXDraw(canvas.width, this.x), HMDraw.scaleYDraw(canvas.height, this.y));
    }

    update(newText, correction) {
        this.text = newText
        if (correction){
            this.x = 160 - (newText.toString().length*this.size/2)
        }

    }
}
