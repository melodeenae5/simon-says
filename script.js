const theSequence = [0, 1, 2, 2, 3, 3, 0, 3, 2, 1, 3];
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
