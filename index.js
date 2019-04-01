document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  const canvasElement = document.createElement('canvas')
  canvasElement.setAttribute('id', 'game')
  body.append(canvasElement)
  const canvas = document.getElementById('game')
  canvas.setAttribute('width', '300px')
  canvas.setAttribute('height', '300px')
  const context = canvas.getContext('2d')

  document.addEventListener('keydown', changeDirection)

  clearConvas()

  const head = {
    x: 60,
    y: 100,
  }

  let snake = [
    head,
    { x: 50, y: 100 },
    { x: 40, y: 100 },
    { x: 30, y: 100 },
    { x: 20, y: 100 },
    { x: 10, y: 100 },
  ]

  let dx = 10
  let dy = 0

  let foodX
  let foodY

  let score = 0

  createApple()

  // context.fillRect(snake[0].x, snake[0].y, 10, 10)
  // context.fillRect(snake[1].x, snake[1].y, 10, 10)
  // context.fillRect(snake[2].x, snake[2].y, 10, 10)

  function drawSnake() {
    context.fillStyle = '#7FFF00'
    context.strokeStyle = 'black'
    snake.forEach(part => {
      context.fillRect(part.x, part.y, 10, 10)
      context.strokeRect(part.x, part.y, 10, 10)
    })
  }

  function moveSnake() {
    const head = snake[0]
    const newHead = {
      x: head.x + dx,
      y: head.y + dy,
    }

    if (foodX !== newHead.x || foodY !== newHead.y) {
      snake.pop()
    } else {
      score = score + 10
      const scoreElement = document.querySelector('#score')
      scoreElement.textContent = `Wynik: ${score}`
      createApple()
    }

    snake.unshift(newHead)
  }

  function clearConvas() {
    context.fillStyle = '#fff'
    context.fillRect(0, 0, 300, 300)
  }

  function go() {
    if (gameOver()) {
      return
    } else {
      clearConvas()
      drawSnake()
      drawApple()
      moveSnake()
    }
  }

  function changeDirection(e) {
    const key = e.keyCode
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    const isMovingRight = dx === 10
    const isMovingLeft = dx === -10
    const isMovingUp = dy === -10
    const isMovingDown = dy === 10

    if (key === LEFT_KEY && !isMovingRight) {
      dy = 0
      dx = -10
    } else if (key === RIGHT_KEY && !isMovingLeft) {
      dy = 0
      dx = 10
    } else if (key === UP_KEY && !isMovingDown) {
      dy = -10
      dx = 0
    } else if (key === DOWN_KEY && !isMovingUp) {
      dy = 10
      dx = 0
    }

  }

  function randonNumber(min, max) {
    return Math.round(
      (Math.random() * (max - min) + min) / 10
    ) * 10
  }

  function createApple() {
    foodX = randonNumber(10, 290)
    foodY = randonNumber(10, 290)
    snake.forEach(part => {
      if (part.x === foodX && part.y === foodY) {
        createApple()
      }
    })
  }

  function drawApple() {
    context.fillStyle = 'red'
    context.strokeStyle = 'black'

    context.fillRect(foodX, foodY, 10, 10)
    context.strokeRect(foodX, foodY, 10, 10)
  }

  function gameOver() {
    const head = snake[0]
    const gameOverUp = head.y < 0
    const gameOverDown = head.y >= 300
    const gameOverLeft = head.x < 0
    const gameOverRight = head.x >= 300

    if (gameOverUp || gameOverDown || gameOverLeft || gameOverRight) {
      return true
    }
    return false
  }

  setInterval(
    go, 100
  )

})
