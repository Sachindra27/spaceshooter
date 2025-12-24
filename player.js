class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;

    this.direction = {
      x: 0,
      y: 0,
    };
    
    this.speed = 7;

    this.image = new Image();
    this.image.src = "./spaceship.png";
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
    return this.x + this.width / 2;
  }

    draw(ctx) {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    }
//   draw(ctx) {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }

  move() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;

    // 0 + 1 * 1 = -1
  }
}

export default Player;