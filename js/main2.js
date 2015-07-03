var varsGlobal = new Object(); // renomer en app

document.addEventListener('DOMContentLoaded', function() {
	varsGlobal.isRunning = false; // Une parti est elle lancé?

	document.getElementById('newGame').addEventListener('click', function() {
		if (varsGlobal.isRunning == true) {
			gameOver();
		}
		initGame();
	});
})
