let
	jost_italic,
	x = 0,
	y = 0,
	size = 20,
	gap = 20,
	angle = 0,
	offset = 0,
	increment;

function preload() {
	// load the font
	jost_italic = loadFont('jost-italic.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(jost_italic);
}

function draw() {
	background(0);
	fill(0);

	push();
	translate(-width / 2, -height / 2 + size);
	textSize(size);
	noStroke();
	fill(255, 255, 255, 15);
	for (let y = 0; y < height / size - 1; y++) {
		text(
			"     studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz   studio pèz ",
			x,
			y * size
		);
	}
	pop();
	
	
	//Line wave pattern
	for (let i = 0; i < width; i += 10) {
		let offset = i / 20;
		let y = sinMovment(angle, offset, 300, 370);
		circle(i, y, 5);
	}
	// increment angle
	angle += increment; 
}

function sinMovment(angle, offset, minVal, maxVal) {
  let factor = sin(angle + offset);
  // Change the sinus output range (-1, 1) to another range (minVal, maxVal)
  let sinMovementVal = map(factor, -1, 1, minVal, maxVal);
  return sinMovementVal;
}