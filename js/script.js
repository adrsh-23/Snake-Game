let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("music/food.mp3");
const gameOver = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const music = new Audio("music/music.mp3");

let snakeArr = [
	{ x: 13, y: 5 },
];

let speed = 7;
let score = 0;
let food = { x: 5, y: 6 };

let lastPaintTime = 0;

function main(ctime) {
	window.requestAnimationFrame(main);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) { // 0.5 sec interval it will run
		return;
	}
	lastPaintTime = ctime;

	gameEngine();
}

function gameEngine() {
	// Update snake array
	if (isCollide(snakeArr)) {
		gameOver.play();
		music.pause();
		inputDir = { x: 0, y: 0 };
		alert("Game Over! Press any key to play again");
		snakeArr = [{ x: 13, y: 5 }];
		score = 0;
		scoreBox.innerHTML = "Score: " + score;
	}
	// Display snake array
	board.innerHTML = "";
	music.play();
	snakeArr.forEach((e, index) => {
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		if (index === 0)
			snakeElement.classList.add('head');
		else
			snakeElement.classList.add('snake');
		board.appendChild(snakeElement);
	});

	// Snake eating food
	if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
		snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
		foodSound.play();
		score++;
		// highScore = Math.max(highScore, score);
		// localStorage.setItem("highScore", JSON.stringify(highScore));
		scoreBox.innerHTML = "Score: " + score;
		let a = 2;
		let b = 16;
		// Generate random number between a and b
		food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
	}

	// Moving the Snake
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		snakeArr[i + 1] = { ...snakeArr[i] };
	}
	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;

	// Display food
	foodElement = document.createElement('div');
	foodElement.style.gridColumnStart = food.x;
	foodElement.style.gridRowStart = food.y;
	foodElement.classList.add('food');
	board.appendChild(foodElement);

}

function isCollide(snake) {
	// Itself
	for (let i = 1; i < snakeArr.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) { // Head collies with body
			return true;
		}
	}
	// Border
	if ((snake[0].x < 0 || snake[0].x > 18) || (snake[0].y < 0 || snake[0].y > 18)) {
		return true;
	}

}

// Main logic
let highScoreJson = localStorage.getItem("highScore");
if (highScoreJson === null) {
	localStorage.setItem("highScore", JSON.stringify(0));
}
else {
	highScore = JSON.parse(highScoreJson);
	// highScoreBox.innerHTML = "HighScore: " + highScore;
}
console.log(highScore);

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
	inputDir = { x: 0, y: 1 };
	moveSound.play();
	switch (e.key) {
		case "ArrowUp":
			// console.log("ArrowUp");
			inputDir.x = 0;
			inputDir.y = -1;
			break;
		case "ArrowDown":
			// console.log("ArrowDown");
			inputDir.x = 0;
			inputDir.y = 1;
			break;
		case "ArrowLeft":
			// console.log("ArrowLeft");
			inputDir.x = -1;
			inputDir.y = 0;
			break;
		case "ArrowRight":
			// console.log("ArrowRight");
			inputDir.x = 1;
			inputDir.y = 0;
			break;
	}
});