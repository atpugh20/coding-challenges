const starColors = [
  "#9bb0ff",
  "#aabfff",
  "#cad7ff",
  "#f8f7ff",
  "#fff4ea",
  "#ffd2a1",
  "#ffcc6f",
];

class Star {
  constructor(x, y, dist) {
    this.pos = { x: x, y: y };
    this.dist = dist;
    this.vel = { x: this.dist / 75, y: 0 };
    this.color = starColors[rand(starColors.length)];
    this.size = this.dist / 5;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  updatePosition() {
    if (this.pos.x > cW) this.pos.x = 0;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}
