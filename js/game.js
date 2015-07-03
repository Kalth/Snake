var Game = function(x ,y) {
	var dimArea; // Collones et lignes de l'air de jeux
	var score = 0; // Score du joueur
	var superPointTimer = false; // Defini si un super point est deja sur le terrain
	var diffScore = 4; // Palier a atteindre pour une augmentation de vitesse
	var isRunning = false; // Une parti est elle lancé?

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

	this.setDimArea([x,y]);

	
}