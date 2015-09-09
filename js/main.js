var game;

(function() {
	document.getElementById('newGame').addEventListener('click', function() {
		if (typeof game !== 'undefined' 
			&& game['getIsPlaying'] !== undefined) {
			console.log(game);
			game.gameOver(false);
		}
		var x = parseInt(window.prompt('Combien de colonnes?(minimum 2)'));
		var y = parseInt(window.prompt('Combien de lignes?(minimum 2)'));
		game = new Game([x, y]);
		//quad();
	});
})();

function quad() {
	console.log('sa se lance');
	console.log(document.getElementsByClassName('col').length);
	for (var i = 0; i <= document.getElementsByClassName('col').length - 1; ++i) {
		var msg = '<p>' + i + '</p>';
		console.log(msg);
		document.getElementsByClassName('col')[i].innerHTML = msg;
	};
	
};