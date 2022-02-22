//

const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;

//positioning the bird in the right place
function startGame() {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
}

let timerId = setInterval(startGame, 20);

// using keypress event to make bird jump
function jump() {
  birdBottom += 50;
  bird.style.bottom = birdBottom + "px";
  console.log(birdBottom);
}

document.addEventListener("keyup", jump);

// need to make obstacles and make them move
function createObstacles() {
    let obstacleLeft = 500;
    let obstacleBottom = 150;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameDisplay.appendChild(obstacle);
  obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
}

createObstacles();
