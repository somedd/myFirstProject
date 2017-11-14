//file:///Users/jack/proj/myFirstProject/FirstProject.html
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var h = document.getElementById("h1");
h.innerHTML = "Making a snake game";
var score = document.getElementById("score");
var dpscore = 0;
score.innerHTML = "Score : " + dpscore;
function drawBoarder () {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 400, 10);
  ctx.fillRect(0, 390, 400, 10);
  ctx.fillRect(0, 0, 10, 400);
  ctx.fillRect(390, 0, 10, 400);
}
var bgImage = new Image();
var bgload = false;
bgImage.onload = function() {
  bgload = true;
};
var drawBackground = function() {
  ctx.drawImage(bgImage, 0, 0);
};
bgImage.src = "http://lazyfoo.net/tutorials/SDL/13_alpha_blending/alpha000.png";
//bgimage end
//game over
function gameOver() {
  clearInterval(x);
}
//keyboard start
//keyboard end
//block start
var Block = function (col, row) {
  this.col = col;
  this.row = row;
};
Block.prototype.drawSquare = function (color) {
  var x = this.col * 10;
  var y = this.row * 10;
  // var arr1 = ["E","D","O","C","S","Q","U","A","D"];
  ctx.fill = color;
  ctx.fillRect(x, y, 10, 10);
  // ctx.fillText(arr1[i], x, y);
};
Block.prototype.equal = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};
//block end
//snake start
var Snake = function() {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5),
    new Block(4, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right";
};
Snake.prototype.setDirection = function(newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }

  this.nextDirection = newDirection;
};
Snake.prototype.draw = function() {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("blue");
  }
};
Snake.prototype.move = function() {
  var head = this.segments[0];
  var newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  }

  if(this.checkCollision(newHead)) {
    gameOver();
    return;
  }
  // this.segments.unshift(newHead);
  // if(newHead.equal(apple.position)) {
  //   score ++;
  //   apple.move();
  // } else {
  //   this.segments.pop();
  // }
};
  Snake.prototype.checkCollision = function(head) {
    var leftCollision = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === 40 - 1);
    var bottomCollision = (head.row === 40 - 1);

    var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    var selfCollision = false;
    for (var i = 0; i <this.segments.length; i++) {
      if (head.equal(this.segments[i])) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
};
var snake = new Snake();
//snake end
//food start
//food
var isKeyDown = [];
var direction = {
  37 : "left",
  38 : "up",
  39 : "right",
  40 : "down"
};
window.addEventListener("keydown",onKeyDown,false);
window.addEventListener("keyup",onKeyUp,false);
function onKeyDown(e){
  var newDirection = direction[e.keyCode];
    if(newDirection !== undefined) {
      snake.setDirection(newDirection);
    }
}
function onKeyUp(e){

  isKeyDown[e.keyCode] = false;
}
//main start
var drawAll = function() {
  if(bgload) {
    drawBackground();
  }
  drawBoarder();
  snake.draw();
  snake.move();
};
var x = setInterval(drawAll, 1000);
//main end
