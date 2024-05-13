const green = "hsl(128, 61%, 50%)";
const red = "hsl(0, 100%, 50%)";
const white = "hsl(0, 0%, 100%)";
const blue = "hsl(210, 100%, 50%)";
const purple = "hsl(271, 100%, 50%)";
const pink = "hsl(350, 100%, 88%)";
const orange = "hsl(33, 100%, 50%)";
const yellow = "hsl(60, 100%, 50%)";
const cyan = "hsl(180, 100%, 50%)";

class Objects {
  constructor(ctx) {
    this.boundaries = [];
    this.enemyBoundaries = [];
    this.walls;
    this.enemies;
    this.items;
    this.obstacles;
    this.props;
    this.addWalls();
    this.addEnemies();
    this.addBoundaries(ctx, this.walls);
    this.addBoundaries(ctx, this.enemies);
  }

  renderObjects(particle, canvas) {
    const scene = getScene(particle.rays);
    const interval = canvas.width / scene.length;
    let x = 0;
    for (let ray of scene) {
      for (let i = 0; i < ray.objects.length; i++) {
        const renderDistance = getRenderDistance(ray);
        const adjustedObjectHeight =
          (ray.objects[i].obj.height / 1000) * canvas.height;
        let renderHeight =
          (canvas.height / renderDistance[i]) * adjustedObjectHeight;
        ctx.fillStyle = ray.getObjectColor(
          ray.objects[i].dist,
          ray.objects[i].obj.color,
          particle
        );
        ctx.fillRect(
          x,
          canvas.height / 2 - renderHeight / 2,
          interval + 1,
          renderHeight
        );
      }
      x += interval;
    }
    
  }

  addEnemies() {
    this.enemies = [new Enemy(mS / 2, 10, 2, 2, 0, red)];
  }

  addWalls() {
    this.walls = [
      // Borders
      new Wall(0, 0, mS, 1, 0, green),
      new Wall(0, 0, mS, 1, 90, green),
      new Wall(mS, 0, mS, 1, 90, green),
      new Wall(0, mS, mS, 1, 0, green),
      // Inner Walls
      new Wall(mS / 2, mS / 2, mS / 4, 2, 90, green),
      new Wall(mS / 2, mS / 2, mS / 4, 2, 0, green),
      new Wall(mS / 4, mS / 4, mS / 4, 2, 0, green),
      new Wall(mS / 2, mS / 4, mS / 4, 2, 90, green),
      new Wall(mS, mS / 4, 25, 2, 180, green),
      new Wall((mS * 3) / 4, mS / 2, 35, 2, -90, green),
      // Pillars
      new Wall(mS / 4, mS / 2, 5, 5, 0, green),
      new Wall(mS / 3, mS / 2, 5, 5, 0, orange),
      new Wall(mS / 6, mS / 2, 5, 5, 0, blue),
      new Wall(mS / 4, mS / 3, 5, 5, 0, purple),
      new Wall(mS / 3, mS / 3, 5, 5, 0, yellow),
      new Wall(mS / 6, mS / 3, 5, 5, 0, white),
      new Wall(mS / 4, (mS * 2) / 3, 5, 5, 0, cyan),
      new Wall(mS / 3, (mS * 2) / 3, 5, 5, 0, pink),
      new Wall(mS / 6, (mS * 2) / 3, 5, 5, 0, red),
    ];
  }
  addBoundaries(ctx, objectArray) {
    for (let object of objectArray) {
      const objBoundaries = object.getBoundaries(ctx);
      for (let boundary of objBoundaries) {
        this.boundaries.push(boundary);
      }
    }
  }
}
