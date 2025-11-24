let
	jost_italic,
	prism, txt,
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
	prism = loadModel('prism.obj', true);
	txt = loadImage("https://media.istockphoto.com/id/1427442928/photo/blue-glass-texture.jpg?s=612x612&w=0&k=20&c=59naaey41ZhS-FDFj5f8Fdvw6hES6D820rfjykQwsas=")
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(jost_italic);
	orbitControl();
}

function draw() {
	background(0);



	push();
	// send the text behind the scene (negative Z) so 3D models can appear in front
	translate(-width / 2, -height / 2 + size, -1);
	textSize(size);
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
		const waveSpeed = 0.04; // how fast the wave moves
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
				fill(120, 197, 239, 255); // bright color when hovered
				anyHover = true;
			} else {
				fill(255, 255, 255, 15); // default faint text
			}

			text(token, xPos, drawY);
			xPos += w;
		}
	}
	pop();



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
	//texture(txt);
	model(prism);
	pop();

	}