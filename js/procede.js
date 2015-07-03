function initGame() {
	varsGlobal.dimArea = [0, 0]; // Collones et lignes de l'air de jeux
	varsGlobal.pos = 0; // Position du serpent
	varsGlobal.tabPosi = []; // tableau des position de la queue
	varsGlobal.nbrePas = 0; // Nombre de mouvement du snake
	varsGlobal.score = 0; // Score du joueur
	varsGlobal.vitMvt = 750; // Interval de temps entre deux mouvement en milliseconde
	varsGlobal.tabIncu = []; // Contient les 'dates de naissance' des parties suplementaire de la queue
	varsGlobal.diffSco = 4; // Palier a atteindre pour une augmentation de vitesse
	varsGlobal.sPTimer = false; // Defini si un super point est deja sur le terrain
	varsGlobal.dirPrece = 0;
	varsGlobal.dirSnake = 0;

	var area = '';

	varsGlobal.isRunning = true;
	varsGlobal.dimArea[0] = parseInt(window.prompt('Combien de colonnes?'));
	varsGlobal.dimArea[1]  = parseInt(window.prompt('Combine de lignes?'));
	// Crée le quadrillage selon la taille demandé
	for (var i = varsGlobal.dimArea[1] ; i > 0 ; i--) {
		area += '<div class=\'row\'>';
		for (var j = varsGlobal.dimArea[0];j > 0; j--) {
			area += '<div class=\'col\'></div>';
		}
		area += '</div>';
	}
	document.getElementById('map-container').innerHTML = area;
	// Positione le serpent a sa position de départ puis lance le permier mouvement et le premier point.
	document.getElementsByClassName('col')[0].setAttribute('class', 'col actif');
	timingMvt();
	appPoints();
	document.body.addEventListener('keydown',choixDir);
}

function gameOver() {
	window.alert('Perdu   Score : ' + varsGlobal.sco);
	document.getElementById('map-container').innerHTML = '';
}