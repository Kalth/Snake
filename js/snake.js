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

	this.getIndexTabIncu = function(value) {
		return tabIncu.indexOf(value);
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

	// Constructeur
	this.pushTabPos(firstPos);
	if (typeof argVitMvt === 'number') {
		this.setVitMvt(argVitMvt);
	}

	// Methodes perso
	// Temps avant le prochain deplacement
	this.timingMvt = function() {
		var _this = this;
		setTimeout(function() {
			_this.calcMvt();
		}, this.vitMvt);
	};

	this.choixDir = function(event) {
		if (game.getIsPlaying() === false) {
			this.timingMvt();
			game.setIsPlaying(true);
		}
		this.setDirSnake(event.which - 36);
		document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col actif d' + this.getDirSnake());
	};

	this.calcMvt = function() {
		var diff == (this.getDirSnake() - ( 2 + this.getDirSnake() % 2));
		if (isEven(this.getDirSnake())) {
			var posVoulu = this.getTabPos()[0] + (game.dimArea[0]) * diff;
		} else {
			var posVoulu = this.getTabPos()[0] + diff;
		}
		this.calcPos(posVoulu);
	};

	this.calcPos = function(posVoulu) {
		var diff == (this.getDirSnake() - ( 2 + this.getDirSnake() % 2));
		var x = game.getDimArea()[0];
		var y = ( this.getDirSnake() % 2 ) * ( 1 - game.getDimArea()[1] ) + game.getDimArea()[1]; // si Haut ou bas = dimeArea[1] si gauche ou droite = 1
		if (posVoulu < 0
			|| posVoulu > x * y){
			// Si 
			return this.getTabPos()[0] + (( x * y ) - y ) * (-diff);
		}
	}
}