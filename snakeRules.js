const board = document.getElementById("gameBoard");
console.log(board);
const instruction = document.getElementById("instrutionText");
const logo = document.getElementById("logo");



const gridSize = 26;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

function drawBoard() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}


function drawSnake() {
  snake.forEach((snakePart) => {
    const gameSnake = createGameElement("div");
    gameSnake.className = "snake";
    setPosition(gameSnake, snakePart);
    board.appendChild(gameSnake);
  });
}

function createGameElement(tag, className) {
  const gameElement = document.createElement(tag);
  gameElement.className = className;
  return gameElement;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function drawFood() {
  if (gameStarted) {
    const randomFood = createGameElement("div");
    randomFood.className = "food";
    setPosition(randomFood, food);
    board.appendChild(randomFood);
  }
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      drawBoard();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true;
  instruction.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    drawBoard();
  }, gameSpeedDelay);
}

function pressSpaceBar(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
    console.log(startGame);
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}
document.addEventListener("keydown", pressSpaceBar);

function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instruction.style.display = "block";
  logo.style.display = "block";
}
