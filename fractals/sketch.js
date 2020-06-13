PI = Math.PI
var repsCount = 8;
var angle;
var reduction;
var amt;
var w = window.innerWidth - 10;
var h = window.innerHeight - 10;

function setup() {
	if(w > h){
		c = createCanvas(h, h);
	} else if (h > w){
		c = createCanvas(w, w);
	} else {
		c = createCanvas(w, h);
	}
}

function draw() {

  angle = PI / (360/document.getElementById('angleSlider').value/2);
  console.log
  reduction = document.getElementById('reductionSlider').value;
  background(255);
  amt = document.getElementById('amtSlider').value;
  translate(width/2, height/2);
  for (i = 1; i <= amt; i++) {
	  push();
	  branch(height/8, 0);
	  pop();
	  rotate(PI/amt*2);
    }
}

function branch(len, rep) {
	line(0, 0, 0, -len);
	translate(0, -len);

	if(rep <= repsCount) {
		push();
		rotate(angle);
		branch(len/100*reduction, rep + 1);
		pop();
		push();
		rotate(-angle);
		branch(len/100*reduction, rep + 1);
		pop();

	}
}

function download() {
	saveCanvas(c, 'My Fractal', 'png');
}