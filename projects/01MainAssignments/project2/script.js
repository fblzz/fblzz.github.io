let
	bg,
	xPos = 0,
	yPos = 0,
	speed = 3,
	i_textSize = 50,
	target_yPos = 120,
	montserrat,
	l_count = 0,
	w_count = 0,
	wins,
	lives;

function preload() {
	montserrat = loadFont('Montserrat-Black.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	bg = color(0);
}

function draw() {
	background(bg);

	push();
	noStroke();
	textAlign(CENTER, CENTER);
	textFont(montserrat);
	textSize(i_textSize)
	fill(255, 255, 255, 255);
	text("CHANGE TEXT SIZE!", width / 2, height / 4);
	textSize(i_textSize / 2)
	text(`CURRENT SIZE: (${i_textSize})`, width / 2, height / 4 + i_textSize);
	pop();


	yPos = (height / 2) + 60 + (mouseY / 4);
	ellipse(xPos + 260, yPos, 50, 3); // bullet
	xPos = xPos + speed;

	push();
	translate(width, height / 2);
	fill(255, 255, 255);
	ellipse(-50, target_yPos, 10, 50); // target
	pop();


	// target position
	const targetX = width - 50;
	const targetY = (height / 2) + target_yPos;

	// bullet position
	const bulletX = xPos + 260;
	const bulletY = yPos;

	// check collision
	const distance = dist(bulletX, bulletY, targetX, targetY);
	if (distance < 50) {
		speed += 4;
		xPos = 0;
		i_textSize += 10;
		console.log("TARGET HIT!");
		target_yPos = random(0, 300);
	}


	if (xPos >= width - 50) {
		xPos = 0;
		i_textSize -= 10;
		speed += 2;
		console.log("MISS!");
		target_yPos = random(0, 300);
	}

	push();
	textAlign(CENTER, CENTER);
	textSize(16);
	fill(255, 255, 255);
	text(lives, width / 2, 50);
	pop();


	push();
	textAlign(CENTER, CENTER);
	textSize(16);
	fill(255, 255, 255);
	text(wins, width / 2, 100);
	pop();



	if (i_textSize <= 10) {
		i_textSize = 50;
		speed = 3;
		l_count++;
	}

	if (i_textSize >= 100) {
		i_textSize = 50;
		speed = 3;
		w_count++;
	}


	if (l_count == 0) {
		lives = "❤️❤️❤️";
	} else if (l_count == 1) {
		lives = "❤️❤️";
	} else if (l_count == 2) {
		lives = "❤️";
	} else if (l_count >= 3) {
		lives = "💀 GAME OVER 💀";
		speed = 0;
		i_textSize = 0;
	}

	if (w_count == 0) {
		wins = "";
	} else if (w_count == 1) {
		wins = "👑";
	} else if (w_count == 2) {
		wins = "👑👑";
	} else if (w_count >= 3) {
		wins = "👑 YOU'RE A GOD! 👑";
		speed = 0;
		i_textSize = 100;
	}




	stick(150, height / 2);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function stick(x, y) {

	//https://editor.p5js.org/creativecoding/sketches/OwySvDH9i
	push();
	translate(x, y);
	scale(3);

	fill(255);
	stroke(255);
	strokeWeight(6);

	// Draw body and head of stick figure
	translate(0, 0);
	line(0, 25, 0, 60);
	ellipse(0, 15, 20, 20);

	// Draw Arms
	push();
	translate(0, 30);
	rotate(radians(60));
	line(0, 0, 10, -30); //right
	rotate(radians(60));
	line(0, 0, 30, 0); // left
	pop();

	// Draw Legs
	translate(0, 60);
	rotate(radians(70));
	line(0, 0, 40, 0);
	rotate(radians(40));
	line(0, 0, 40, 0);

	//Draw Gun
	push();
	scale(0.5);
	strokeWeight(4);
	translate(-100, -50);
	rotate(radians(70));
	fill(50);
	rect(0, 0, 30, 10);
	rect(15, -5, 10, 20); // grip
	pop();
	pop();
}

function mousePressed() {
	speed++;
}
