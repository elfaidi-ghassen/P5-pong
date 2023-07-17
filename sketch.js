let WIDTH = 600;
let HEIGHT = 400;


function setup() {
	createCanvas(WIDTH, HEIGHT);
	console.log(leftPaddle);
}

class Paddle {
	constructor(rectX, rectWidth, rectHeight, paddleSpeed, colorArr) {
		this.rectX = rectX;
		this.rectY = HEIGHT / 2;
		this.rectWidth = rectWidth;
		this.rectHeight = rectHeight;
		this.paddleSpeed = paddleSpeed
		this.color = {
			R: colorArr[0],
			G: colorArr[1],
			B: colorArr[2] 
		}
	}
	drawPaddle() {
		stroke(this.color.R, this.color.G, this.color.B);
		rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
		stroke(0)
	}
	beyondTopWall() {
		return (this.rectY - this.rectHeight / 2) < 0
	}
	beyondBottomWall() {
		return (this.rectY + this.rectHeight / 2) > HEIGHT
	}
	movePaddle(up, down) {
		if (keyIsDown(up) && !this.beyondTopWall()) {
			this.rectY -= this.paddleSpeed;
		} else if (keyIsDown(down) && !this.beyondBottomWall()) {
			this.rectY += this.paddleSpeed;
		}
	}
}

leftPaddle = new Paddle(25, 20, 100, 4, [0, 0, 255]);
rightPaddle = new Paddle(WIDTH - 25, 20, 100, 4, [255, 0, 0]);



let circleX = 600 / 2;
let circleY = 400 / 2;
let circleXForce = 4;
let circleYForce = 4;
let circleWidth = 20;


function draw() {
	rectMode(CENTER)
	background(220);
	// draw center gray line
	stroke(100, 100, 100, 50);
	line(0, 200, 600, 200);
	leftPaddle.drawPaddle()
	rightPaddle.drawPaddle()
	rightPaddle.movePaddle(UP_ARROW, DOWN_ARROW)
	leftPaddle.movePaddle(90, 83) // 90 => Z, 83 => S


// 	stroke(0);
// 	circle(circleX, circleY, circleWidth);
// 	circleX = circleX += circleXForce;
// 	circleY = circleY += circleYForce;

// 	if (circleY + 10 >= height || circleY - 10 <= 0) {
// 		circleYForce = -circleYForce;
// 	}

// 	let rightColl = rightRectX - Math.floor(circleWidth / 2);
// 	if (
// 		between(circleX, rightColl - 2, rightColl + 2) &&
// 		circleY >= rightRectY - 20 &&
// 		circleY <= rightRectY + rectHeight + 20
// 	) {
// 		circleXForce = -circleXForce;
// 	}

// 	let leftColl = leftRectX + rectWidth + Math.floor(circleWidth / 2);

// 	if (
// 		between(circleX, leftColl - 2, leftColl + 2) &&
// 		circleY >= leftRectY - 20 &&
// 		circleY <= leftRectY + rectHeight + 20
// 	) {
// 		circleXForce = -circleXForce;
// 	}
}

// function between(x, start, end) {
// 	for (i = start; i < end; i++) {
// 		if (x == i) return true;
// 	}
// 	return false;
// }
