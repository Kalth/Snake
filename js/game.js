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
			console.log('dim area set par defaut');
			dimArea = [20, 20];
		}
	};

	this.getScore = function() {
		return score;
	};

	this.addScore = function(pts) {
		if (typeof pts === 'number') {
			score += pts;
		}
		else {
			++score;
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

	// Methode perso
	this.creatArea = function() {
		var area ='';
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
		this.addScore(pts);
		affSco.innerHTML = this.getScore() + ' pts';
		this.appaPoint();
		// Calcul de la vitesse du snake en fonction du score
		newVitMvt = 750 - (Math.log(this.getScore()) * 160);
		if (newVitMvt < 150) {
			newVitMvt = 150;
		};
		snake.setVitMvt(newVitMvt);
	};

	this.appaPoint = function() {
		var randPosiAppPoint;
		var attrCaseAppPoint;
		if (this.getSnake().getTabPos().length <= 5 
		|| this.getSuperPointTimer() === true) {
			var randSPoint = 1;
		} else {
			var randSPoint = rand(10);
		}
		console.log('Super Point : ' + (randSPoint >= 5));
		console.log(this.getSuperPointTimer());
		while(true) {
			randPosiAppPoint = rand(this.getDimArea()[0] * this.getDimArea()[1] - 1);
			attrCaseAppPoint = document.getElementsByClassName('col')[randPosiAppPoint].getAttribute('class');
			if (attrCaseAppPoint === 'col' 
				&& randSPoint <= 5) {
				console.log('Pose un point normal');
				document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col point');
				break;
			} else if (attrCaseAppPoint === 'col') {
				console.log('Pose un super point');
				document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col sPoint');
				this.setSuperPointTimer(true);
				setTimeout(this.timerSPoint(randPosiAppPoint),10000);
				break;
			}
		}
	};

	// Au bout de 10 seconde supprime le superPoint si il n'est pas pris, et permet al réapparition d'un nouveaux
	this.timerSPoint = function(posiSuperPoint) {
		_this = this;
		setTimeout(function() {
			_this.setSuperPointTimer(false);
			if (document.getElementsByClassName('col')[posiSuperPoint].getAttribute('class') === 'col sPoint') {
				document.getElementsByClassName('col')[posiSuperPoint].setAttribute('class', 'col');
				_this.appaPoint();
			}
			return;
		}, 10000)
	};

	// Initialisation
	this.setIsRunning(true);
	this.setDimArea([x,y]);
	this.creatArea();
	snake = new Snake(rand(this.getDimArea()[0] * this.getDimArea()[1]) - 1);
	this.appaPoint();
	document.body.addEventListener('keydown', snake.choixDir);
}