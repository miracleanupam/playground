console.log('Author: AD');
//Style Main Wrapper
var mainWrap = document.getElementById('main-wrapper');
mainWrap.style.width = '500px';
mainWrap.style.height = '500px';
mainWrap.style.overflow = 'hidden';
// mainWrap.style.background = 'blue';

//Create Buttons and Append them to 'body'
var body = document.getElementsByTagName('body')[0];
var leftbutton = document.createElement('button');
leftbutton.innerHTML = "<==";
leftbutton.onclick = function(){
  animateright();
};
body.appendChild(leftbutton);

// Do same thing for right button
var rightbutton = document.createElement('button');
rightbutton.innerHTML = "==>";
rightbutton.onclick = function(){
  animateleft()
};
body.appendChild(rightbutton);

// Add Buttons for image selection
for (var j=0; j<4; j++){
  var btn = document.createElement('button');
  btn.innerHTML = j+1;
  btn.onclick = function(){
    var current = this.innerHTML;
      jump(current);
  };
  body.appendChild(btn);
}

// List to hold the names of images to be changed dynamiclly
var imagesnames = [
  'mountain1.jpg',
  'mountain2.jpg',
  'mountain3.jpg',
  'mountain4.jpg'
]

// Create ul to store imagesnames
var imgul = document.createElement('ul');
imgul.style.listStyle = 'none';
imgul.style.paddingLeft = '0px';
imgul.style.height = '500px';
imgul.style.width = '2500px';
imgul.style.margin = '0px';
for (var i=0; i<imagesnames.length; i++){
  var listitem = document.createElement('li');
  // listitem.style.display = "inline-block";
  var listimg = document.createElement('img');
  listimg.setAttribute("src",imagesnames[i]);
  listimg.style.width = '500px';
  listimg.style.height = '500px';
  imgul.appendChild(listitem);
  listitem.appendChild(listimg);
}
var listitem = document.createElement('li');
// listitem.style.display = "inline-block";
var listimg = document.createElement('img');
listimg.setAttribute("src",imagesnames[0]);
listimg.style.width = '500px';
listimg.style.height = '500px';
imgul.appendChild(listitem);
listitem.appendChild(listimg);

mainWrap.appendChild(imgul);


// Animation
function animateleft() {
  var id = setInterval(frame, 5);
  var counter = 1;
  function frame() {
    if (counter%500==0) {
      clearInterval(id);
    } else {
      var style = window.getComputedStyle(imgul);
      var lmargin = style.getPropertyValue('margin-left');
      nlmargin = parseInt(lmargin);
      if (nlmargin == -2000){
        console.log("barabar");
        nlmargin = 0;
      }
      console.log(lmargin, nlmargin);
      newlmargin = nlmargin-10 +'px';
      imgul.style.marginLeft = newlmargin;
      counter = nlmargin-10;
    }
  }
}

function animateright() {
  var id = setInterval(frame, 5);
  var counter = 1;
  function frame() {
    if (counter % 500 == 0) {
      clearInterval(id);
    } else {
      var style = window.getComputedStyle(imgul);
      var lmargin = style.getPropertyValue('margin-left');
      nlmargin = parseInt(lmargin);
      if(nlmargin == 0){
        nlmargin = -2000;
      }
      newlmargin = nlmargin+10 +'px';
      imgul.style.marginLeft = newlmargin;
      counter = nlmargin+10;
    }
  }
}

function jump(index) {
  var id = setInterval(frame, 5);
  var counter = 0;
  function frame() {
    if (counter == 50) {
      clearInterval(id);
    } else {
      var newlmargin = (index-1) * -500;
      imgul.style.marginLeft = newlmargin;
      counter+=1;
    }
  }
}







//
//
// // Function to change the image
// var current = 0;
// var changeimage = function(){
//   animateleft();
// }
