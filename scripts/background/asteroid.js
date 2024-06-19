const asteroidColors = ["#696969", "#5b5b5b", "#4f4f4f", "#363636", "#282828"];

class Asteroid {
  constructor(x, y, dist) {
    this.pos = { x: x, y: y };
    this.dist = dist;
    this.radius = 50 / this.dist + 10;
    this.color = asteroidColors[rand(asteroidColors.length)];
    this.vertexNum = 20;
    this.vertices = [];
    this.addVertices();
  }

  // draws the asteroid to the canvas
  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 0; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    // if past canvas, it will reform/respawn
    if (this.pos.x > cW + 100) this.respawn();

    // moves the asteroid based off of the distance away (further = slower)
    this.pos.x += 2 / (this.dist + 2);
    for (let vertex of this.vertices) {
      vertex.x += 2 / (this.dist + 2);
    }
  }

  // draws a circle that has angle variations from each vertex (rocky appearance)
  addVertices() {
    for (let i = 0; i < 360; i += 360 / this.vertexNum) {
      const angle = (i * Math.PI) / 180;
      const newX =
        Math.cos(angle) * this.radius + this.pos.x + rand(this.radius / 4);
      const newY =
        Math.sin(angle) * this.radius + this.pos.y + rand(this.radius / 4);
      const vertex = { x: newX, y: newY };
      this.vertices.push(vertex);
    }
  }

  // recreates the asteroid with new distance, radius, vertices, and location
  respawn() {
    this.vertices = [];
    this.pos.x = -100;
    this.pos.y = rand(cH);
    this.dist = getDistance();
    this.radius = 40 / this.dist + 10;
    this.addVertices();
  }
}
