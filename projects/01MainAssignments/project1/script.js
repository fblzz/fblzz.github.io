let
	jost_italic,
	montserrat,
	prism,
	txt,
	graphic,
	x = 0,
	y = 0,
	size = 20,
	gap = 20,
	angle = 0,
	offset,
	hov_col,
	waveSpeed = 0.04,
	increment,
	nth = 10,
	i_minVal = -50,
	i_maxVal = 50,
	text_col,
	text_col_t = 255;

function preload() {
	// load the font
	jost_italic = loadFont('jost-italic.otf');
	montserrat = loadFont('Montserrat-Black.ttf');
	prism = loadModel('prism.obj', true);
	graphic = loadImage('graphic.png');
	txt = loadImage("https://media.istockphoto.com/id/1427442928/photo/blue-glass-texture.jpg?s=612x612&w=0&k=20&c=59naaey41ZhS-FDFj5f8Fdvw6hES6D820rfjykQwsas=")
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(jost_italic);
	//orbitControl();
	increment = TWO_PI / 180;
	textAlign(CENTER, CENTER);

	/*
	textTexture = createGraphics(500, 500);
	textTexture.textFont(montserrat);
	textTexture.background(255, 255, 255, 200);
	textTexture.fill(120, 197, 239, 255);
	textTexture.textSize(25);
	for(let i = 0; i <=4; i++){
		textTexture.text("Lorem Ipsum", 0, i*90);
	}
	*/
}

function draw() {
	background(0);

	hov_col = color(120, 197, 239, 255);


	push();
	// send the text behind the scene (negative Z) so 3D models can appear in front
	translate(-width / 2, -height / 2 + size, -1);
	textSize(size);
	textFont(jost_italic);
	noStroke();

	// Prepare the repeated word and how many times to draw it per row.
	const word = "studio pèz";
	const gapStr = "   "; // use a space between words to measure width naturally
	const lineWords = [];
	// Fill a line until it exceeds the width
	let accW = 0;
	while (accW < width + 200) {
		const token = word + gapStr;
		lineWords.push(token);
		accW += textWidth(token);
	}

	let anyHover = false;
	// Draw rows of text and check hover per-word
	for (let row = 0; row < Math.floor(height / size) - 1; row++) {
		let xPos = x;
		const yPos = row * size;

		// wave parameters (y-axis)
		const waveAmp = 4; // vertical amplitude in pixels
		const wavePhaseRow = row * 0.35; // phase offset per row

		for (let i = 0; i < lineWords.length; i++) {
			const token = lineWords[i];
			const w = textWidth(token);

			// compute a per-word vertical wave offset (doesn't affect horizontal spacing)
			const waveY = Math.sin(i * 0.6 + frameCount * waveSpeed + wavePhaseRow) * waveAmp;
			const drawY = yPos + waveY;
			// text() uses the baseline for the y coordinate.
			const top = drawY - textAscent();
			const bottom = drawY + textDescent();
			const left = xPos;
			const right = xPos + w;

			// mouseX and mouseY are in canvas coordinates (top-left).
			const hovered =
				mouseX >= left &&
				mouseX <= right &&
				mouseY >= top &&
				mouseY <= bottom;

			if (hovered) {
				fill(hov_col);
				anyHover = true;
			} else {
				fill(255, 255, 255, 15);
			}

			text(token, xPos, drawY);
			xPos += w;
		}
	}
	pop();



	// CONE
	/*
	push();
	translate(0, 0, 300);
	//noStroke();
	stroke(255); strokeWeight(0.1);
	pointLight(255, 255, 255, width, - windowHeight, 0);
	pointLight(120, 197, 239, mouseX, mouseY, 2000);
	rotateY(frameCount * 0.01);
	scale(6);
	shininess(200);
	texture(textTexture);
	sphere(24, 24, 2);
	pop();
	*/


	// PRISM
	/*
	push();
	translate(0, 0, 300);
	fill(255, 255, 255, 200);
	stroke(255);
	strokeWeight(5);
	pointLight(255, 255, 255, width, - windowHeight, 0);
	pointLight(120, 197, 239, mouseX, mouseY, 2000);
	rotateX(HALF_PI);
	rotateZ(frameCount * 0.01);
	scale(1.2);
	shininess(200);
	//texture(textTexture);
	model(prism);
	pop();
	*/


	// snake bottom
	for (let i = 0 - width; i < width; i += 12) {
		let offset = i / 20;
		let y = sinMovment(angle, offset, 0, 50);
		fill(255, 255, 255, 100);
		if (i % nth == 0) {
			fill(120, 197, 239, 255);
		} else {
			fill(255, 255, 255, 100);
		}
		circle(i, y + (height / 2) - 150, 10);
		circle(i, y - (height / 2) + 100, 10);
	}

	for (let i = 0 - width; i < width; i += 110) {
		let offset = i / 200;
		let y = sinMovment(angle, offset, i_minVal, i_maxVal);
		noStroke();
		texture(graphic);
		circle(-i, y, 100);
	}

	// increment angle
	angle += increment;

	
	text_col = color(255, 255, 255, text_col_t);
	fill(text_col);
	textSize(50);
	textFont(montserrat);
	text('Press mouse & see what happens!', 0, -200);

}


function sinMovment(angle, offset, minVal, maxVal) {
	let factor = sin(angle + offset);
	// Change the sinus output range (-1, 1) to another range (minVal, maxVal)
	let sinMovementVal = map(factor, -1, 1, minVal, maxVal);
	return sinMovementVal;
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {

	if (waveSpeed < 0.16) {
		waveSpeed += 0.02;
	} else {
		waveSpeed = 0.04;
	}

	if (i_maxVal < 200) {
		i_minVal -= 25;
		i_maxVal += 25;
	} else {
		i_minVal = -50;
		i_maxVal = 50;
	}

	if (nth < 20) {
		nth += 3;
	} else {
		nth = 10;
	}

	text_col_t -= 255;

	console.log(waveSpeed);
	console.log(i_minVal, i_maxVal);
	console.log(nth);	
	console.log(text_col_t);
	

}