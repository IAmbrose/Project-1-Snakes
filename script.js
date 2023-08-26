/*----- constants -----*/
const grid = document.getElementById("grid");



/*----- state variables -----*/
let snakePos = 0
let foodPos = 0


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

// function for the movement of the snake
function moveSnake(e) {
    document.getElementById(snakePos).classList.remove("snake");
    switch (e.key) {
        case "ArrowUp":
            snakePos -= 10;
            break
        case "ArrowDown":
            snakePos += 10;
            break
        case "ArrowLeft":
            snakePos -= 1;
            break
        case "ArrowRight":
            snakePos += 1;
            break
        } 
        eatFood();
        growSnake();
        document.getElementById(snakePos).classList.add("snake");
    };

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






// Render

function render() {
    createBoard();
    createFood();
    snake();
};

// Initiate

render();
