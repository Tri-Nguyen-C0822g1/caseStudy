let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const GAME_BOARD_WIDTH = 480, GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 90;
let BALL_SPEED = 10;
// Khai báo khởi tạo Board,Ball,Paddle;
const LEVEL = 10;
let currentLevel = 1;
let count = 0;
let score = 0;
//Khi báo khởi tại hàm tính điểm;

let x = (canvas.width - PADDLE_WIDTH) / 2;
let y = canvas.height - PADDLE_HEIGHT - 30;
let dx = 2;
let dy = -2;


let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
let rightPressed = false;
let leftPressed = false;

let GameBoard = function (width, height) {
    this.width = width;
    this.height = height;
    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
    }
    // Khởi tại nề trò chơi;
    this.drawScore = function () {
        ctx.font = "15px Arial";
        ctx.fillStyle = "#c01d1d";
        ctx.fillText("Score:" + score, 8, 20);
    }
//    Khởi tạo bảng điểm,
}

let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);

let Ball = function () {
    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS,
            0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        x += dx;
        y += dy;
        if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
        if (y + dy < BALL_RADIUS) {
            dy = -dy;
        }
        if (y + dy > canvas.height - PADDLE_HEIGHT - 15) {
            if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
                dy = -dy;
            }
            else if (y + dy > canvas.height - BALL_RADIUS + 7) {
                alert("Game over!" +  "\nYour score is:" + score + "\nPlease refresh to play again!");
                document.location.reload();
                clearInterval(gameInterval);
            }
        }
    }
}
//Xử lí va chạm;
let Paddle = function () {
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT - 15;
    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate,
            this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    //Khởi tạo thanh hứng;
    document.addEventListener("keydown", keyDownHandle, false);
    document.addEventListener("keyup", keyUpHandle, false);
    document.addEventListener("mousemove", mouseMoveHandle, false);

    function mouseMoveHandle(e) {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX - PADDLE_WIDTH / 2 > 0 && relativeX < canvas.width - PADDLE_WIDTH / 2) {
            paddleX = relativeX - PADDLE_WIDTH / 2;
        }
    }

    function keyDownHandle(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandle(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 5, canvas.width - PADDLE_WIDTH);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 5, 0);
    }
}

function drawGame() {
    let ball = new Ball(x, y, BALL_RADIUS, 10);
    let paddle = new Paddle(PADDLE_WIDTH, 200);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle(paddleX, PADDLE_WIDTH);
    gameBoard.drawScore();
}

//Khởi tạo trò chơi;
let gameInterval = setInterval(drawGame, BALL_SPEED);
let countInterval = setInterval(() => {
        score++;
        count++;

        if (count === 5) {
            BALL_SPEED -= 3;
            dx += dx/4 ;
            dy += dy/4;
            console.log(BALL_SPEED);
            console.log(x);
            console.log(y);
            currentLevel++
            // if(currentLevel >5){
            //     dx += 1;
            //     dy -= 1;
            // }
            document.getElementById("level").innerText = "Level: " + currentLevel;
            checkLevel()
            count = 0;
        }
    }
    , 1000);
//Điểm số;
function checkLevel() {
    if (currentLevel === LEVEL) {
        document.getElementById("level").innerText = "You Win!!!";
        clearInterval(gameInterval);
        clearInterval(countInterval);
    }
}
//Kiểm tra và khởi tạo lại;
