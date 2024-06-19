const bodies = ["rect", "oval", "tri"];
const wings = ["tri1", "tri2", "gun", "arc", "none"];
const engines = ["rect", "out", "in"];

class OtherShip {
  constructor(x, y, dist) {
    this.pos = { x: x, y: y };
    this.dist = dist;
    this.size = 30 / this.dist + 10;
    this.body = bodies[rand(bodies.length)];
    this.wing = wings[rand(wings.length)];
    this.engine = engines[rand(engines.length)];
    this.colors = [
      shipColors[rand(shipColors.length)],
      shipColors[rand(shipColors.length)],
      shipColors[rand(shipColors.length)],
    ];
  }
  // draws the entire ship to the canvas
  draw(ctx) {
    this.drawBoost(ctx);
    this.drawWings(ctx);
    this.drawEngine(ctx);
    this.drawBody(ctx);
  }

  // moves the ship based off of its distance (further = slower)
  update() {
    this.pos.x += 1 / this.dist + 0.2;
    if (this.pos.x > cW + 100) this.respawn();
  }

  // recreates the ship with random parts, then respawns it at a random height
  respawn() {
    this.pos.x = -100;
    this.pos.y = rand(cH);
    this.dist = getDistance();
    this.size = 30 / this.dist + 10;
    this.body = bodies[rand(bodies.length)];
    this.wing = wings[rand(wings.length)];
    this.engine = engines[rand(engines.length)];
    this.colors = [
      shipColors[rand(shipColors.length)],
      shipColors[rand(shipColors.length)],
      shipColors[rand(shipColors.length)],
    ];
  }

  // draws the body of the ship as either a rectangle, triangle, or oval
  drawBody(ctx) {
    if (this.body == "rect") {
      // rect body
      ctx.fillStyle = this.colors[0];
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.size, this.size / 2);
      ctx.fill();
      ctx.stroke();
      // rect window
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(
        this.pos.x + this.size * 0.65,
        this.pos.y,
        this.size / 4,
        this.size / 4
      );
      ctx.fill();
      ctx.stroke();
    } else if (this.body == "oval") {
      // oval body
      ctx.fillStyle = this.colors[0];
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.ellipse(
        this.pos.x + this.size / 2,
        this.pos.y + this.size / 4,
        this.size / 2,
        this.size / 4,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
      // oval window
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(
        this.pos.x + this.size * 0.65,
        this.pos.y + this.size / 25,
        this.size / 4,
        this.size / 4
      );
      ctx.fill();
      ctx.stroke();
    } else if (this.body == "tri") {
      // tri body
      ctx.fillStyle = this.colors[0];
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(this.pos.x + this.size, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x, this.pos.y + this.size / 2);
      ctx.lineTo(this.pos.x, this.pos.y);
      ctx.stroke();
      ctx.fill();
      // tri window
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(this.pos.x + this.size / 2, this.pos.y + this.size / 8);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x + this.size, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 8);
      ctx.fill();
      ctx.stroke();
    }
  }

  // draws the wings as either a triangle, arc, or gun
  drawWings(ctx) {
    if (this.wing == "tri1") {
      ctx.fillStyle = "grey";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x, this.pos.y + this.size);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 4);
      ctx.fill();
      ctx.stroke();
    } else if (this.wing == "tri2") {
      ctx.fillStyle = "grey";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 4);
      ctx.fill();
      ctx.stroke();
    } else if (this.wing == "gun") {
      ctx.fillStyle = "grey";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x, this.pos.y + this.size * 0.65);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size * 0.65);
      ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size * 0.6);
      ctx.lineTo(this.pos.x + this.size / 4, this.pos.y + this.size * 0.6);
      ctx.lineTo(this.pos.x + this.size / 4, this.pos.y + this.size / 4);
      ctx.fill();
      ctx.stroke();
    } else if (this.wing == "arc") {
      ctx.fillStyle = "grey";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y + this.size / 4);
      ctx.arc(
        this.pos.x,
        this.pos.y + this.size / 4,
        this.size / 2,
        0,
        Math.PI / 2
      );
      ctx.moveTo(this.pos.x + 1, this.pos.y + this.size / 4);
      ctx.lineTo(this.pos.x + 1, this.pos.y + this.size * 0.75);
      ctx.fill();
      ctx.stroke();
    }
  }
  // draws a dark rectangle as the engine at the back
  drawEngine(ctx) {
    ctx.fillStyle = "rgb(21,21,21)";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.rect(
      this.pos.x - this.size / 4,
      this.pos.y,
      this.size / 4,
      this.size / 2
    );
    ctx.fill();
    ctx.stroke();
  }
  // draws a red rectangle to look like boost
  drawBoost() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.pos.x - this.size / 2,
      this.pos.y,
      this.size / 4,
      this.size / 2
    );
  }
}
