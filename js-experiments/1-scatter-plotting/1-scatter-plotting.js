console.log("Author: AD");

// Get random number between 1 and 500 inclusive
function randomnum() {
    var x = Math.floor((Math.random() * 500) + 1);
    return x;
  }

//Get the Main Wrapper
var mainWrapper = document.getElementById("main-wrapper");

// Style Main Wrapper
mainWrapper.style.width = '500px';
mainWrapper.style.height = '500px';
mainWrapper.style.background = 'blue';
mainWrapper.style.position = 'relative';

// Add ul item to body of html
var list = document.createElement('ul');
var body = document.getElementsByTagName('body')[0];
body.appendChild(list);

// Add the coordinates of the clicked box to the list above
function createlistitem(top,left){
  var listItem = document.createElement('li');
  listItem.innerHTML = '('+left+','+top+')';
  list.appendChild(listItem)
}

// Data to hold the created coordinates at random
data = [];

// Create 20 red square boxes of 10px each inside Main Wrapper
// Add class 'boxes' to these squares
// Render them in coordinates in data
// Add onclick function to destroy them
for (var i=0; i<20; i++){
  data.push({top:randomnum()+'px', left:randomnum()+'px'});
  var box = document.createElement('div');
  box.style.width = '10px';
  box.style.height = '10px';
  box.style.background = 'red';
  box.setAttribute('class', 'boxes');
  box.style.position = 'absolute';
  box.style.top = data[i].top;
  box.style.left = data[i].left;
  // Use 'this', not 'box'; else same cordinate values will
  // be passed for destruction
  box.onclick = function(){
    createlistitem(this.style.left, this.style.top);
    mainWrapper.removeChild(this);
  };
  mainWrapper.appendChild(box);
}
