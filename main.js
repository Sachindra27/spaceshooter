import Player from "./player.js";
import Bullet from "./bullet.js";
import Enemy from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameOverSound = new Audio("./gameover.mp3");
gameOverSound.volume = 0.6;
let gameOverPlayed = false;


let isGameOver = false;

// canvas resize
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2 - 25, canvas.height - 100);
const bullets = [];
const enemies = [];

function collisionDetection(A, B) {
  if (!A || !B) return false;

  if (
    A.left < B.right &&
    A.right > B.left &&
    A.top < B.bottom &&
    A.bottom > B.top
  ) {
    return true;
  }
}

// game loop
function loop() {
  if (isGameOver) {
  if (!gameOverPlayed) {
    gameOverSound.play();
    gameOverPlayed = true;
  }

  ctx.fillStyle = "red";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  return;
}
 

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.move();
  player.draw(ctx);

  // check collision between bullet and enemy

  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (collisionDetection(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
      }
    }
  }

  // render bullets and move
  if (bullets.length > 0) {
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].move();
      bullets[i].draw(ctx);

      if (bullets[i].bottom < 0) {
        bullets.splice(i, 1);
      }
    }
  }

  // render enemies and move
  if (enemies.length > 0) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move();
      enemies[i].draw(ctx);

      if (collisionDetection(enemies[i], player)) {
        isGameOver = true;
      }
    }
  }
  requestAnimationFrame(loop);
}

loop();

// when user press something, do something
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    player.direction.x = -1;
  }

  if (e.key === "ArrowRight") {
    player.direction.x = 1;
  }
  if (e.key === "ArrowUp") {
    player.direction.y = -1;
  }

  if (e.key === "ArrowDown") {
    player.direction.y = 1;
  }

  if (e.code === "Space") {
    console.log("<<SHOOT>>");
    // push the new bullet into the array
    bullets.push(new Bullet(player.center - 5, player.top));
    console.log("bullets", bullets);
  }
});

// when user release the key, do something (reset)
document.addEventListener("keyup", function (e) {
  player.direction.x = 0;
  player.direction.y = 0;
});

setInterval(function () {
  enemies.push(new Enemy());
}, Math.floor(Math.random() * (3000 - 1000) + 1000));