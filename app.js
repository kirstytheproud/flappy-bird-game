const startButton = document.querySelector(".start-btn");
const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");

let birdLeft = 220;
let birdBottom = 100;
let gravity = 3;

//Using a start button to start the game

//positioning the bird in the right place
const startGame = () => {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
};

let timerId = setInterval(startGame, 20);

startButton.addEventListener("click", startGame);

// using keypress event to make bird jump, specifically spacebar
const jump = () => {
  //bird needs to not go out of game display
  if (birdBottom < 370) {
    birdBottom += 60;
  }

  bird.style.bottom = birdBottom + "px";
  console.log(birdBottom);
};

document.addEventListener("keyup", jump);



// need to make obstacle and make them spawn randomly
const createObstacles = () => {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 100;
  let obstacleBottom = randomHeight;
  let topObstacleLeft = 500;
  let randomHeight2 = Math.random() * - 100;
  let topObstacleBottom = randomHeight2;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameDisplay.appendChild(obstacle);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";   

  const topObstacle = document.createElement("div");
  topObstacle.classList.add("topObstacle");
  gameDisplay.appendChild(topObstacle);
  topObstacle.style.left = topObstacleLeft + "px";
  topObstacle.style.top = topObstacleBottom + "px";

//need to make obstacles them move towards bird
const moveObstacle = () => {
  obstacleLeft -= 3;
  obstacle.style.left = obstacleLeft + "px"
  topObstacleLeft -= 4;
  topObstacle.style.left = topObstacleLeft
  
  
  //obstacles need to disappear off the screen
  if(obstacle == -10){
    clearInterval(timerId);
    gameDisplay.removeChild(obstacle);
  }
};
let timerId = setInterval(moveObstacle, 20);
setTimeout(createObstacles, 3000);
};

createObstacles();


const gameOver = () => {
  clearInterval(timerId);

}


//Need a scoring system that addes a point every time the bird jumps over an obstacle

//Add a time limit

//Game over screen that shows final score
