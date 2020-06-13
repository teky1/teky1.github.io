PI = Math.PI
var repsCount = 8;
var angle;
var reduction;
var amt;
var w = window.innerWidth - 10;
var h = window.innerHeight - 100;

function setup() {
	if(w > h){
		c = createCanvas(h, h);
	} else if (h > w){
		c = createCanvas(w, w);
	} else {
		c = createCanvas(w, h);
	}
	c.parent('canvasDiv')
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
	// x = saveCanvas(c, 'My Fractal', 'png');
	/*canvas = document.getElementById('defaultCanvas0');
	console.log(canvas);
	x = canvas.toDataURL('image/png');
	console.log(x)
	if (navigator.share) {
	    navigator.share({
	      title: 'WebShare API Demo',
	      url: x,
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    saveCanvas(c, 'My Fractal', 'png');
  }*/
}

function randomRange(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function randomFractal() {
	document.getElementById('angleSlider').value = randomRange(1, 180);
	document.getElementById('reductionSlider').value = randomRange(1, 100);
	document.getElementById('amtSlider').value = randomRange(1, 8);
	document.getElementById('angle').textContent = document.getElementById('angleSlider').value;
	document.getElementById('reduction').textContent = document.getElementById('reductionSlider').value;
	document.getElementById('amt').textContent = document.getElementById('amtSlider').value;
}
