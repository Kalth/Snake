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

	this.getSnake = function() {
		return snake;
	};

	// Initialisation
	this.setIsRunning(true);
	this.setDimArea([x,y]);
	this.creatArea();
	snake = new Snake(rand(this.getDimArea[0] * this.getDimArea[1]));
	document.body.addEventListener('keydown',game.snake.choixDir);

	// Methode perso
	this.creatArea = function() {
		var area;
		// Crée le quadrillage selon la taille demandé
		for (var i = this.getDimArea()[1] ; i > 0 ; i--) {
			area += '<div class=\'row\'>';
			for (var j = this.getDimArea()[0] ; j > 0 ; j--) {
				area += '<div class=\'col\'></div>';
			}
			area += '</div>';
		}
		document.getElementById('map-container').innerHTML = area;
	};

	this.scorePlus = function(pts) {
		var affSco = document.getElementById('score');
		this.addScore();
		affSco.innerHTML = this.getScore() + ' pts';
		this.appaPoint();
		// En cas de super Point le serpent accelere
		if (pts == 5) {
			augVitesse();
		}
		// Si le score attein le palier diffSco le serpent accelere et le palier est augmenté
		if (this.getScore() >= this.getDiffScore()) {
			// a revoir!!!!!!!!!!
			varsGlobal.diffSco += varsGlobal.diffSco + varsGlobal.sco / 2;
			augVitesse();
		}
	};

	this.appaPoint = function() {
		var randPosiAppPoint;
		var attrCaseAppPoint;
		if (game.snake.getTabPos().length <= 5 
		|| this.getSuperPointTimer() === true) {
			var randSPoint = 1;
		} else {
			var randSPoint = rand(10);
		}
		while(true) {
			randPosiAppPoint = rand(varsGlobal.dimArea[0] * varsGlobal.dimArea[1] - 1);
			attrCaseAppPoint = document.getElementsByClassName('col')[randPosiAppPoint].getAttribute('class');
			if (attrCaseAppPoint === 'col' 
				&& randSPoint <= 9) {
				document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col point');
				break;
			} else if (attrCaseAppPoint === 'col'
				&& randSPoint === 10) {
				document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col sPoint');
				this.setSuperPointTimer(true);
				setTimeout(timerSPoint(randPosiAppPoint),10000);
				break;
			}
		}
	};
}