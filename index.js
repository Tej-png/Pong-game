let board;
let boardHeight = 500;
let boardWidth = 500;
let context;

let playerHeight = 60;
let playerWidth = 10;
let playerVelocity = 0;


// player 1 //
const player1 = {
  x: 10,
  y: boardHeight / 2,
  height: playerHeight,
  width: playerWidth,
  velocityY: playerVelocity,
};

//player 2 //

const player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  height: playerHeight,
  width: playerWidth,
  velocityY: playerVelocity,
};

//ball //

let ballHeight = 10;
let ballWidth = 10;
let ball = {
  x: boardHeight / 2,
  y: boardWidth / 2,
  width: ballWidth,
  height: ballHeight,
  velocityY: 2,
  velocityX: 1,
};

// scores for both players

let player1Score = 0;
let player2Score = 0;
let btn = document.querySelector('button');

window.onload = function () {
  let music = new Audio('Media/neon-gaming-128925.mp3');
  
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  btn.addEventListener("click", function(event) { 
    requestAnimationFrame(update);
    music.play();
    music.loop()
    btn.classList.add("pressed");
    setTimeout(function() {
        activeBtn.classList.remove("pressed");
    }, 100)

  })
  
  document.addEventListener("keyup", movePlayer);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, boardWidth, boardHeight);

  let nextPlayer1 = player1.y + player1.velocityY;
  if (!outOfBounds(nextPlayer1)) {
    player1.y = nextPlayer1;
  }
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  let nextPlayer2 = player2.y + player2.velocityY;
  if (!outOfBounds(nextPlayer2)) {
    player2.y = nextPlayer2;
  }
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  // ball //
  context.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);
  if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY *= -1;
  }

  if (detectCollison(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velocityX *= -1;
    }
  } else if (detectCollison(ball, player2)) {
    if (ball.x + ball.width >= player2.x) {
      ball.velocityX *= -1;
    }
  }

  if (ball.x < 0) {
    player1Score++;
    resetGame(1);
  } else if (ball.x + ball.width >= board.width) {
    player2Score++;
    resetGame(-1);
  }

  context.font = "45px sans-serif";
  context.fillText(player1Score, boardWidth / 5, 45);
  context.fillText(player2Score, (boardWidth * 4) / 5, 45);

  for (var i = 10; i < boardHeight; i += 25) {
    context.fillRect(boardWidth / 2 - 10, i, 5, 5);
  }
}

function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + player1.height > boardHeight;
}

function detectCollison(ball, paddle) {
  return (
    ball.x < paddle.x + paddle.width && //ball's top left corner doesn't reach paddle's top right corner//
    ball.x + ball.width > paddle.x && // ball's top right corner doesn't reach paddle's top left corner//
    ball.y < paddle.y + paddle.height && //ball's top left corner doesn't reach paddle's left right corner//
    ball.y + ball.height > paddle.y // ball's bottom left corner doesn't reach paddle's top left corner//
  );
}

function movePlayer(event) {
  if (event.code == "KeyW") {
    player1.velocityY = -3;
  } else if (event.code == "KeyS") {
    player1.velocityY = 3;
  }

  if (event.code == "KeyU") {
    player2.velocityY = -3;
  } else if (event.code == "KeyJ") {
    player2.velocityY = 3;
  }
}

function resetGame(direction) {
  ball = {
    x: boardHeight / 2,
    y: boardWidth / 2,
    width: ballWidth,
    height: ballHeight,
    velocityY: 2,
    velocityX: direction,
  };
}
