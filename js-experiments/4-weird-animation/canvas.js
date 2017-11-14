var canvas = document.getElementById("myCanvas");
canvas.style.background = '#ff0000';
var ctx = canvas.getContext("2d");
// To control the staring phase of each layer
var phase = 0;
// Control speed
var speed = 0.00001;
// Count each frame, use it to control phase
var frameCount= 0;
// Maximum circle size
var maxCircleSize = 10;
// No of rows
var rows =11;
// No of columns
var cols =15;
// No of layers
var layers =2;

function drawBall(){
  // Clear canvas
	ctx.clearRect(0,0,canvas.width,canvas.height);
  // Compute phase
	phase = frameCount * speed;
  // Phase for each layer
	var lPhase = phase;
  // Draw circles for each columns
	for(var c=0; c<cols; c++){
    // Compute offset for each colums, gets the height difference
		cOffset = (c*Math.PI*2)/cols;
    // Point to draw each column
		var x = 50 + 25*c;
    // Draw rows
		for(var r = 0; r < rows; r++){
			ctx.beginPath();
      // Point to draw each row
			var y = 100+r*10+	Math.sin(lPhase+cOffset)*75;
      // Increase frame count
			frameCount++;
      // Compute the difference in size of circles in a row, grows smaller or bigger
			var sizeOffset = (Math.cos(lPhase-(r/rows)+cOffset)+1)*0.5;
      // Compute size of circles according to the offset
			var circleSize = sizeOffset * maxCircleSize;
      // Draw Circles
			ctx.arc(x,y, circleSize, 0, Math.PI*2, false);
			ctx.fillStyle = "#f59190";
			ctx.fill();
			}
		}
    // Invert the phase of seacond layer by PI radians
		var lPhase = phase +Math.PI;
		for(var c=0; c< cols; c++){
			cOffset = (c*Math.PI*2)/cols;
			var x = 50 + 25*c;
			for(var r = 0; r < rows; r++){
				ctx.beginPath();
				var y = 100+r*10+	Math.sin(lPhase+cOffset)*75;
				frameCount++;
				var sizeOffset = (Math.cos(lPhase-(r/rows)+cOffset)+1)*0.5;
				var circleSize = sizeOffset * maxCircleSize;
				ctx.arc(x,y, circleSize, 0, Math.PI*2, false);
				ctx.fillStyle = "#f59190";
				ctx.fill();

			}
		}

	ctx.closePath();
}

setInterval (drawBall,1);
