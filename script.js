/*----- constants -----*/
const grid = document.getElementById("grid");
const gridSize = 225;
const borderSize = Math.sqrt(gridSize);
const topBorder = Array.from({length: borderSize}, (_, index) => (index));
const rightBorder = Array.from({ length: borderSize }, (_, index) => (borderSize - 1) + (index * borderSize));
const btmBorder = Array.from({ length: borderSize }, (_, index) => gridSize - borderSize + index);
const leftBorder = Array.from({ length: borderSize }, (_, index) => index * borderSize);
const scoreIndex = document.getElementById("scoreindex");
const hardButton = document.getElementById("hard");
const rulesButton = document.getElementById("rules");
const openBtn = document.getElementById("openModal"); // Grabbing About the Game button
const modal = document.getElementById("modal"); // Grabbing modal element
const closeBtn = document.getElementById("close"); // Grabbing close button
const openModal = () => {
    modal.showModal()
}




/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let direction = null
let lastInputDirection = null
let score = 0
let start = false;
let intervalSpeed = 200;
let hardButtonClicked = false;
let hardInterval = null
let rulesButtonClicked = false;




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
hardButton.addEventListener("click", handleClick);
//Add event listener to About the Game button
openBtn.addEventListener("click", openModal);





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
        if (intervalSpeed >= 200) {
            score += 1;
        } else {
            score += 3;
        }
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
    autoMoveSnake(direction);
    eatBody();
    eatFood();
    growSnake();
    scoreIndex.innerText = score;
}, intervalSpeed);

function inputDirection() {
    lastInputDirection = direction
    return direction;
};

// Below are functions for managing the growing of the snake
function growSnake() {
    currentSnakeBody.push(snakePos);
    clearOld();
    for (let i = 0; i < currentSnakeBody.list.length; i++) {
        document.getElementById(currentSnakeBody.list[i]).classList.add("snake");
    };
};


function clearOld() {
    const toRemove = Array.from(document.querySelectorAll(".snake"));
    for (let i = 0; i < toRemove.length; i++) {
        toRemove[i].classList.remove("snake");
    };
};

function gameOver() {
    clearInterval(myInterval);
    clearInterval(hardInterval);
    if (confirm("Game Over! You achieve a score of " + score + ". Press Ok to restart.")){
        window.location.reload();
    };
};

function eatBody() {
    if (start === true){
    for(let i = 0; i < currentSnakeBody.list.length - 1; i++) {
        if (currentSnakeBody.list[i] === snakePos) {
            gameOver();
         };
        };
    };
};

function handleClick() {
    hardButtonClicked = true
    clearInterval(myInterval);
    if(window.confirm ("Are you sure you wanna go hard?")) {
        intervalSpeed = 80;
        hardInterval = setInterval(() => {
            autoMoveSnake(direction);
            eatBody();
            eatFood();
            growSnake();
            scoreIndex.innerText = score;
        }, intervalSpeed);
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
