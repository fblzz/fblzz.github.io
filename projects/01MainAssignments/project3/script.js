let
	r_speed = true,
	l_speed = false,
	r_r_speed = false,
	r_l_speed = true,
	jost_italic,
	montserrat,
	xPos1 = 30,
	xPos2 = 20,
	xPos3 = 10,
	yPos1,
	yPos2,
	yPos3,
	r_xPos1,
	r_xPos2,
	r_xPos3,
	r_yPos1,
	r_yPos2,
	r_yPos3,
	color,
	yPos;

function preload() {
	// load the font
	jost_italic = loadFont('jost-italic.otf');
	montserrat = loadFont('Montserrat-Black.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont(montserrat);
	//textAlign(CENTER, CENTER);
	frameRate(60);

	r_xPos1 = width - 30;
	r_xPos2 = width - 20;
	r_xPos3 = width - 10;
	yPos = height / 2;


	yPos1 = height / 4 - 100;
	yPos2 = height / 4;
	yPos3 = height / 4 + 100;

	r_yPos1 = (height/4)*3 - 100;
	r_yPos2 = (height/4)*3;
	r_yPos3 = (height/4)*3 + 100;
}

function draw() {
	background(0);

	let color = map(mouseX, 0, width, 0, 255);

	fill(color);

	textFont(montserrat);
	textSize(128);

	textAlign(LEFT, CENTER);
	text(xPos1 + " " + yPos1, xPos1, yPos1);
	text(xPos2 + " " + yPos2, xPos2, yPos2);
	text(xPos3 + " " + yPos3, xPos3, yPos3);

	textAlign(RIGHT, CENTER);
	text(r_xPos1 + " " + r_yPos1, r_xPos1, r_yPos1);
	text(r_xPos2 + " " + r_yPos2, r_xPos2, r_yPos2);
	text(r_xPos3 + " " + r_yPos3, r_xPos3, r_yPos3);

	textAlign(CENTER, CENTER);
	fill(255, 255, 255, 50);
	textSize(32);
	for (let i = 0; i <= width; i += 150) {
		for (let j = 0; j <= height; j += 32) {
			text(mouseX + " " + mouseY, i, j);
		}
	}


	if (r_speed == true) {
		xPos1 += 20;
		xPos2 += 15;
		xPos3 += 30;
	} else if (l_speed == true) {
		xPos1 -= 20;
		xPos2 -= 15;
		xPos3 -= 30;
	}

	if (xPos3 > width - 600) {
		r_speed = false;
		l_speed = true;
	} else if (xPos2 < 0) {
		r_speed = true;
		l_speed = false;
	}



	if (r_l_speed == true) {
		r_xPos1 -= 20;
		r_xPos2 -= 15;
		r_xPos3 -= 30;
	} else if (r_r_speed == true) {
		r_xPos1 += 20;
		r_xPos2 += 15;
		r_xPos3 += 30;
	}


	if (r_xPos3 < 520) {
		r_r_speed = true;
		r_l_speed = false;
	} else if (r_xPos2 > width) {
		r_r_speed = false;
		r_l_speed = true;
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}