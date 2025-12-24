class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50; 
    this.height = 30; 
    this.speed = 5;
    this.image = new Image();
    this.image.src = "./bullet.png";

    const sound = new Audio("./bullet.ogg");
    sound.play();
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get center() {
    return this.width / 2;
  }

  draw(ctx) {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    }

  move() {
    this.y -= this.speed;
  }
}

export default Bullet;