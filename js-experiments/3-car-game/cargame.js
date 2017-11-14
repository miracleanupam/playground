console.log('Author: AD');

var body = document.getElementsByTagName('body')[0];
var mainWrap = document.getElementById('main-wrapper');

// Game wrapper
var gameWrap = document.createElement('div');
gameWrap.style.width = '840px';
gameWrap.style.height = '650px';
gameWrap.style.position = 'relative';
gameWrap.style.background = "url('./background.png')";
gameWrap.style.backgorundRepeat = 'repeat-y';
gameWrap.style.overflow = 'hidden';
mainWrap.appendChild(gameWrap);

// Scoreboard
let scoreboard = document.createElement('div');
scoreboard.style.background = 'aqua';
scoreboard.style.width = '100px';
scoreboard.style.height = '20px';
scoreboard.style.textAlign = 'center';
scoreboard.style.position = 'absolute';
scoreboard.style.zIndex = 30;
scoreboard.style.top = '0px';
scoreboard.style.left = '0px';
scoreboard.innerHTML = '0';
gameWrap.appendChild(scoreboard);

// Reset Button
var resetButton = document.createElement('button');
resetButton.innerHTML = 'RESET';
resetButton.onclick = function(){
  window.location.reload();
};
mainWrap.appendChild(resetButton);

// Function to get random number for position of the obstacles
// Var x gives the lane on which obstacle will appear
// Convert it to the lane cordinates and then render
function randomnum() {
    var x = Math.floor(Math.random() * 4);
    x = 185 + x * 130;
    return x;
  }

// Car Definition
function Car(posx){
  this.x = posx; this.y = 550;
  var that = this;

  this.createCar = function() {
    var car = document.createElement('div');
    car.style.width = '90px';
    car.style.height = '90px';
    car.style.position = 'absolute';
    car.style.left = this.x + 'px';
    car.style.top = this.y +'px';
    car.style.background = "url('./car.png')";
    car.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(car);
    return car;
  }

  this.element = this.createCar();

  this.updatePositionX = function(offset){
    this.x += offset;
    this.element.style.left = this.x + 'px';
  }

  this.str = function(){
    return this.posx;
  }
}

// Obstacle Definition
function Obstacle(posx){
  this.x = posx; this.y = -90;
  var that = this;

  this.createObstacle = function(){
    var obstacle = document.createElement('div');
    obstacle.style.width = '90px';
    obstacle.style.height = '90px';
    obstacle.style.position = 'absolute';
    obstacle.style.left = this.x + 'px';
    obstacle.style.top = this.y + 'px';
    obstacle.style.background = "url('./obstacle1.png')";
    obstacle.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(obstacle);
    return obstacle;
  }

  this.element = this.createObstacle();

  this.updatePosition = function() {
    this.y += 2;
    this.element.style.top = this.y + 'px';
    if (this.y >= 640){
      gameOver();
    }
  }

  this.kill = function(){
    gameWrap.removeChild(this.element);
    delete this;
  }

  this.str = function(){
    return this.posx + ' px ' + this.posy;
  }
}

// Food
function Food(posx) {
  this.x = posx; this.y = -90;

  this.createFood = function(){
    var food = document.createElement('div');
    food.style.width = '90px';
    food.style.height = '90px';
    food.style.position = 'absolute';
    food.style.left = this.x + 'px';
    food.style.top = this.y + 'px';
    food.style.background = "url('./food.png')";
    food.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(food);
    return food;
  }

  this.element = this.createFood();

  this.updatePosition = function() {
    this.y += 2;
    this.element.style.top = this.y + 'px';
    if (this.y >= 640){
      gameOver();
    }
  }

  this.kill = function(){
    gameWrap.removeChild(this.element);
    // this = null;
    delete this;
  }
}

// Bullet Definition
function Bullet(posx, posy){
  this.x = posx; this.y = posy;
  var that = this;

  this.createBullet = function(){
    var bullet = document.createElement('div');
    bullet.style.width = '20px';
    bullet.style.height = '20px';
    bullet.style.position = 'absolute';
    bullet.style.left = this.x + 'px';
    bullet.style.top = this.y + 'px';
    bullet.style.background = "url('./bullet.png')";
    bullet.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(bullet);
    return bullet;
  }

  this.element = this.createBullet();

  this.updatePosition = function(){
    this.y -= 2;
    this.element.style.top = this.y + 'px';
    if (this.y <= 0) {
      allBullets.splice(allBullets.indexOf(this),1);
      this.kill()
    }
  }

  this.kill = function(){
    gameWrap.removeChild(this.element);
    delete this;
  }
}

