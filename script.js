//variables
let theSequence = [];
let userSequence = [];
const modal = document.getElementById('myModal');
const playButton = document.querySelector('.play');
const gameBoard = document.querySelector('.board');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');
highScore.innerText = sessionStorage.getItem('score')
	? sessionStorage.getItem('score')
	: 0;

//found out how to add audio from stackOverflow
const greenSound = new Audio('EGreen.wav');
const redSound = new Audio('ARed.wav');
const yellowSound = new Audio('CSharpYellow.wav');
const blueSound = new Audio('EBlue.wav');

//modal
window.addEventListener('load', function () {
	modal.style.display = 'block';
});
playButton.addEventListener('click', function () {
	modal.style.display = 'none';
	playGame();
});

function randomNumber() {
	return Math.floor(Math.random() * 4);
}

//main function
function playGame() {
	add2Sequence();
	playSequence();
	gameBoard.addEventListener('click', listen2User);
}

//loops over theSequence array and plays the sequence
function playSequence() {
	gameBoard.removeEventListener('click', listen2User);
	let i = 0;
	const flash = setInterval(function () {
		const square = document.getElementById(theSequence[i]);
		const element = square.cloneNode(true);
		square.classList.add(`flash${theSequence[i]}`);
		const squareID = square.id;
		switch (parseInt(squareID)) {
			case 0:
				greenSound.play();
				break;
			case 1:
				redSound.play();
				break;
			case 2:
				yellowSound.play();
				break;
			case 3:
				blueSound.play();
				break;
		}
		setTimeout(function () {
			square.classList.remove(`flash${theSequence[i]}`);
			square.parentNode.replaceChild(element, square);
			switch (squareID) {
				case 0:
					greenSound.currentTime = 0;
					break;
				case 1:
					redSound.currentTime = 0;
					break;
				case 2:
					yellowSound.currentTime = 0;
					break;
				case 3:
					blueSound.currentTime = 0;
			}
		}, 750);
		i++;
		if (i >= theSequence.length) {
			clearInterval(flash);
		}
	}, 1000);
}

//adds a random number to theSequence array
function add2Sequence() {
	theSequence.push(randomNumber());
}

//handles user input
function listen2User(event) {
	if (event.target.tagName === 'BUTTON') {
		const button = document.getElementById(`${event.target.id}`);
		const element = button.cloneNode(true);
		button.classList.add(`flash${button.id}`);
		const buttonID = button.id;
		switch (parseInt(buttonID)) {
			case 0:
				greenSound.play();
				break;
			case 1:
				redSound.play();
				break;
			case 2:
				yellowSound.play();
				break;
			case 3:
				blueSound.play();
				break;
		}
		setTimeout(function () {
			button.classList.remove(`flash${button.id}`);
			button.parentNode.replaceChild(element, button);
			switch (buttonID) {
				case 0:
					greenSound.currentTime = 0;
					break;
				case 1:
					redSound.currentTime = 0;
					break;
				case 2:
					yellowSound.currentTime = 0;
					break;
				case 3:
					blueSound.currentTime = 0;
			}
		}, 1000);
		userSequence.push(parseInt(button.id));
		if (!checkMove()) {
			gameOver();
		} else if (userSequence.length >= theSequence.length) {
			updateScore();
			userSequence = [];
			playGame();
		}
	}
}

function checkMove() {
	let isAccurate = true;
	for (let i = 0; i < userSequence.length; i++) {
		if (userSequence[i] !== theSequence[i]) {
			isAccurate = false;
			break;
		}
	}
	return isAccurate;
}

//end the game
function gameOver() {
	saveHighScore(parseInt(score.innerText));
	alert(`Game over. Your score is ${score.innerText}`);
	restart();
}

//resets the game to play again
function restart() {
	theSequence = [];
	userSequence = [];
	score.innerText = `0`;
	modal.style.display = 'block';
}

//updates score
function updateScore() {
	score.innerText = `${theSequence.length}`;
}

//save high score to session storage
function saveHighScore(score) {
	if (score > parseInt(highScore.innerText)) {
		sessionStorage.clear();
		sessionStorage.setItem('score', `${score}`);
		highScore.innerText = sessionStorage.getItem('score');
	}
}
