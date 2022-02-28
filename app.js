document.addEventListener('DOMContentLoaded' , () => {

const startButton = document.querySelector(".start-btn");
const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");
const scoreDisplay = document.getElementById("scoring");
const timerDisplay = document.getElementById("timer");

let birdLeft = 220;
let birdBottom = 200;
let gravity = 3;
let gameStart = false;
let gameIsOver = false;
let score = 0;
let gap = 500;

//Using a start button to start the game
const startGame = () => {
  gameStart = true;
};

startButton.addEventListener("click", startGame);

//positioning the bird in the right place
const playGame = () => {
  if (gameStart == true) {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
};

let timerId = setInterval(playGame, 20);

// using keypress event to make bird jump, specifically spacebar
const jump = () => {
  //bird needs to not go out of game display
  if (birdBottom < 370) {
    birdBottom += 60;
  }

  bird.style.bottom = birdBottom + "px";
  // console.log(birdBottom);
};

document.addEventListener("keyup", jump);

// need to make obstacle and make them spawn randomly
const createObstacles = () => {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 100;
  let obstacleBottom = randomHeight;

  const obstacle = document.createElement("div");
  const obstacleImg = document.createElement("img");
  const topObstacle = document.createElement("div");
  const obstacleImgTop = document.createElement("img");
  obstacleImg.src = "8bit pipes.png";
  obstacleImgTop.src = "8bit pipes.png";

  obstacle.classList.add("obstacle");
  gameDisplay.appendChild(obstacle);
  obstacle.appendChild(obstacleImg);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";

  
  topObstacle.classList.add("topObstacle");
  gameDisplay.appendChild(topObstacle);
  topObstacle.appendChild(obstacleImgTop);
  topObstacle.style.left = obstacleLeft + "px";
  topObstacle.style.bottom = obstacleBottom + gap + "px";

  //need to make obstacles them move towards bird
  const moveObstacle = () => {
    if (gameStart == true) {
      obstacleLeft -= 3;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";
      bird.style.bottom = birdBottom + "px";

      //obstacles need to disappear off the screen
      if (obstacleLeft == -10) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      if (birdBottom === 0) {
        gameOver();
        gameIsOver = true;
      }

      //need to make it game over if bird collides with obstacle
      if (
        obstacleLeft > 200 &&
        obstacleLeft < 280 &&
        birdLeft === 220 &&
        (birdBottom < obstacleBottom + 50 ||
          birdBottom > obstacleBottom + gap - 200)
      ) {
        gameOver();
      }
    }
  };


  //Scoring system that addes a point every time the bird jumps over an obstacle#

  const keepScore = () => {
    if (obstacleLeft < birdLeft) {
      let scoring = score++;

      scoreDisplay.innerHTML = `${scoring}`;
    }
    console.log(score);
  };

  keepScore();

  let timerId = setInterval(moveObstacle, 20);
  if (!gameIsOver) setTimeout(createObstacles, 3000);

};
createObstacles();

//Game over screen that shows final score
const gameOver = () => {
  clearInterval(timerId);
  console.log("game over");
  gameIsOver = true;
  //how you remove events
  document.removeEventListener("keyup", jump);

  let gameOverText = 200;
  const gameOverTitle = document.createElement("img");
  gameOverTitle.classList.add("game-over");
  gameOverTitle.src = "Game-Over.png";
  gameDisplay.appendChild(gameOverTitle);
  gameOverTitle.style.bottom = gameOverText + "px";
};

});