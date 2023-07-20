let WIDTH = 600;
let HEIGHT = 400;
let margin = 10;
let blip, wallBlip, goal;
function preload() {
	wallBlip = loadSound("blip2.wav")
	blip = loadSound("blip2.wav")
	goal = loadSound("goal.wav")
}

// Perlin noise offset
let rOff = Math.random() * 1000
let gOff = Math.random() * 1000
let bOff = Math.random() * 1000

function setup() {
	createCanvas(WIDTH, HEIGHT);
	frameRate(60)
}

class Paddle {
	constructor(positionX, elementWidth, elementHeight, speed, color) {
		this.positionX = positionX;
		this.positionY = HEIGHT / 2;
		this.elementWidth = elementWidth;
		this.elementHeight = elementHeight;
		this.speed = speed;
		this.leftEdge = this.positionX - this.elementWidth / 2;
		this.rightEdge = this.positionX + this.elementWidth / 2;
		this.topEdge = this.positionY - this.elementHeight / 2;
		this.bottomEdge = this.positionY + this.elementHeight / 2;
		this.color = {
			R: color[0],
			G: color[1],
			B: color[2] 
		}
		this.score = 0
	}
	drawPaddle() {
		stroke(this.color.R, this.color.G, this.color.B);
		rect(this.positionX, this.positionY, this.elementWidth, this.elementHeight);
		stroke(0)
	}
	beyondTopWall() {
		return (this.positionY - this.elementHeight / 2) < 0
	}
	beyondBottomWall() {
		return (this.positionY + this.elementHeight / 2) > HEIGHT
	}
	movePaddle(up, down) {
		if (keyIsDown(up) && !this.beyondTopWall()) {
			this.positionY -= this.speed * deltaTime/10; 
		} else if (keyIsDown(down) && !this.beyondBottomWall()) {
			this.positionY += this.speed * deltaTime/10;
		}
	}
	updateEdges() {
		this.leftEdge = this.positionX - this.elementWidth / 2
		this.rightEdge = this.positionX + this.elementWidth / 2
		this.topEdge = this.positionY - this.elementHeight / 2;
		this.bottomEdge = this.positionY + this.elementHeight / 2;
	}
}


class Ball extends Paddle{
	constructor(elementWidth, color, forceX, forceY) {
		super(0, elementWidth, 0, 0, color)
		this.elementHeight = elementWidth
		this.positionX = WIDTH/2;
		this.positionY = 40;
		this.forceX = forceX * (Math.round(Math.random()) * 2 - 1) // thanks to stackoverflow u/majman
		this.forceY = forceY
		}
	drawBall() {
		fill(this.color.R, this.color.G, this.color.B)
		if (this.color.R != this.color.G != this.color.B) {
			noStroke()
		}
		circle(this.positionX, this.positionY, this.elementWidth);
		stroke(0)
	}
	moveBall() {
		this.positionX += this.forceX * deltaTime/24;
		this.positionY += this.forceY * deltaTime/24;
	}
}


let leftPaddle = new Paddle(25, 12, 70, 4, [255, 255, 255]);
let rightPaddle = new Paddle(WIDTH - 25, 12, 70, 4, [255, 255, 255]);
let ball = new Ball(16, [150, 150, 150], 8 , 8)



function draw() {
	rectMode(CENTER)
	background(40);
	// draw center gray line
	stroke(100, 100, 100, 200);
	line(300, 0, 300, 400);


	textSize(60);
	fill(255, 100)
	text(leftPaddle.score.toString(), width/4, height/2+20);
	text(rightPaddle.score.toString(), width/4 * 3, height/2+20);
	fill(255)



	rightPaddle.movePaddle(UP_ARROW, DOWN_ARROW)
	leftPaddle.movePaddle(90, 83) // 90 => Z, 83 => S
	leftPaddle.drawPaddle()
	rightPaddle.drawPaddle()

	ball.drawBall()	
	ball.moveBall()

	ball.updateEdges()
	leftPaddle.updateEdges()
	rightPaddle.updateEdges()

	// "&& ball.forceY < 0" fixed the issue where the ball stucks at the ball.
	if (ball.beyondTopWall() && ball.forceY < 0) {
		ball.forceY = -ball.forceY
		wallBlip.play()
	}
	
	if (ball.beyondBottomWall() && ball.forceY > 0) {
		ball.forceY = -ball.forceY
		wallBlip.play()
	}
	// I used "ball.forceX > 0" because for some reason the ball goes back and forth when it collides with the paddles
	// Therefore I made sure the ball never bounces unless it's moving towards the paddle
	// The "margin" makes the game easier for the player by expanding the bouncing area 
	if (almostEqual(ball.rightEdge, rightPaddle.leftEdge, 8)
	&& ball.bottomEdge >= rightPaddle.topEdge - margin
	&& ball.topEdge <= rightPaddle.bottomEdge + margin
	&& ball.forceX > 0)  {
		blip.play()
		ball.forceX = -ball.forceX
		ball.forceX += Math.floor(12/Math.abs(ball.forceX)) * Math.sign(ball.forceX)
		if (ball.positionY > rightPaddle.positionY) {
			ball.forceY = Math.floor((abs(ball.positionY - rightPaddle.positionY) / (rightPaddle.elementHeight / 2) ) * 6)
		} else {
			ball.forceY = Math.floor((abs(ball.positionY - rightPaddle.positionY) / (rightPaddle.elementHeight / 2) ) * -1 * 6)
		}
	}

	if (almostEqual(ball.leftEdge, leftPaddle.rightEdge, 8)
	&& ball.bottomEdge >= leftPaddle.topEdge - margin
	&& ball.topEdge <= leftPaddle.bottomEdge + margin 
	&& ball.forceX < 0 ) {
		blip.play()
		ball.forceX = -ball.forceX
		ball.forceX += Math.floor(12/Math.abs(ball.forceX * 2) * Math.sign(ball.forceX))
		if (ball.positionY > leftPaddle.positionY) {
		ball.forceY = Math.floor((abs(ball.positionY - leftPaddle.positionY) / (leftPaddle.elementHeight / 2) ) * 4)
		} else {
			ball.forceY = Math.floor((abs(ball.positionY - leftPaddle.positionY) / (leftPaddle.elementHeight / 2) ) * -1 * 4)

		}
	}


	if (ball.positionX > width) {
		leftPaddle.score += 1
		goal.play()
		ball = new Ball(16, [150, 150, 150], 6 , 6)

	} else if (ball.positionX < 0) {
		goal.play()
		rightPaddle.score += 1
		ball = new Ball(16, [150, 150, 150], 6 , 6)

	}

	ball.color.R = 100 + noise(rOff) * 155
	ball.color.G = 100 + noise(gOff) * 155
	ball.color.B = 100 + noise(bOff) * 155
	rOff += 0.01
	gOff += 0.01
	bOff += 0.01
}

function almostEqual(a, b, acceptedDifference) {
	return a >= b - acceptedDifference 
		&& a <= b + acceptedDifference
}