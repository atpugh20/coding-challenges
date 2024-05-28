// Items are objects that are held by the player //

class Item {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = `${this.name}1.svg`;
    this.swing1 = new Image();
    this.swing1.src = `${this.name}2.svg`;
    this.swing2 = new Image();
    this.swing2.src = `${this.name}3.svg`;
    this.swing3 = new Image();
    this.swing3.src = `${this.name}4.svg`;
  }

  // handles the canvas draw of the item
  // the counter decides how it will be animated
  render(ctx, counter) {
    if (counter < 1) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else if (counter < 2) {
      ctx.drawImage(this.swing1, this.x, this.y, this.width, this.height);
    } else if (counter < 3) {
      ctx.drawImage(this.swing2, this.x, this.y, this.width, this.height);
    } else if (counter < 4) {
      ctx.drawImage(this.swing3, this.x, this.y, this.width, this.height);
    }
  }
}
