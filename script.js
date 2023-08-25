/*----- constants -----*/
const grid = document.getElementById("grid");



/*----- state variables -----*/
let snakePos = 0
let foodPos = 0
let keys = {
    ArrowUp: true,
    ArrowLeft: true,
    ArrowRight: true,
    ArrowDown: true
};

/*----- cached elements  -----*/





/*----- event listeners -----*/
document.addEventListener("keydown", moveSnake);

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
    for (index = Math.floor(Math.random() * 25); index === foodPos; index = Math.floor(Math.random() * 25)) {
        index = Math.floor(Math.random() * 25);
    }
    let snake = document.getElementById(index);
    snake.classList.add("snake");
    snakePos = index;
};


function createFood() {
    let randomIndex = Math.floor(Math.random() * 25);
    let food = document.getElementById(randomIndex);
    food.classList.add("food");
    foodPos = randomIndex;
};

function eatFood() {
    if (snakePos === foodPos) {
        document.getElementById(foodPos).classList.remove("food");
        createFood();
    }
};

function moveSnake(e) {
    document.getElementById(snakePos).classList.remove("snake");
    if (keys[e.key]) {
        if (e.key === "ArrowUp") {
            snakePos -= 5;
        } else if (e.key === "ArrowDown") {
            snakePos += 5;
        } else if (e.key === "ArrowLeft") {
            snakePos -= 1;
        } else if (e.key === "ArrowRight") {
            snakePos += 1;
        } 
    };
    document.getElementById(snakePos).classList.add("snake");
    eatFood();
};




// Render

function render() {
    createBoard();
    createFood();
    snake();
};

// Initiate

render();
