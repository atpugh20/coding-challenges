class Player {
  constructor() {
    this.pos = { x: 30, y: 5 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 1 };
    this.size = unitSize;
    this.color = "orange";
    this.falling = true;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.pos.x * this.size,
      this.pos.y * this.size,
      this.size,
      this.size
    );
  }

  update(grid) {
    if (this.vel.y > 0) {
      for (let i = 0; i < this.vel.y; i++) {
        this.applyForce(0, 1, grid);
      }
    } else {
      for (let i = this.vel.y; i < 0; i++) {
        this.applyForce(0, -1, grid);
      }
    }
    if (this.vel.x > 0) {
      for (let i = 0; i < this.vel.x; i++) {
        this.applyForce(1, 0, grid);
      }
    } else {
      for (let i = this.vel.x; i < 0; i++) {
        this.applyForce(-1, 0, grid);
      }
    }
    this.vel.y += this.acc.y;
    this.vel.x += this.acc.x;
  }

  applyForce(incX, incY, grid) {
    if (grid[this.pos.y + incY][this.pos.x + incX].isWall == false) {
      this.falling = true;
      const newY = this.pos.y + incY;
      const newX = this.pos.x + incX;
      if (newY >= 0 && newY < cH) this.pos.y += incY;
      if (newX >= 0 && newX < cW) this.pos.x += incX;
    } else {
      if (incY) {
        this.vel.y = 0;
        this.falling = false;
      }
    }
  }
}
