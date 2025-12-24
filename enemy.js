class Enemy {
  constructor() {
    this.x = Math.random() * (window.innerWidth - 50 - 50) + 50;
    this.y = 0;
    this.width = 70;
    this.height = 40;
    
    this.image = new Image();
    this.image.src = "./enemy.png";
    this.speed = 1;
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
//   draw(ctx) {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }

  move() {
    this.y += this.speed;
  }
}

export default Enemy;