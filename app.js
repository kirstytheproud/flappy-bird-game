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

//Using a start button to start the game
const startGame = () => {
  gameStart = true;

  const timerCountdown = () => {
    let sec = 30;
    let timer = setInterval(function(){
        timerDisplay.innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
timerCountdown();
}




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
  let topObstacleLeft = 500;
  let randomHeight2 = Math.random() * -100;
  let topObstacleBottom = randomHeight2;

  
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameDisplay.appendChild(obstacle);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";

  // const topObstacle = document.createElement("div");
  // topObstacle.classList.add("topObstacle");
  // gameDisplay.appendChild(topObstacle);
  // topObstacle.style.left = topObstacleLeft + "px";
  // topObstacle.style.top = topObstacleBottom + "px";

  //need to make obstacles them move towards bird
  const moveObstacle = () => {
    if (gameStart == true) {
      obstacleLeft -= 3;
      obstacle.style.left = obstacleLeft + "px";
      // topObstacleLeft -= 4;
      // topObstacle.style.left = topObstacleLeft + "px"

      //obstacles need to disappear off the screen
      if (obstacleLeft == -10) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
      }

      if (
        (obstacleLeft > 200 && obstacleLeft < 200 && birdLeft === 220) ||
        birdBottom === 0
      ) {
        gameOver();
      }
    }
  };

  //Need a scoring system that addes a point every time the bird jumps over an obstacle#

  const keepScore = () => {
    if (obstacleLeft > birdLeft) {
      let scoring = score++;
      
      scoreDisplay.innerHTML = `${scoring}`;
    }
    console.log(score);
  };

  keepScore();


  let timerId = setInterval(moveObstacle, 20);
  if ((gameIsOver = true)) {
    setTimeout(createObstacles, 3000);
  }
};

createObstacles();

//Game over screen that shows final score
const gameOver = () => {
  clearInterval(timerId);
  console.log("game over");
  gameIsOver = true;
  //how you remove events
  document.removeEventListener("keyup", control);
};

//Add a time limit
