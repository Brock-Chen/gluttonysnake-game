const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit; // 480/20 = 24
const column = canvas.width / unit; // 480/20 = 24

let snake = [];
function createSnake() {
  snake[0] = {
    x: 140,
    y: 0,
  };

  snake[1] = {
    x: 120,
    y: 0,
  };

  snake[2] = {
    x: 100,
    y: 0,
  };

  snake[3] = {
    x: 80,
    y: 0,
  };
}
createSnake();

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawAFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickAFrurit() {
    let over = false;
    let newx;
    let newy;

    function checkover(newx, newy) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == newx && snake[i].y == newy) {
          over = true;
          return;
        } else over = false;
      }
    }
    do {
      newx = Math.floor(Math.random() * column) * unit;
      newy = Math.floor(Math.random() * row) * unit;
      checkover(newx, newy);
    } while (over);

    this.x = newx;
    this.y = newy;
  }
}

let myFruit = new Fruit();

window.addEventListener("keydown", changeDirection);
function changeDirection(e) {
  if ((e.key == "ArrowRight" || e.key == "d") && d != "left") {
    d = "right";
  } else if ((e.key == "ArrowLeft" || e.key == "a") && d != "right") {
    d = "left";
  } else if ((e.key == "ArrowUp" || e.key == "w") && d != "down") {
    d = "up";
  } else if ((e.key == "ArrowDown" || e.key == "s") && d != "up") {
    d = "down";
  }
  window.removeEventListener("keydown", changeDirection);
}

let d = "right";
let score = 0;
let highScore;
bestscore();
document.getElementById("myscore").innerHTML = "目前遊戲分數 :  " + score;
document.getElementById("mybestscore").innerHTML =
  "最高遊戲分數 :  " + highScore;
function draw() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("Game Over !");
      return;
    }
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawAFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }

    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }

    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }

    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    // x  y width height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "right") {
    snakeX += unit;
  } else if (d == "left") {
    snakeX -= unit;
  } else if (d == "up") {
    snakeY -= unit;
  } else if (d == "down") {
    snakeY += unit;
  }

  let newhead = {
    x: snakeX,
    y: snakeY,
  };

  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickAFrurit();
    score++;
    setbestscore(score);
    document.getElementById("myscore").innerHTML = "目前遊戲分數 :  " + score;
    document.getElementById("mybestscore").innerHTML =
      "最高遊戲分數 :  " + highScore;
  } else {
    snake.pop();
  }
  snake.unshift(newhead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);

function bestscore() {
  if (localStorage.getItem("highScore") == null) {
    highScore = 0;
  } else {
    highScore = Number(localStorage.getItem("highScore"));
  }
}

function setbestscore(score) {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
}
