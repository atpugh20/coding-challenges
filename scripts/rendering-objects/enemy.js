// An enemy would be able to interact with the particle //
// Not yet used //

class Enemy extends Wall {
  constructor(x, y, length, width, angleDegs, color) {
    super(x, y, length, width, angleDegs, color);
    this.height = 2;
    this.type = "enemy";
  }
}
