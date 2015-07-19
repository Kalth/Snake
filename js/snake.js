var Snake = function(firstPos, argVitMvt) {
	var tabPos = []; // tableau des position du snake et de sa queue
	var nbrePas = 0; // Nombre de mouvement du snake
	var vitMvt = 750; // Interval de temps entre deux mouvement en milliseconde
	var tabIncu = []; // Contient les 'dates de naissance' des parties suplementaire de la queue
	var dirPrece = 0; // Direction pris par le serpent au dernier mouvement
	var dirSnake = 3; // Direction pris par le serpent pour le prochain tour
	var tabDirAllow = [1, 2, 3, 4]; // Seulement les fleches directionelles sont autorisé

	this.getTabPos = function() {
		return tabPos;
	};

	this.setTabPos = function(newTabPos) {
		if (newTabPos.constructor === Array) {
			for (var i = newTabPos.length - 1; i >= 0; i--) {
				if (typeof newTabPos[i] !== 'number') {
					return false;
				}
			}
		tabPos = newTabPos;
		}
	};

	this.setIndexTabPos = function(index, value) {
		if (typeof index === 'number'
		&& typeof value === 'number') {
			tabPos[index] = value;
		}
	};

	this.pushTabPos = function(newPart) {
		if (typeof newPart === 'number') {
			tabPos.push(newPart);
		};
	};

	this.popTabPos = function() {
		tabPos.pop();
	};

	this.getNbrePas = function() {
		return nbrePas;
	};

	this.addNbrePas = function() {
		++nbrePas;
	};

	this.getVitMvt = function() {
		return vitMvt;
	};

	this.setVitMvt = function(newVitMvt) {
		if (typeof newVitMvt === 'number') {
			vitMvt = newVitMvt;
		}
	};

	this.getTabIncu = function() {
		return tabIncu;
	}

	this.getIndexTabIncu = function(value) {
		return tabIncu.indexOf(value);
	};

	this.setIndexTabIncu = function(index, value) {
		if (typeof index === 'number'
		&& typeof value === 'number') {
			tabIncu[index] = value;
		}
	};

	this.pushTabIncu = function(newBirth) {
		if (typeof newBirth === 'number') {
			tabIncu.push(newBirth);
		}
	};

	this.resetIndexTabIncu = function(index) {
		if (tabIncu[index] !== undefined) {
			tabIncu[index] = 0;
		}
		console.log('index a : ' + index);
		console.log('tabIncu a : ' + tabIncu);
		console.log('reset a : ' + tabIncu[index]);
	};

	this.getDirPrece = function() {
		return dirPrece;
	};

	this.setDirPrece = function() {
		dirPrece = dirSnake;
	};

	this.getDirSnake = function() {
		return dirSnake;
	};

	this.setDirSnake = function(newDir) {
		if (typeof newDir === 'number'
			&& isEven(newDir) !== isEven(dirSnake)
			&& tabDirAllow.indexOf(newDir) !== -1) {
			dirSnake = newDir;
		}
	};

	console.log(this);
	// Methodes perso
	// Temps avant le prochain deplacement
	this.choixDir = function(event) {
		if (game.getIsPlaying() === false) {
			game.getSnake().timingMvt();
			game.setIsPlaying(true);
		}
		game.getSnake().setDirSnake(event.which - 36);
		document.getElementsByClassName('col')[game.getSnake().getTabPos()[0]].setAttribute('class', 'col actif d' + game.getSnake().getDirSnake());
	};

	this.timingMvt = function() {
		var _this = this;
		setTimeout(function() {
			_this.calcMvt();
		}, _this.getVitMvt());
	};

	this.calcMvt = function() {
		// Si dir = 1 || 2 => diff = -1 sinon => diff = 1
		var diff = this.getDirSnake() - (2 + ((this.getDirSnake() + 1) % 2));
		var posVoulu = this.getTabPos()[0] + game.getDimArea()[0] / (game.getDimArea()[0] * (this.getDirSnake() % 2) + 1 * ((this.getDirSnake() + 1) % 2)) * diff;
		// Si le snake depasse des bord du terrain on corrige la position
		if (posVoulu < 0
		|| posVoulu >= game.getDimArea()[0] * game.getDimArea()[1]
		|| (!isEven(this.getDirSnake()) 
			&& Math.floor(posVoulu / game.getDimArea()[0]) !== Math.floor(this.getTabPos()[0] / game.getDimArea()[0]))) {
			// Si dir = 2 || 4 => y = game.getDimArea()[1] sinon => y = 1
			var y = ( this.getDirSnake() % 2 ) * ( 1 - game.getDimArea()[1] ) + game.getDimArea()[1]; 
			posVoulu = this.getTabPos()[0] + ((game.getDimArea()[0] * y) - y) * ( -diff) /*+ diff * ((this.getDirSnake() + 1) % 2)*/;
		}
		this.mouvement(posVoulu);
	};

	this.mouvement = function(posValide) {
		var majScore = 0;
		var attrPosValide = document.getElementsByClassName('col')[posValide].getAttribute('class');
		var posLastPart = this.getTabPos()[this.getTabPos().length - 1];
		this.addNbrePas();
		// Verifie où le snake arrive
		if (attrPosValide === 'col point') {
			console.log('Trouve un point');
			majScore = 1;
		} else if (attrPosValide === 'col sPoint') {
			console.log('Trouve un super point');
			majScore = 5;
		}
		if (majScore !== 0) {
			console.log('Met a jour le score');
			game.scorePlus(majScore);
		}

		var naissImmi = this.croissance(majScore);
		if ((attrPosValide  === 'col queue') 
		&& ((posValide === posLastPart && naissImmi == true)
		|| (posValide !== posLastPart))) {
			// Le gameOver ne se declenche pas si il touche le bout de la queue et qu'elle ne doit pas grandir a ce pas
			gameOver();
			return;
		}
		if (naissImmi === true) {
			// Si une partie doit apparaitre, sauvgarde la derniere position de la queue avant la mise a jour
			var posNaiss = this.getTabPos()[this.getTabPos().length - 1];
		}
		// Amene la tete a la position valide
		var attrTete = document.getElementsByClassName('col')[this.getTabPos()[0]].getAttribute('class');
		document.getElementsByClassName('col')[posValide].setAttribute('class', attrTete);
		document.getElementsByClassName('col')[this.getTabPos()[0]].setAttribute('class', 'col');
		for (var i = this.getTabPos().length - 1; i > 0; --i) {
			if (i === this.getTabPos().length - 1 && posValide !== this.getTabPos()[i]) {
				document.getElementsByClassName('col')[this.getTabPos()[i]].setAttribute('class', 'col');
			}
			// Mise a jour des position de la queue
			if (i === 1) {
				this.setIndexTabPos(i, this.getTabPos()[0]);
				// Avance la premiere occurence de la queue
				document.getElementsByClassName('col')[this.getTabPos()[i]].setAttribute('class', 'col queue');
			} else {
				this.setIndexTabPos(i, this.getTabPos()[i - 1]);
			}
		}

		if (naissImmi === true) {
			this.pushTabPos(posNaiss);
			document.getElementsByClassName('col')[posNaiss].setAttribute('class', 'col queue');
		}

		this.setIndexTabPos(0, posValide); 
		this.timingMvt();
	};

	// Croissance
	this.croissance = function(majScore) {
		var naissImmi = false;
		// Si majScore === 1 on prepare une naissance
		if (majScore === 1) {
			var nbrePartSup = 0; // Nombre de partie en attente d'ajout du serpent
			console.log(this.getTabIncu());
			for (var i = this.getTabIncu().length - 1; i >= 0; i--) {
				if (this.getTabIncu()[i] !== 0) {
					++nbrePartSup;
				}
			}
			var indexFree = this.getIndexTabIncu(0);
			console.log(indexFree);
			if(indexFree !== -1) {
				this.setIndexTabIncu(indexFree, this.getNbrePas() + this.getTabPos().length + nbrePartSup);
			} else {
				this.pushTabIncu(this.getNbrePas() + this.getTabPos().length + nbrePartSup);
			}
		// Reduction en cas de super Point manger
		} else if (majScore === 5) {
			// Enleve du bout jusqu'au 3/4 la queue du serpent
			var newLength = Math.round(this.getTabPos().length * (4 / 5));
			for (var i = this.getTabPos().length - 1; i >= newLength; i--) {
				document.getElementsByClassName('col')[this.getTabPos()[i]].setAttribute('class', 'col');
				this.popTabPos();
			}
		}

		var indexNaissImmi = this.getIndexTabIncu(this.getNbrePas());
		if (indexNaissImmi !== -1) {
			console.log(indexNaissImmi);
			console.log('naissance Trouvé');
			naissImmi = true;
			this.resetIndexTabIncu(indexNaissImmi);
		}

		return naissImmi;
	};

	// Constructeur
	console.log(firstPos);
	this.pushTabPos(firstPos);
	if (typeof argVitMvt === 'number') {
		this.setVitMvt(argVitMvt);
	}
	console.log(this.getVitMvt());

};
