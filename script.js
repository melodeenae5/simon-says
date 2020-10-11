//variables
let theSequence = [];
let userSequence = [];
const modal = document.getElementById('myModal');
const playButton = document.querySelector('.play');
const gameBoard = document.querySelector('.board');
const score = document.getElementById('score');
const restartButton = document.querySelector('.restart');

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
		setTimeout(function () {
			square.classList.remove(`flash${theSequence[i]}`);
			square.parentNode.replaceChild(element, square);
		}, 1000);
		i++;
		if (i >= theSequence.length) {
			clearInterval(flash);
		}
	}, 1500);
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
		setTimeout(function () {
			button.classList.remove(`flash${button.id}`);
			button.parentNode.replaceChild(element, button);
		}, 1000);
		userSequence.push(parseInt(button.id));
		if (userSequence.length >= theSequence.length) {
			checkSequence();
		}
	}
}

//checks user input against theSequence array
function checkSequence() {
	let isAccurate = true;
	for (let i = 0; i < theSequence.length; i++) {
		if (userSequence[i] !== theSequence[i]) {
			isAccurate = false;
			break;
		}
	}
	if (isAccurate) {
		updateScore();
		userSequence = [];
		playGame();
	} else {
		alert(`Game over. Your score is ${score.innerText}`);
		restartButton.style.display = 'block';
	}
}
//event listener for restart button
restartButton.addEventListener('click', restart);
//resets the game to play again
function restart() {
	theSequence = [];
	userSequence = [];
	score.innerText = `0`;
	modal.style.display = 'block';
	restartButton.style.display = 'none';
}

//updates score
function updateScore() {
	score.innerText = `${theSequence.length}`;
}
