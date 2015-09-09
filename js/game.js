var Game = function (dimArea) {
	var dimArea; // Collones et lignes de l'air de jeux
	var score = 0; // Score du joueur
	var superPointTimer = false; // Defini si un super point est deja sur le terrain
	var snake;

	this.getDimArea = function() {
		return dimArea;
	};

	this.setDimArea = function(newDimArea) {
		if (newDimArea.constructor === Array 
			&& (isNaN(newDimArea[0]) === false 
				|| isNaN(newDimArea[1]) === false)
			&& newDimArea[0] > 1
			&& newDimArea[1] > 1) {
			dimArea = newDimArea;
		} else {
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

	this.setSuperPointTimer = function(state) {
		if (typeof state === 'boolean') {
			superPointTimer = state;
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
		if (newVitMvt < 125) {
			newVitMvt = 125;
		};
		snake.setVitMvt(newVitMvt);
	};

	this.appaPoint = function() {
		var randPosiAppPoint;
		var attrCaseAppPoint;
		if (snake.getAPosLength() <= 5 
		|| superPointTimer === true) {
			var randSPoint = 1;
		} else {
			var randSPoint = rand(20);
		}
		while(true) {
			randPosiAppPoint = rand(this.getDimArea()[0] * this.getDimArea()[1] - 1);
			attrCaseAppPoint = document.getElementsByClassName('col')[randPosiAppPoint].getAttribute('class');
			if (snake.getAPosLength() >= this.getDimArea()[0] * this.getDimArea()[1] - 1) {
				this.addScore(snake.getAPosLength());
				gameOver(true);
				break
			} else if (attrCaseAppPoint === 'col' 
				&& randSPoint <= 19) {
				document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col point');
				break;
			} else if (attrCaseAppPoint === 'col') {
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

	// GameOver
	this.gameOver = function(victory) {
		this.getSnake().clearTimeMvt();
		if (victory === false) {
			window.alert('Partie perdu \n score :' + this.getScore());
		} else {
			window.alert('Félicitation, partie complété! \n score :' + this.getScore());
		}
		for (var i in game) {
			delete(game[i]);
		}
		document.getElementById('map-container').innerHTML = '';
	};
	
	// Initialisation
	this.setDimArea(dimArea);
	this.creatArea();
	snake = new Snake(rand(this.getDimArea()[0] * this.getDimArea()[1] - 2) + 1);
	this.appaPoint();
	document.body.addEventListener('keydown', snake.choixDir);
}