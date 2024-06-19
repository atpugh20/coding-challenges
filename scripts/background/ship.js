const shipColors = ["green", "red", "dodgerblue", "purple", "cyan", "yellow"];

class Ship {
  constructor(x, y, dist) {
    this.pos = { x: x, y: y };
    this.dist = dist;
    this.vel = { x: 1, y: 0 };
    this.fakeX = 0;
    this.color = shipColors[rand(shipColors.length)];
  }

  draw(ctx) {
    ctx.translate(this.pos.x + 80, this.pos.y - 5);
    ctx.rotate((Math.cos(this.fakeX) / Math.PI) * -1);
    ctx.translate(-this.pos.x - 80, -this.pos.y + 5);

    this.drawBody(ctx);
    this.drawWindow(ctx);
    this.drawBooster(ctx);
    this.drawWing(ctx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  float() {
    if (this.pos.x > cW / 2) {
      this.pos.x -= this.vel.x;
    } else {
      this.vel.x = 0;
    }
    this.fakeX += 0.01;
    this.pos.y = Math.sin(this.fakeX) * 40 + cH / 2;
  }

  drawBody(ctx) {
    ctx.fillStyle = "grey";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + 50, this.pos.y - 6);
    ctx.lineTo(this.pos.x + 70, this.pos.y - 13);
    ctx.lineTo(this.pos.x + 100, this.pos.y - 6);
    ctx.lineTo(this.pos.x + 80, this.pos.y - 3);
    ctx.lineTo(this.pos.x + 92, this.pos.y + 1);
    ctx.lineTo(this.pos.x + 80, this.pos.y + 2);
    ctx.lineTo(this.pos.x + 40, this.pos.y + 2);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.stroke();
    ctx.fill();
  }

  drawWindow(ctx) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.pos.x + 50, this.pos.y - 6);
    ctx.lineTo(this.pos.x + 70, this.pos.y - 13);
    ctx.lineTo(this.pos.x + 65, this.pos.y - 6);
    ctx.stroke();
    ctx.fill();
  }

  drawBooster(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.pos.x + 50, this.pos.y);
    ctx.lineTo(this.pos.x + 65, this.pos.y);
    ctx.lineTo(this.pos.x + 80, this.pos.y - 6);
    ctx.lineTo(this.pos.x + 95, this.pos.y - 22);
    ctx.lineTo(this.pos.x + 50, this.pos.y);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.pos.x + 56, this.pos.y + 3);
    ctx.lineTo(this.pos.x + 80, this.pos.y + 3);
    ctx.lineTo(this.pos.x + 73, this.pos.y + 9);
    ctx.lineTo(this.pos.x + 63, this.pos.y + 9);
    ctx.lineTo(this.pos.x + 56, this.pos.y + 3);
    ctx.stroke();
    ctx.fill();
  }

  drawWing(ctx) {
    ctx.fillStyle = "grey";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.pos.x + 80, this.pos.y - 4);
    ctx.lineTo(this.pos.x + 92, this.pos.y + 3);
    ctx.lineTo(this.pos.x + 130, this.pos.y + 12);
    ctx.lineTo(this.pos.x + 80, this.pos.y + 9);
    ctx.lineTo(this.pos.x + 70, this.pos.y + 2);
    ctx.stroke();
    ctx.fill();
  }
}
