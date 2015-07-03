var Game = function(x ,y) {
	var dimArea; // Collones et lignes de l'air de jeux
	var score = 0; // Score du joueur
	var superPointTimer = false; // Defini si un super point est deja sur le terrain
	var diffScore = 4; // Palier a atteindre pour une augmentation de vitesse
	var isRunning = false; // Le jeux est initialisé
	var isPlaying = false; // Une partie est elle demaré
	var snake;

	this.getDimArea = function() {
		return dimArea;
	};

	this.setDimArea = function(newDimArea) {
		if (typeof newDimArea.constructor === Array 
			&& typeof newDimArea[0] === 'number' 
			&& typeof newDimArea[1] === 'number') {
			dimArea = newDimArea;
		} else {
			dimArea = [10, 10];
		}
	};

	this.getScore = function() {
		return score;
	};

	this.addScore = function(pts) {
		if (typeof pts === 'number') {
			score += pts;
		}
	};

	this.getSuperPointTimer = function() {
		return superPointTimer;
	};

	this.setSuperPointTimer = function(state) {
		if (typeof state === 'boolean') {
			superPointTimer = state;
		}
	};

	this.getDiffScore = function() {
		return diffScore;
	};

	this.setDiffScore = function(newDiffScore) {
		if (typeof newDiffScore === 'number') {
			diffScore = newDiffScore;
		}
	};

	this.getIsRunning = function() {
		return isRunning;
	};

	this.setIsRunning = function(state) {
		if (typeof state === 'boolean') {
			isRunning = state;
		}
	};

	this.getIsPlaying = function() {
		return isPlaying;
	};

	this.setIsPlaying = function(state) {
		if (typeof state === 'boolean') {
			isPlaying = state;
		}
	};

	// Initialisation
	this.setIsRunning(true);
	this.setDimArea([x,y]);
	this.creatArea();
	snake = new Snake(rand(setDimArea[0] * setDimArea[1]));
	document.body.addEventListener('keydown',game.snake.choixDir);

	// Methode perso
	this.creatArea = function() {
		var area;
		// Crée le quadrillage selon la taille demandé
		for (var i = dimArea[1] ; i > 0 ; i--) {
			area += '<div class=\'row\'>';
			for (var j = dimArea[0] ; j > 0 ; j--) {
				area += '<div class=\'col\'></div>';
			}
			area += '</div>';
		}
		document.getElementById('map-container').innerHTML = area;
	};
}