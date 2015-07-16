var game;

(function() {
	document.getElementById('newGame').addEventListener('click', function() {
		if (typeof game !== 'undefined' 
			&& game.getIsRunning == true) {
			gameOver();
		}
		var x = parseInt(window.prompt('Combien de colonnes?'));
		var y = parseInt(window.prompt('Combien de lignes?'));
		game = new Game(x, y);
	});

	function gameOver() {
		window.alert('Partie terminé \n score :' + this.getScore());
		delete game;
		delete snake;
	}
})();