/*----- constants -----*/
const grid = document.getElementById("grid");



/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let direction = null

/*----- cached elements  -----*/
class Queue {
    constructor(size) {
        this.size = size;
        this.list =[];
        this.push = function push(i) {
            this.list.push(i)
            if (this.list.length > this.size) {
                this.list.shift();
            }
        }
    }
}
const currentSnakeBody = new Queue(2);
const tail = new Queue(2);




/*----- event listeners -----*/
document.addEventListener("keydown", moveSnake);

/*----- functions -----*/


function createBoard() {
    for (i = 0; i < 100; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        grid.append(box);
        box.setAttribute("id", i);
    }
};

// Function for the main snake position generation
function snake() {
    let arr = Array.from({length:100});
    let index = Math.floor(Math.random() * 100);
    for (index = Math.floor(Math.random() * 100); index === foodPos; index = Math.floor(Math.random() * 100)) {
        index = Math.floor(Math.random() * 100);
    }
    let snake = document.getElementById(index);
    snake.classList.add("snake");
    snakePos = index;
};

// Below are functions for the food
function createFood() {
    let randomIndex = Math.floor(Math.random() * 100);
    let food = document.getElementById(randomIndex);
    food.classList.add("food");
    foodPos = randomIndex;
};

function eatFood() {
    if (snakePos === foodPos) {
        document.getElementById(foodPos).classList.remove("food");
        currentSnakeBody.size += 1
        createFood();
    }
};

// function for the movement of the snake and within bound
function moveSnake(e) {
    document.getElementById(snakePos).classList.remove("snake");
    switch (e.key) {
        case "ArrowUp":
            moveUp();
            direction = "up";
            break;
        case "ArrowDown":
            moveDown();
            direction = "down";
            break;
        case "ArrowLeft":
            moveLeft();
            direction = "left";
            break;
        case "ArrowRight":
            moveRight();
            direction = "right";
            break;
        } 
        eatFood();
        growSnake();
        document.getElementById(snakePos).classList.add("snake");
    };

function autoMoveSnake(e) {
    switch (e) {
        case "up":
            moveUp();
            break;
        case "down":
            moveDown();
            break;
        case "left":
            moveLeft();
            break;
        case "right":
            moveRight();
            break;   
    };
};

function bounds(snakePos) {
    if (snakePos > 100 || snakePos < 0) {
        return true;
    } else {
        return false;
    };
};

function moveUp() {
    bounds(snakePos - 10) ? snakePos : snakePos -= 10;
};
function moveDown() {
    bounds(snakePos + 10) ? snakePos : snakePos += 10;
};
function moveLeft() {
    bounds(snakePos - 1) ? snakePos : snakePos -= 1;
};
function moveRight() {
    bounds(snakePos + 1) ? snakePos : snakePos += 1;
};

const myInterval = setInterval(() => {
    autoMoveSnake(direction);
    growSnake();
    eatFood();
}, 400);



// Below are functions for managing the growing of the snake
function growSnake() {
    body();
    clearOld();
    currentSnakeBody.list.map((i) => document.getElementById(i).classList.add("snake"));
};

function body() {
    currentSnakeBody.push(snakePos);
    tail.push(currentSnakeBody.list[0]);
};

function clearOld() {
    tail.list.map(i => document.getElementById(i).classList.remove("snake"));
}






// Render Game

function render() {
    createBoard();
    createFood();
    snake();
};

// Initiate

render();