// Check Collision
var checkCollision = function(object1, object2){
  if(object2.y + 90 >= object1.y && object2.y <= object1.y + 90 && object2.x + 90 >= object1.x && object2.x <= object1.x + 90){
    return 1;
  }
}

// Things to do when game ends
var gameOver = function(){
  clearInterval(backgroundInterval);
  clearInterval(obstacleInterval);
  document.onkeydown = null;
  var gyamover = document.createElement('div');
  gyamover.style.background = 'red';
  gyamover.style.width = '840px';
  gyamover.style.height= '150px';
  gyamover.style.position = 'relative';
  gyamover.style.left = '0%';
  gyamover.style.top = '30%';
  gyamover.style.textAlign = 'center';
  gyamover.style.fontSize = '50px';
  gyamover.innerHTML = 'GAME OVER <br> Your Score is: '+score;
  gameWrap.appendChild(gyamover);
  console.log("Game Over");
}

// get score
var score = 0;

// createCar
var car1 = new Car(185);
var car2 = new Car(445);

// Store all obstacles
var allObstacles = [];

// Store all bullets
var allBullets = [];

// Store all Foods
var allFoods = [];

// Speed Controller, less its value, faster the game
var speed = 12;

// Move background
var increment=0;
var backgroundInterval = setInterval(function(){
  // Move background
  gameWrap.style.backgroundPosition = '0px '+increment+'px';
  // Move Obstavles
  allObstacles.forEach(function(obs){
    obs.updatePosition();
  });
  // Move Foods
  allFoods.forEach(function(food){
    food.updatePosition();
  });
  // Move Bullets
  allBullets.forEach(function(bull){
    bull.updatePosition();
  });
  // End game when either car hits an obstacle
  allObstacles.forEach(function(obs){
    if (checkCollision(obs, car1)) {
      gameOver();
    }
    if (checkCollision(obs, car2)) {
      gameOver();
    }
    // Destroy obstacle when it is hit by a bullet
    // Destroy the bullet too
    allBullets.forEach(function(bull){
      if (checkCollision(obs, bull)){
        obs.kill();
        allObstacles.splice(allObstacles.indexOf(obs),1);
        bull.kill();
        allBullets.splice(allBullets.indexOf(bull),1);
      }
    });
  });
    // End game when food is hit by a bullet
  allFoods.forEach(function(food){
    if (checkCollision(food, car1)) {
      food.kill();
      allFoods.splice(allFoods.indexOf(food),1);
    }
    if (checkCollision(food, car2)) {
      food.kill();
      allFoods.splice(allFoods.indexOf(food),1);
    }
    allBullets.forEach(function(bull){
      if (checkCollision(food, bull)) {
        gameOver();
      }
    });
  });
  // Update speed display
  scoreboard.innerHTML = score;
  // Offset to move background
  increment += 2;
},10);

// Load obstacle every 3 seconds at random lane
var obstacleInterval = setInterval(function(){
  var option = Math.floor(Math.random() * 2);
  if (option == 0) {
    obstacleLane = randomnum();
    obs = new Obstacle(obstacleLane);
    allObstacles.push(obs);
  }else{
    foodLane = randomnum();
    food = new Food(foodLane);
    allFoods.push(food);
  }
  score ++;
},1000);

// Control two cars
var car1lane = 0;
var car2lane = 0;

// Check keyboard press
// Arrow keys (37,..,40) control car on the left
// ASDF (65, 68,87) contol car on the right
document.onkeydown = function(event){
  switch (event.keyCode) {
    // <- Arrow
    case 37:
      // Check the lane the car is in, if permitted move, else do nothing
      if (car2lane == 0) {
        break;
      }
      car2lane=0;
      car1.updatePositionX(-130)
      break;
    // -> Arrow
    case 39:
      if (car2lane == 1) {
        break
      }
      car2lane = 1;
      car1.updatePositionX(130);
      break;
    // A
    case 65:
      if (car1lane == 0) {
        break;
      }
      car1lane = 0;
      car2.updatePositionX(-130)
      break;
    // D
    case 68:
      if (car1lane == 1) {
        break
      }
      car1lane = 1;
      car2.updatePositionX(130);
      break;
    // W
    case 87:
      // Fire bullet from the mouth of the respective car
      var bull = new Bullet(car2.x+35, car2.y);
      allBullets.push(bull);
      break;
    // Up arrow
    case 38:
      var bull = new Bullet(car1.x +35, car1.y);
      allBullets.push(bull);
      break;
    default:
      console.log('Unknown Key Pressed!!');
  }
};
