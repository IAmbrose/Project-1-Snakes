/*----- constants -----*/
const grid = document.getElementById("grid");
const gridSize = 225;
const borderSize = Math.sqrt(gridSize);
const topBorder = Array.from({length: borderSize}, (_, index) => (index));
const rightBorder = Array.from({ length: borderSize }, (_, index) => (borderSize - 1) + (index * borderSize));
const btmBorder = Array.from({ length: borderSize }, (_, index) => gridSize - borderSize + index);
const leftBorder = Array.from({ length: borderSize }, (_, index) => index * borderSize);
const scoreIndex = document.getElementById("scoreindex");


/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let direction = null
let lastInputDirection = null
let score = 0
let start = false;



/*----- cached elements  -----*/
class Queue {
    constructor(size) {
        this.size = size;
        this.list =[];
    }
    push(i) { 
        this.list.push(i)
        if (this.list.length > this.size) {
            this.list.shift();
        }
    }
}


const currentSnakeBody = new Queue(3);



/*----- event listeners -----*/
document.addEventListener("keydown", moveSnake);

/*----- functions -----*/


function createBoard() {
    for (i = 0; i < gridSize; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        grid.append(box);
        box.setAttribute("id", i);
    }
};

// Function for the main snake position generation
function snake() {
    let index;
    for (index = Math.floor(Math.random() *gridSize); index === foodPos; index = Math.floor(Math.random() * gridSize)) {
        index = Math.floor(Math.random() * gridSize);
    }
    let snake = document.getElementById(index);
    snake.classList.add("snake");
    snakePos = index;
};

// Below are functions for the food
function createFood() {
    let randomIndex;
    for (randomIndex = Math.floor(Math.random() * gridSize); document.getElementById(randomIndex).classList.contains("snake"); randomIndex = Math.floor(Math.random() * gridSize)){
        randomIndex = Math.floor(Math.random() * gridSize)
    }
    let food = document.getElementById(randomIndex);
    food.classList.add("food");
    foodPos = randomIndex;
};

function eatFood() {
    if (snakePos === foodPos) {
        document.getElementById(foodPos).classList.remove("food");
        currentSnakeBody.size += 1
        score += 1
        createFood();
    }
};

// function for the movement of the snake and within bound
function moveSnake(e) {
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection === "down" || lastInputDirection === "up") return;
            moveUp();
            direction = "up";
            break;
        case "ArrowDown":
            if (lastInputDirection === "down" || lastInputDirection === "up") return;
            moveDown();
            direction = "down";
            break;
        case "ArrowLeft":
            if (lastInputDirection === "left" || lastInputDirection === "right") return;
            moveLeft();
            direction = "left";
            break;
        case "ArrowRight":
            if (lastInputDirection === "left" || lastInputDirection === "right") return;
            moveRight();
            direction = "right";
            break;
        default:
            return;
        } 
        lastInputDirection = direction;
        eatFood();
        growSnake();
        start = true
    };

function autoMoveSnake(direction) {
    switch (direction) {
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


function moveUp() {
    if (topBorder.includes(snakePos)) {
        gameOver();
    } else {
        snakePos -=borderSize;
    };
};

function moveDown() {
    if (btmBorder.includes(snakePos)) {
        gameOver();
    } else {
        snakePos +=borderSize;
    };
};

function moveLeft() {
    if (leftBorder.includes(snakePos)) {
        gameOver();
    } else {
        snakePos -=1;
    };
};

function moveRight() {
    if (rightBorder.includes(snakePos)) {
        gameOver();
    } else {
        snakePos +=1;
    };
};

const myInterval = setInterval(() => {
    eatBody();
    autoMoveSnake(direction);
    eatFood();
    growSnake();
    scoreIndex.innerText = score;
}, 200);

function inputDirection() {
    lastInputDirection = direction
    return direction;
}

// Below are functions for managing the growing of the snake
function growSnake() {
    currentSnakeBody.push(snakePos);
    clearOld();
    for (let i = 0; i < currentSnakeBody.list.length; i++) {
        document.getElementById(currentSnakeBody.list[i]).classList.add("snake");
    }
}


function clearOld() {
    const toRemove = Array.from(document.querySelectorAll(".snake"));
    for (let i = 0; i < toRemove.length; i++) {
        toRemove[i].classList.remove("snake");
    }
}

function gameOver() {
    clearInterval(myInterval);
    if (confirm("Game Over! You achieve a score of " + score + ". Press Ok to restart.")){
        window.location.reload();
    }

}

function eatBody() {
    if (start === true){
    for(let i = 0; i < currentSnakeBody.list.length - 1; i++) {
        if (currentSnakeBody.list[i] === snakePos) {
            gameOver();
         };
        };
    };
};



// Render Game

function render() {
    createBoard();
    createFood();
    snake();
};

// Initiate

render();
