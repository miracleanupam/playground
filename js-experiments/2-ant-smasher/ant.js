console.log("Author: AD");

// Get random number between 1 and 500 inclusive
function randomnum() {
    var x = Math.floor((Math.random() * 500) + 1);
    return x;
  }

  function randomvel() {
      var x = Math.floor((Math.random() * 16) - 8);
      return x;
    }
//Get the Main Wrapper
var mainWrapper = document.getElementById("main-wrapper");

// Style Main Wrapper
mainWrapper.style.width = '500px';
mainWrapper.style.height = '500px';
mainWrapper.style.background = 'white';
mainWrapper.style.position = 'relative';


var body = document.getElementsByTagName('body')[0];

var title = document.createElement('div');
var titlehead = document.createElement('h1');
titlehead.innerHTML = "Squash 'em all 'fore they get you!";
title.appendChild(titlehead);
body.insertBefore(title, body.childNodes[0]);
var message = document.createElement('div');
body.appendChild(message);

// Data to hold the created coordinates at random
data = [];
var antsremaining = 20;

function Ant(antbody, left, top, vx, vy){
  this.element = antbody;
  this.x = left;
  this.y = top;
  this.dx = vx;
  this.dy = vy;

  var move;
  var that = this;
  this.init = function(){
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.updatePositive();
  }

  this.updatePositive = function(){
    move = setInterval(frame,100);
    function frame(){
      if (that.x+20>=500 || that.x<=0) {
        that.dx = that.dx * -1;
      }
      if (that.y+20>=500 || that.y<=0) {
        that.dy *= -1;
      }
      that.x = that.x + that.dx;
      that.y = that.y + that.dy;
      that.element.style.left = that.x + 'px';
      that.element.style.top = that.y + 'px';
    }
  }
}

// Create 20 ants of 20px each inside Main Wrapper
// Render them in coordinates in data and random velocity
// Add onclick function to destroy them
for (var i=0; i<20; i++){
  data.push({top:randomnum(), left:randomnum(), xvel:randomvel(), yvel:randomvel()});
  var box = document.createElement('div');
  box.style.width = '20px';
  box.style.height = '20px';
  box.style.background = 'red';
  box.style.backgroundImage = "url('./images/aant.png')";
  box.style.backgroundRepeat = 'no-repeat';
  box.style.position = 'absolute';
  box.onclick = function(){
    message.innerHTML = "Hooray!! You killed one!! (Dr. Zoidberg style)";
    setTimeout(function(){
      message.innerHTML = '';
    },1500);
    mainWrapper.removeChild(this);
    antsremaining -= 1;
    if (antsremaining == 0){
      mainWrapper.innerHTML = "Congratulations!! You've smashed them all.";
      setTimeout(function(){
        message.innerHTML = "Don't gloat. You killed ants, not dinosaurs!!";
      },4000);
    }
  };
  var ant = new Ant(box, data[i].left, data[i].top, data[i].xvel, data[i].yvel);
  ant.init();
  mainWrapper.appendChild(box);
}
