# Project-1-Snakes

## Project Brief

### MVP - Minimum Viable Product

- Built with HTML, CSS and JavaScript
- Use Javascript for DOM manipulation
- Hosted on Github pages
- Commits to GitHub frequently
- A read.me file to explain the technologies used, how the game works, a link to my live site etc.
- The basic functions of the game should be running, the snake is able to eat the food, and the snake is able to die when it touches the border or its body.
- Able to be displayed in the browser.

## Timeframe

1 week

## Technologies & Tools Used

- HTML
- CSS
- JavaScript
- GitHub

## Game Description

Snakes is an old school classic game where the player controls a long snake to roam around a bordered plane to pick up food, while trying to avoid hitting its own tail or the borders of the playing area.

## Wireframe

<img width="986" alt="image" src="https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/1fc3bcec-9c7b-4900-87c9-f1bac003134f">

## Current layout of game

### Pre-Game (Starts at Normal mode - Speed interval at 200)
![image](https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/a76c43b1-e89e-4d67-9fcd-f1bd034bf26b)

### Hard Mode (Speed interval at 80)

#### Prompt

<img width="334" alt="image" src="https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/aca61f4c-73dc-415e-9fee-eb4850ef9c74">

![image](https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/de434609-6a3a-455c-b9f7-de978516c0a0)

### Hardcore Mode (Speed interval at 70 with obstacles)

#### Prompt

<img width="332" alt="image" src="https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/595918cc-736c-45f7-8b45-6dbde4960a60">

![image](https://github.com/IAmbrose/Project-1-Snakes/assets/139415730/d1054f8d-9a9d-4a4c-aa96-62cff08175ff)

## How to play the game:

- First click the "rules" button to view the rules of the game and what the various modes are about.
- The game starts at default mode "Normal", press any arrowkeys to start the game. The game will be played only with the arrowkeys to direct the snake to eat the food. In this mode, you will gain 1 point for each food eaten.
- If the game is too easy, you can try hard mode, the speed is alot faster, and you will gain 3 points for each food eaten.
- Still too easy? Try hardcore mode, the speed is slightly faster and obstacles will spawn in random areas of the map. You will gain 5 points for each food eaten.

## Deployment

The game is deployed on GitHub Pages, and you can play the game here:
https://iambrose.github.io/Project-1-Snakes/

## Favourite JS function

My favourite JS functions has got to be the functions that move the snake. There are multiple functions that go hand-in-hand to allow the snake to move based on the event listener of clicking the arrowkeys
and also the set interval function that automates the moving of the snake. It's my favourite because along the way as the game develops and I implement more ideas to the game, I had to constantly change/update these 
functions, however with every updates there are always oversights leading to some bugs. Thus it was quite fulfulling to try and resolve these bugs and see how it all plays out.

## Key Challenges

One of the challenges I faced was to figure out how to make the snake maintain its shape while moving. Also had to ensure that the snake could not go the opposite direction and kill itself.

## Key Learnings
There are definitely several key takeaways from this project, considering it's my first. It has significantly increase my comprehension of functions, loops and conditional statements. It has also open my awareness of how
these components can come together to create a game. Furthermore, it really emphasis the crucial nature of the planning stage. Without proper planning, I would have definitely felt lost and wasted a significant amount of time trying to figure things out on the go.

## Future Features

- Create a leaderboard for the game.
- Create more unique game featues such as an extra life/ invulnerability.
- Create a tier list for different food that will increase your score and not just dependent on the game mode, however these food will only be available for a limited amount of time.

## Credit Resources

### Concept of utilizing arrowkeys: 

https://stackoverflow.com/questions/62322739/arrow-keys-in-car-game

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

https://stackoverflow.com/questions/6620949/difference-between-return-and-break-statements

### Reloading of page for restarting of game:
https://stackoverflow.com/questions/16955019/how-to-reload-a-page-after-the-ok-click-on-the-alert-page

### Handling clicking for the game modes:
https://bobbyhadz.com/blog/javascript-check-if-element-was-clicked#:~:text=Copied!-,const%20button%20%3D%20document.,)%20%7B%20return%3B%20%7D%20console

### Forming the snake body using the queue concept:
https://www.youtube.com/watch?v=TYRnkdrOxhk

### Game Background Image:
https://www.pinterest.com/pin/325455510543751450/
