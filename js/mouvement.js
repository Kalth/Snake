function timingMvt() {
	// Defini la direction du prochain deplacement
	setTimeout(function() {
		calcMvt();
		//document.body.removeEventListener('keyup',choixDir);
		varsGlobal.dirPrece = varsGlobal.dirSnake;
		return;
	}, varsGlobal.vitMvt);
}

function choixDir(event)  {
	console.log(event.which);
	if (event.which == 37 
		&& varsGlobal.dirPrece !== 3) {
		//	Gauche
		console.log(event.which);
		varsGlobal.dirSnake = 2;
		document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col actif left');
	} else if (event.which == 39 
		&& varsGlobal.dirPrece !== 2) {
		//	Droite
		console.log(event.which);
		varsGlobal.dirSnake = 3;
		document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col actif right');
	} else if (event.which == 38 
		&& varsGlobal.dirPrece !== 4) {
		//	Haut
		console.log(event.which);
		varsGlobal.dirSnake = 1;
		document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col actif top');
	} else if (event.which == 40 
		&& varsGlobal.dirPrece !== 1) {
		//	Bas
		console.log(event.which);
		varsGlobal.dirSnake = 4;
		document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col actif bottom');
	}
}

function calcMvt() {
	var posValide = varsGlobal.pos;
	// Defini où la tete va arriver
	if (varsGlobal.dirSnake == 2 
		&& varsGlobal.pos != 0 
		&& (varsGlobal.pos % varsGlobal.dimArea[0]) != 0) {
		// Gauche
		--posValide;
	} else if (varsGlobal.dirSnake == 2 
		&& (varsGlobal.pos == 0 
			|| (varsGlobal.pos % varsGlobal.dimArea[0]) == 0)) {
		// Part du bord gauche et arrive au bord droit
		posValide += varsGlobal.dimArea[0] - 1;
	} else if (varsGlobal.dirSnake == 3 
		&& ((varsGlobal.pos + 1) % varsGlobal.dimArea[0]) != 0) {
		// Droite
		++posValide;
	} else if (varsGlobal.dirSnake == 3 
		&& ((varsGlobal.pos + 1) % varsGlobal.dimArea[0]) == 0) {
		// Part du bord droit et arrive au bord gauche
		posValide -= varsGlobal.dimArea[0] - 1;
	} else if (varsGlobal.dirSnake == 1 
		&& (varsGlobal.pos - varsGlobal.dimArea[0]) >= 0) {
		// Haut
		posValide -= varsGlobal.dimArea[0];
	} else if (varsGlobal.dirSnake == 1 
		&& (varsGlobal.pos - varsGlobal.dimArea[0]) < 0) {
		// Part du bord haut et arrive au bord bas
		posValide += (varsGlobal.dimArea[0]*(varsGlobal.dimArea[1] -1));
	} else if (varsGlobal.dirSnake == 4 
		&& (varsGlobal.pos + varsGlobal.dimArea[0]) < (varsGlobal.dimArea[0] * varsGlobal.dimArea[1])) {
		// Bas
		posValide += varsGlobal.dimArea[0];
	} else if (varsGlobal.dirSnake == 4 
		&& (varsGlobal.pos + varsGlobal.dimArea[0]) >= (varsGlobal.dimArea[0] * varsGlobal.dimArea[1])) {
		// Part du bord bas et arrive au bord haut
		posValide -= (varsGlobal.dimArea[0]*(varsGlobal.dimArea[1] -1));
	}
	mouvement(posValide);
}

function mouvement(posValide) {
	var naissImmi = false;
	var sPoint = false;
	var fruit = false;
	var classCasePosValide = document.getElementsByClassName('col')[posValide].getAttribute('class');
	
	// Enleve la tete de l'anciennce position
	++varsGlobal.nbrePas;
	posiFinQueue = varsGlobal.tabPosi[varsGlobal.tabPosi.length - 1]; 
	// Verifi si la case d'arrivé contient un point, ou une partie du serpent
	if (classCasePosValide == 'col point') {
		pointMarqué(1);
		fruit = true;
	} else if (classCasePosValide == 'col sPoint') {
		pointMarqué(5);
		sPoint = true;
	}
	naissImmi = croissance(fruit, sPoint);
	if ((classCasePosValide  == 'col queue') 
		&& ((posValide == posiFinQueue && naissImmi == true) // Le gameOver ne se declenche pas si il touche le bout de la queue et qu'elle ne doit pas grandir a ce pas
			|| (posValide != posiFinQueue))) {
		gameOver();
		return;
	}
	if (naissImmi === true) {
		var posNaiss;
		// Si une partie doit apparaitre, sauvgarde la derniere position de la queue avant la mise a jour
		if (varsGlobal.tabPosi.length === 0){
			posNaiss = varsGlobal.pos;
		} else {
			posNaiss = varsGlobal.tabPosi[varsGlobal.tabPosi.length - 1];
		}
		console.log(posNaiss);
	}
	// Amene la tete a la position valide
	changeAttr(posValide);
	document.getElementsByClassName('col')[varsGlobal.pos].setAttribute('class', 'col');
	if (varsGlobal.tabPosi != []) {
		for (var i = varsGlobal.tabPosi.length - 1; i >= 0; --i) {
			if (i == varsGlobal.tabPosi.length - 1 && posValide === varsGlobal.tabPosi[i]) {
				// Si a la derniere position de la queue avant le mouvement est la position valide pour la tete ne rien faire
			} else if (i == varsGlobal.tabPosi.length - 1 && posValide !== varsGlobal.tabPosi[i]) {
				// Sinon avance la derniere occurence de la queue d'une case
				document.getElementsByClassName('col')[varsGlobal.tabPosi[i]].setAttribute('class', 'col');
			}
			// Mise a jour des position de la queue
			if (i === 0) {
				varsGlobal.tabPosi[i] = varsGlobal.pos;
				// Avance la premiere occurence de la queue
				document.getElementsByClassName('col')[varsGlobal.tabPosi[i]].setAttribute('class', 'col queue');
			} else {
				varsGlobal.tabPosi[i] = varsGlobal.tabPosi[i-1];
			}
		}
	}

	if (naissImmi === true) {
		naissance(posNaiss);
	}

	varsGlobal.pos = posValide; 
	timingMvt();
}

function changeAttr(posValide) {
	console.log(posValide);
	console.log(varsGlobal.pos)
	var attrTete = document.getElementsByClassName('col')[varsGlobal.pos].getAttribute('class');
	console.log(attrTete);
	document.getElementsByClassName('col')[posValide].setAttribute('class', attrTete);
}