/*----- constants -----*/
const grid = document.getElementById("grid");
const topBorder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rightBorder = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
const btmBorder = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
const leftBorder = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];



/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let direction = null
let lastInputDirection = null


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

function createFoodAgain() {
    foodPos = Math.floor(Math.random() * 100)
    for (foodPos = Math.floor(Math.random() * 100); document.getElementById(foodPos).classList.contains("snake"); foodPos = Math.floor(Math.random() * 100)){
        foodPos = Math.floor(Math.random() * 100)
    }
    let food = document.getElementById(foodPos);
    food.classList.add("food"); 
}

function eatFood() {
    if (snakePos === foodPos) {
        document.getElementById(foodPos).classList.remove("food");
        currentSnakeBody.size += 1
        createFoodAgain();
    }
};

// function for the movement of the snake and within bound
function moveSnake(e) {
    document.getElementById(snakePos).classList.remove("snake");
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection === "down" || lastInputDirection === "up") break;
            moveUp();
            direction = "up";
            break;
        case "ArrowDown":
            if (lastInputDirection === "down" || lastInputDirection === "up") break;
            moveDown();
            direction = "down";
            break;
        case "ArrowLeft":
            if (lastInputDirection === "left" || lastInputDirection === "right") break;
            moveLeft();
            direction = "left";
            break;
        case "ArrowRight":
            if (lastInputDirection === "left" || lastInputDirection === "right") break;
            moveRight();
            direction = "right";
            break;
        } 
        lastInputDirection = direction;
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
    if (snakePos < 100 || snakePos >= 0) {
        return true;
    } else {
        return false;
    };
};

function moveUp() {
    bounds(snakePos - 10) ? snakePos -= 10 : snakePos;
};
function moveDown() {
    bounds(snakePos + 10) ? snakePos += 10 : snakePos;
};
function moveLeft() {
    bounds(snakePos - 1) ? snakePos -= 1 : snakePos;
};
function moveRight() {
    bounds(snakePos + 1) ? snakePos += 1 : snakePos;
};

const myInterval = setInterval(() => {
    autoMoveSnake(direction);
    growSnake();
    eatFood();
}, 400);

function inputDirection() {
    lastInputDirection = direction
    return direction;
}

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
