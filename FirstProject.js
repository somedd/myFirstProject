//file:///Users/jack/proj/myFirstProject/FirstProject.html
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var h = document.getElementById("h1");
h.innerHTML = "Making a snake game";
//bgimage start
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
//keyboard start
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    } else if(e.keyCode == 40) {
        downPressed = true;
    } else if(e.keyCode == 38) {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed = false;
    } else if(e.keycode == 40) {
        upPressed = false;
    } else if(e.keyCode == 38) {
        downPressed = false;
    }
}
//keyboard end
//snake start
var snake = {
  x: 50,
  y: 50,
  dx: 0,
  dy: 0,
  color: "black",
  setSpeed : function(x, y) {
      this.dx = x;
      this.dy = y;
  },
  move: function() {
    if (rightPressed) {
      if (this.x < 640) {
        this.x += 9;
      }
    } else if (leftPressed) {
      if (this.x > 0) {
        this.x -= 9;
      }
    }else if (downPressed) {
      if (this.y < 480) {
        this.y += 9;
      }
    } else if (upPressed) {
      if (this.y > 0) {
        this.y -= 9;
      }
    }
  },
  check : function() {

  }
};
ctx.drawSnake = function() {
  this.beginPath();
  this.fillStyle = snake.color;
  this.rect(snake.x,snake.y, 15, 15);
  this.rect(snake.x - 20,snake.y, 15, 15);
  this.fill();
  this.closePath();
};
//snake end
//main start
// snake.setSpeed(5,0);
var drawAll = function() {
  if(bgload) {
    drawBackground();
  }
  snake.check();
  snake.move();
  ctx.drawSnake();
};
var x = setInterval(drawAll, 40);
//main end
