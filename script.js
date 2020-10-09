const theSequence = [0, 1, 2];
const userSequence = [];
const modal = document.getElementById('myModal');
const playButton = document.querySelector('.play');

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

function playGame() {
	for (let i = 0; i < theSequence.length; i++) {
		const square = document.getElementById(theSequence[i]);
		square.classList.toggle(`flash${theSequence[i]}`);
	}
}
