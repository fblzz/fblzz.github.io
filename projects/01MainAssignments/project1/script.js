let
	jost_italic,
	size = 10,
	gap = 20,
	angle = 0,
	increment;

function preload() {
	// load the font
	jost_italic = loadFont('jost-italic.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(jost_italic);
	increment = TWO_PI / 180;
}

function draw() {
	background(255, 255, 100);
	fill(0);
	//size = map(sin(frameCount * 0.02), -1, 1, 10, 12);
	textSize(size);
	for (let i = 0; i <= 5; i++) {
		for (let j = 0; j <= 5; j++) {
			text("studio pèz", i * 100, j * gap);
		}
	}

	/*
	//Line wave pattern
	for (let i = 0; i < width; i += 10) {
		let offset = i / 20;
		let y = sinMovment(angle, offset, 300, 370);
		circle(i, y, 5);
	}
	// increment angle
	angle += increment; */
}
/*
function sinMovment(angle, offset, minVal, maxVal) {
  let factor = sin(angle + offset);
  // Change the sinus output range (-1, 1) to another range (minVal, maxVal)
  let sinMovementVal = map(factor, -1, 1, minVal, maxVal);
  return sinMovementVal;
}*/