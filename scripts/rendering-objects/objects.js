// OBJECT COLORS //

const green = "hsl(128, 61%, 50%)";
const red = "hsl(0, 100%, 50%)";
const white = "hsl(0, 0%, 100%)";
const blue = "hsl(210, 100%, 50%)";
const purple = "hsl(271, 100%, 50%)";
const pink = "hsl(350, 100%, 88%)";
const orange = "hsl(33, 100%, 50%)";
const yellow = "hsl(60, 100%, 50%)";
const cyan = "hsl(180, 100%, 50%)";

// The Objects class creates an object that handles the majority of the //
// instances that will need to be rendered in the main canvas //

class Objects {
  constructor(ctx) {
    this.boundaries = [];
    this.enemyBoundaries = [];
    this.walls = [];
    this.enemies;
    this.items = [];
    this.obstacles;
    this.props;
    this.addWalls();
    this.addBoundaries(ctx, this.walls);
    this.addItem();
  }

  // the walls that will be rendered are decided here
  addWalls() {
    const small = mS / 75;
    this.walls = [
      // borders
      new Wall(0, 0, mS, 1, 0, green),
      new Wall(0, 0, mS, 1, 90, green),
      new Wall(mS, 0, mS, 1, 90, green),
      new Wall(0, mS, mS, 1, 0, green),
      // inner Walls
      new Wall(mS / 2, mS / 2, mS / 4, small, 90, green),
      new Wall(mS / 2, mS / 2, mS / 4, small, 0, green),
      new Wall(mS / 4, mS / 4, mS / 4, small, 0, green),
      new Wall(mS / 2, mS / 4, mS / 4, small, 90, green),
      new Wall(mS, mS / 4, mS / 6, small, 180, green),
      new Wall((mS * 3) / 4, mS / 2, mS / 5, small, -90, green),
      // pillars
      new Wall(mS / 4, mS / 2, mS / 75, mS / 75, 0, green),
      new Wall(mS / 3, mS / 2, small, small, 0, orange),
      new Wall(mS / 6, mS / 2, small, small, 0, blue),
      new Wall(mS / 4, mS / 3, small, small, 0, purple),
      new Wall(mS / 3, mS / 3, small, small, 0, yellow),
      new Wall(mS / 6, mS / 3, small, small, 0, white),
      new Wall(mS / 4, (mS * 2) / 3, small, small, 0, cyan),
      new Wall(mS / 3, (mS * 2) / 3, small, small, 0, pink),
      new Wall(mS / 6, (mS * 2) / 3, small, small, 0, red),
    ];
  }

  // adds all boundaries from all objects into one encompassing array
  addBoundaries(ctx, objectArray) {
    for (let object of objectArray) {
      const objBoundaries = object.getBoundaries(ctx);
      for (let boundary of objBoundaries) {
        this.boundaries.push(boundary);
      }
    }
  }

  // the items that can be rendered are decided here
  addItem() {
    this.items = [
      new Item(
        "sword",
        (canvas.width * 3) / 7,
        (canvas.height * 3) / 5,
        canvas.width / 2,
        canvas.height / 2
      ),
      new Item(
        "stick",
        (canvas.width * 3) / 7,
        (canvas.height * 3) / 5,
        canvas.width / 2,
        canvas.height / 2
      ),
    ];
  }
}
