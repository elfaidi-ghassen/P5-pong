function setup() {
  createCanvas(600, 400);
}

let leftRectX = 20
let leftRectY = 150
let rectWidth = 20
let rectHeight = 100

let rightRectX = 560
let rightRectY = 150

let circleX = 600/2
let circleY = 400/2
let circleXForce = 4
let circleYForce = 4
let circleWidth = 20
function draw() {
  background(220);
  stroke(0)
  rect(leftRectX, leftRectY, rectWidth, rectHeight)
  
  stroke(255, 40, 100)
  rect(rightRectX, rightRectY, rectWidth, rectHeight)  
  stroke(100, 100, 100, 50)
  line(0, 200, 600, 200)
  if (keyIsDown(UP_ARROW) && rightRectY >= 3) {
        rightRectY -= 4
  } else if (keyIsDown(DOWN_ARROW) && rightRectY <= height - rectHeight - 3) {
        rightRectY += 4
  }
  if (keyIsDown(90) && leftRectY >= 3) {
        leftRectY -= 4
  } else if (keyIsDown(83) && leftRectY <= height - rectHeight - 3) {
        leftRectY += 4
  }
  stroke(0)
  circle(circleX, circleY, circleWidth)
  circleX = circleX += circleXForce
  circleY = circleY += circleYForce
  
  if (circleY + 10 >= height || circleY - 10 <= 0) {
    circleYForce = -circleYForce
  }
  
  let rightColl = rightRectX - Math.floor(circleWidth/2)
  if (between(circleX, rightColl - 2, rightColl + 2) && circleY >= rightRectY - 20 && circleY <= rightRectY + rectHeight + 20) {
        circleXForce = -circleXForce
  }
  
    let leftColl = leftRectX + rectWidth + Math.floor(circleWidth/2)

    if (between(circleX, leftColl - 2, leftColl + 2) && circleY >= leftRectY - 20 && circleY <= leftRectY + rectHeight + 20) {
        circleXForce = -circleXForce
  }
  
}

function between(x, start, end) {
  for(i = start; i < end; i++) {
    if (x == i) return true
  }
  return false
}

