function croissance(fruit, sPoint) {
	// Si fruit true on prepare l'ajout d'une partie
	var naissImmi = false;

	if (fruit === true) {
		var e = 0;
		var nbrePartSup = 0; // Nombre de partie en attente d'ajout du serpent
		
		for (var i = varsGlobal.tabIncu.length - 1; i >= 0; i--) {
			if (varsGlobal.tabIncu[i] != 0) {
				++nbrePartSup;
			}
		}
		while(true) {
			// Trouve une instance du tableaux disponible pour marquer la date d'ajout de la partie suplementaire
			if(varsGlobal.tabIncu[e] !== undefined) {
				varsGlobal.tabIncu.push(varsGlobal.nbrePas + varsGlobal.tabPosi.length + nbrePartSup + 1);
				break;
			} else if (varsGlobal.tabIncu[e] == 0) {
				varsGlobal.tabIncu[e] = varsGlobal.nbrePas + varsGlobal.tabPosi.length + nbrePartSup + 1;
				break;
			} else {
				e++;
			}
		}
	}
	// Reduction en cas de super Point manger
	if (sPoint === true) {
		// Enleve du bout jusqu'au 3/4 la queue du serpent
		for (var i = varsGlobal.tabPosi.length - 1; i >= Math.round(varsGlobal.tabPosi.length * (3 / 4)); i--) {
			document.getElementsByClassName('col')[varsGlobal.tabPosi[i]].setAttribute('class', 'col');
			varsGlobal.tabPosi.pop();
		}
	}
	for (var m = 0; m <= varsGlobal.tabIncu.length - 1; m++) {
		// Verifi si une partie doit etre ajouter a ce tour
		if (varsGlobal.tabIncu[m] == varsGlobal.nbrePas) {
			naissImmi = true;
			varsGlobal.tabIncu[m] = 0;
			break;
		}
	}
	return naissImmi;
}

function naissance(posNaiss) {
	varsGlobal.tabPosi.push(posNaiss);
	console.log(posNaiss);
	document.getElementsByClassName('col')[posNaiss].setAttribute('class', 'col queue');
}
