/*----- constants -----*/
const grid = document.getElementById("grid");



/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let randomIndex = Math.floor(Math.random() * 25);
let keys = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false
  };

/*----- cached elements  -----*/





/*----- event listeners -----*/
document.addEventListener("keydown", keyDown);
document.addEventListener("keyUp", keyUp);

/*----- functions -----*/


function createBoard() {
    for (i = 0; i < 25; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        grid.append(box);
        box.setAttribute("id", i);
    }
};

function snake() {
    let arr = Array.from({length:25});
    let index = Math.floor(Math.random() * 25);
    for (index = Math.floor(Math.random() * 25); index === randomIndex; index = Math.floor(Math.random() * 25)) {
        index = Math.floor(Math.random() * 25);
    }
    let snake = document.getElementById(index);
    snake.classList.add("snake");
    snakePos = index;
};


function createFood() {
    let food = document.getElementById(randomIndex);
    food.classList.add("food");
    food.style.backgroundColor = "red";
    foodpos = randomIndex;
};

function eatFood() {};

function moveSnake() {
    if (keys.ArrowUp) {
        snakePos -= 5;
      }
    
      if (keys.ArrowDown) {
        snakePos += 5;
      }
    
      if (keys.ArrowLeft) {
        snakePos -= 1;
      }
    
      if (keys.ArrowRight) {
        snakePos += 1;
      }
// need to remove the old snake position
    const oldSnakePos = document.querySelector(".snake");
    if(oldSnakePos) {
        oldSnakePos.classList.remove("snake");
    }
    const newSnakePos = document.getElementById(snakePos);
        newSnakePos.classList.add("snake");
};

function keyDown (e) {
    e.preventDefault();
    keys[e.key] = true;
    moveSnake();
}

function keyUp (e) {
    e.preventDefault();
    keys[e.key] = false;
}

// Render

function render() {
    createBoard();
    createFood();
    snake();
};

// Initiate

render();
