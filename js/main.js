var game;

(function() {
	document.getElementById('newGame').addEventListener('click', function() {
		if (game.getIsRunning == true) {
			game.gameOver();
		}
		var x = parseInt(window.prompt('Combien de colonnes?'));
		var y = parseInt(window.prompt('Combien de lignes?'));
		game = new Game(x, y);
	});
})();