class Spring {
    constructor(x1, y1, x2, y2, color) {
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 }; 
        this.color = color;
    }

    show(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }

    update(x1, y1, x2, y2) {
        this.a.x = x1;
        this.a.y = y1;
        this.b.x = x2;
        this.b.y = y2;
    }
};