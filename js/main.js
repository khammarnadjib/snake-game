var canvas,ctx,mode
var speed = 200

canvas = document.getElementById("myCanvas")
ctx = canvas.getContext('2d')

class Snake {
  constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
      this.tail = [{x:this.x, y:this.y}]
      this.rotateX = 1
      this.rotateY = 0
  }
  move() {
      var pos
      if (this.rotateX == 1) {
          pos = {
              x: this.tail[this.tail.length - 1].x + this.size,
              y: this.tail[this.tail.length - 1].y
          }
      } else if (this.rotateX == -1) {
          pos = {
              x: this.tail[this.tail.length - 1].x - this.size,
              y: this.tail[this.tail.length - 1].y
          }
      } else if (this.rotateY == 1) {
          pos = {
              x: this.tail[this.tail.length - 1].x,
              y: this.tail[this.tail.length - 1].y + this.size
          }
      } else if (this.rotateY == -1) {
          pos = {
              x: this.tail[this.tail.length - 1].x,
              y: this.tail[this.tail.length - 1].y - this.size
          }
      }

      this.tail.shift()
      this.tail.push(pos)
  }
}

class Apple{
  constructor(){
      let collision
      
      while (true) {
          collision = false;
          this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
          this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
          
          for (let i = 0; i < snake.tail.length; i++) {
              if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                  collision = true
              }
          }

          this.size = snake.size
          this.color = "red"

          if (!collision) {
              break;
          }
      }
  }
}

function initialize(){
  snake = new Snake(20,20,20)
  apple = new Apple()
}

window.onload = () => {
  mode = 0
  setInterval(game, speed)
  initialize()

}

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  snake.move()
  checkCollision()
  eatApple()
  //checkCollision()
  avoidCollisionWall()
  draw()
}

function eatApple() {
  var headTail = snake.tail[snake.tail.length - 1]
  if(headTail.x == apple.x && headTail.y == apple.y){
    snake.tail[snake.tail.length] = {x:apple.x, y: apple.y}
    //console.log("Apple x: " + apple.x)
    //console.log("Snake x: " + snake.tail[snake.tail.length - 1].x)
    apple = new Apple();
  }
}

function checkCollision(){
  var headTail = snake.tail[snake.tail.length - 1]
  if(headTail.x != apple.x && headTail.y != apple.y){
    for(i = 0; i < snake.tail.length - 1; i++){
      if(headTail.x == snake.tail[i].x && headTail.y == snake.tail[i].y){
        endGame()
      }
    }
  }
}

function start() {
  mode = 1
  document.getElementById('start').style.visibility='hidden';
}


function endGame(){
  mode = 0
  //document.write("Game Over")
  alert("Game Over")
}

function avoidCollisionWall() {
    var headTail = snake.tail[snake.tail.length -1]
    if (headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size
    } else if (headTail.x == canvas.width) {
        headTail.x = 0
    } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y == canvas.height) {
        headTail.y = 0 
    }
}


function draw() {
  if (mode == 0) {
    document.getElementById('start').style.visibility='visible';
    initialize()
  }

  else if (mode == 1){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    //createRect(snake.tail[0].x + 2.5, snake.tail[0].y + 2.5, snake.size - 5, snake.size- 5, "yellow")
    for (let i = 0; i < snake.tail.length-1; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size- 5, "seagreen")
    }
    createRect(snake.tail[snake.tail.length-1].x + 2.5, snake.tail[snake.tail.length-1].y + 2.5, snake.size - 5, snake.size- 5, "lime")

    ctx.font = "20px blackletter"
    ctx.fillStyle = "white"
    ctx.fillText("Score: " + (snake.tail.length -1),canvas.width - 120, 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
  }
}

function createRect(x,y,width, height,color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 38 && snake.rotateY != 1) {
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 39 && snake.rotateX != -1) {
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 40 && snake.rotateY != -1) {
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 1)
})





