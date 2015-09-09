var Snake = function(firstPos, argVitMvt) {
	var aPos = []; // tableau des position du snake et de sa queue
	var nbrPas = 0; // Nombre de mouvement du snake
	var vitMvt = 750; // Interval de temps entre deux mouvement en milliseconde
	var aIncu = []; // Contient les 'dates de naissance' des parties suplementaire de la queue
	var dirPrece = 0; // Direction pris par le serpent au dernier mouvement
	var dirSnake = 3; // Direction pris par le serpent pour le prochain tour
	var aDirAllow = [1, 2, 3, 4]; // Seulement les fleches directionelles sont autorisé
	var timeMvt;

	this.setTimeMvt = function(newTimeMvt) {
		timeMvt = newTimeMvt;
	}

	this.clearTimeMvt = function() {
		window.clearInterval(timeMvt);
	}

	this.setAPos = function(newAPos) {
		if (newAPos.constructor === Array) {
			for (var i = newAPos.length - 1 ; i >= 0 ; i--) {
				if (typeof newAPos[i] !== 'number') {
					return false;
				}
			}
		aPos = newAPos;
		}
	};

	this.getAPos = function() {
		return aPos;
	}
	
	//inutile
	this.getAPosLength = function() {
		return aPos.length;
	}

	this.setIndexAPos = function(index, value) {
		if (typeof index === 'number'
		&& typeof value === 'number') {
			aPos[index] = value;
		}
	};

	this.pushAPos = function(newPart) {
		if (typeof newPart === 'number') {
			aPos.push(newPart);
		};
	};

	this.getVitMvt = function() {
		return vitMvt;
	};

	this.setVitMvt = function(newVitMvt) {
		if (typeof newVitMvt === 'number') {
			vitMvt = newVitMvt;
		}
	};

	this.setIndexAIncu = function(index, value) {
		if (typeof index === 'number'
		&& typeof value === 'number') {
			aIncu[index] = value;
		}
	};

	this.pushAIncu = function(newBirth) {
		if (typeof newBirth === 'number') {
			aIncu.push(newBirth);
		}
	};

	this.resetIndexAIncu = function(index) {
		if (aIncu[index] !== undefined) {
			aIncu[index] = 0;
		}
	};

	this.setDirPrece = function() {
		dirPrece = dirSnake;
	};

	this.getDirSnake = function() {
		return dirSnake;
	};

	this.setDirSnake = function(newDir) {
		if (typeof newDir === 'number'
			&& isEven(newDir) !== isEven(dirPrece)
			&& aDirAllow.indexOf(newDir) !== -1) {
			dirSnake = newDir;
		}
	};

	// Methodes perso
	// Temps avant le prochain deplacement
	this.choixDir = function(event) {
		if (game.getIsPlaying() === false) {
			game.getSnake().timingMvt();
			game.setIsPlaying(true);
		}
		game.getSnake().setDirSnake(event.which - 36);
		document.getElementsByClassName('col')[game.getSnake().getAPos()[0]].setAttribute('class', 'col actif d' + game.getSnake().getDirSnake());
	};

	this.timingMvt = function() {
		var _this = this;
		this.setTimeMvt(setTimeout(function() {
			_this.calcMvt();
			_this.setDirPrece();
		}, _this.getVitMvt()));
	};

	this.calcMvt = function() {
		// Si dir = 1 || 2 => diff = -1 sinon => diff = 1
		var diff = this.getDirSnake() - (2 + ((this.getDirSnake() + 1) % 2));
		var posVoulu = aPos[0] + game.getDimArea()[0] / (game.getDimArea()[0] * (this.getDirSnake() % 2) + 1 * ((this.getDirSnake() + 1) % 2)) * diff;
		// Si le snake depasse des bord du terrain on corrige la position
		if (posVoulu < 0
		|| posVoulu >= game.getDimArea()[0] * game.getDimArea()[1]
		|| (!isEven(this.getDirSnake()) 
			&& Math.floor(posVoulu / game.getDimArea()[0]) !== Math.floor(aPos[0] / game.getDimArea()[0]))) {
			// Si dir = 2 || 4 => y = game.getDimArea()[1] sinon => y = 1
			var y = ( this.getDirSnake() % 2 ) * ( 1 - game.getDimArea()[1] ) + game.getDimArea()[1]; 
			posVoulu = aPos[0] + ((game.getDimArea()[0] * y) - y) * ( -diff);
		}
		this.mouvement(posVoulu);
	};

	this.mouvement = function(posValide) {
		var majScore = 0;
		var attrPosValide = document.getElementsByClassName('col')[posValide].getAttribute('class');
		var posLastPart = aPos[aPos.length - 1];
		++nbrPas;
		// Verifie où le snake arrive
		if (attrPosValide === 'col point') {
			majScore = 1;
		} else if (attrPosValide === 'col sPoint') {
			majScore = 5;
		}
		if (majScore !== 0) {
			game.scorePlus(majScore);
		}

		var naissImmi = this.croissance(majScore);
		if ((attrPosValide  === 'col queue') 
		&& ((posValide === posLastPart && naissImmi == true)
		|| (posValide !== posLastPart))) {
			// Le gameOver ne se declenche pas si il touche le bout de la queue et qu'elle ne doit pas grandir a ce pas
			game.gameOver(false);
			return;
		}
		if (naissImmi === true) {
			// Si une partie doit apparaitre, sauvgarde la derniere position de la queue avant la mise a jour
			var posNaiss = aPos[aPos.length - 1];
		}
		// Amene la tete a la position valide
		var attrTete = document.getElementsByClassName('col')[aPos[0]].getAttribute('class');
		document.getElementsByClassName('col')[posValide].setAttribute('class', attrTete);
		document.getElementsByClassName('col')[aPos[0]].setAttribute('class', 'col');
		for (var i = aPos.length - 1 ; i > 0 ; --i) {
			if (i === aPos.length - 1 && posValide !== aPos[i]) {
				document.getElementsByClassName('col')[aPos[i]].setAttribute('class', 'col');
			}
			// Mise a jour des position de la queue
			if (i === 1) {
				this.setIndexAPos(i, aPos[0]);
				// Avance la premiere occurence de la queue
				document.getElementsByClassName('col')[aPos[i]].setAttribute('class', 'col queue');
			} else {
				this.setIndexAPos(i, aPos[i - 1]);
			}
		}

		if (naissImmi === true) {
			this.pushAPos(posNaiss);
			document.getElementsByClassName('col')[posNaiss].setAttribute('class', 'col queue');
		}

		this.setIndexAPos(0, posValide); 
		this.timingMvt();
	};

	// Croissance
	this.croissance = function(majScore) {
		var naissImmi = false;
		// Si majScore === 1 on prepare une naissance
		if (majScore === 1) {
			var nbrePartSup = 0; // Nombre de partie en attente d'ajout du serpent
			for (var i = aIncu.length - 1 ; i >= 0 ; i--) {
				if (aIncu[i] !== 0) {
					++nbrePartSup;
				}
			}
			var indexFree = aIncu.indexOf(0);
			if(indexFree !== -1) {
				this.setIndexAIncu(indexFree, nbrPas + aPos.length + nbrePartSup);
			} else {
				this.pushAIncu(nbrPas + aPos.length + nbrePartSup);
			}
		// Reduction en cas de super Point manger
		} else if (majScore === 5) {
			// Enleve du bout jusqu'au 3/4 la queue du serpent
			var newLength = Math.round(aPos.length * (4 / 5));
			for (var i = aPos.length - 1 ; i >= newLength ; i--) {
				document.getElementsByClassName('col')[aPos[i]].setAttribute('class', 'col');
				aPos.pop();
			}
		}

		var indexNaissImmi = aIncu.indexOf(nbrPas);
		if (indexNaissImmi !== -1) {
			naissImmi = true;
			this.resetIndexAIncu(indexNaissImmi);
		}

		return naissImmi;
	};

	// Constructeur
	this.pushAPos(firstPos);
	document.getElementsByClassName('col')[aPos[0]].setAttribute('class', 'col actif');
	if (typeof argVitMvt === 'number') {
		this.setVitMvt(argVitMvt);
	}
};
