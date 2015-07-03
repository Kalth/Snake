var Snake = function() {
	var tabPos; // tableau des position du snake et de sa queue
	var nbrePas; // Nombre de mouvement du snake
	var vitMvt; // Interval de temps entre deux mouvement en milliseconde
	var tabIncu; // Contient les 'dates de naissance' des parties suplementaire de la queue
	var dirPrece; // Direction pris par le serpent au dernier mouvement
	var dirSnake; // Direction pris par le serpent pour le prochain tour

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

	this.pushTabPos = function(newPos) {
		if (typeof newPos === 'number') {
			tabPos.push(newPos);
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

	this.getTaro = function() {
		return taro;
	};

	this.setTaro = function(setTaro) {
		if (typeof setTaro === 'number') {
			taro = setTaro;
		}
	};

	this.getMagot = function() {
		return magot;
	};

	this.setMagot = function(setMagot) {
		if (typeof setMagot === 'number') {
			magot = setMagot;
		}
	};

	this.getHP = function() {
		return hP;
	};

	this.setHP = function(setHP) {
		if (typeof setHP === 'number') {
			hP = setHP;
		}
	};

	this.getSurprise = function() {
		return surprise;
	};

	this.setSurprise = function(setSurprise) {
		if (typeof setSurprise === 'boolean') {
			surprise = setSurprise;
		}
	};

	this.setPrenom(argPrenom);
	this.setSexAppeal(argSexAppeal);
	this.setTaro(argTaro);
	this.setMagot(0);
	if (typeof argSurprise === 'boolean') {
		this.setSurprise(argSurprise);
	} else {
		this.setSurprise(false);
	}
	if (typeof argHP === 'number') {
		this.setHP(argHP);
	} else {
		this.setHP(100);
	}
	
	// Gifle
	this.gifle = function(target) {
		var action;
		var dmg = rand(20);
		var riposte = rand(100);
		if (this.getSurprise === false)
		{
			action = ' gifle ';
		} else {
			action = ' bifle ';
		}
		target.setHP(target.getHP() - dmg);
		console.log(this.getPrenom() + action + target.getPrenom() + ' et lui eneleve ' + dmg + 'pdv.');
		if (riposte <= 80) {
			target.gifle(this);
		}
	}
}