var game;

(function() {
	document.getElementById('newGame').addEventListener('click', function() {
		if (typeof game !== 'undefined' 
			&& game['getIsPlaying'] !== undefined) {
			gameOver(false);
		}
		var x = parseInt(window.prompt('Combien de colonnes?(minimum 2)'));
		var y = parseInt(window.prompt('Combien de lignes?(minimum 2)'));
		game = new Game([x, y]);
	});
})();

function gameOver(victory) {
	if (victory === false) {
		window.alert('Partie perdu \n score :' + game.getScore());
	} else {
		window.alert('Félicitation, partie complété! \n score :' + game.getScore());
	}
	for (var i in game) {
		delete(game[i]);
	}
	document.getElementById('map-container').innerHTML = '';
}
