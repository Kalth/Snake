function creatArea() {
	area = '';
	varsGlobal.dimArea[0] = parseInt(window.prompt('Combien de colonnes?'));
	varsGlobal.dimArea[1]  = parseInt(window.prompt('Combine de lignes?'));
	// Crée le quadrillage selon la taille demandé
	for (var i = varsGlobal.dimArea[1]; i > 0; i--) {
		var area += '<div class=\'row\'>';
		for (var j = varsGlobal.dimArea[0]; j > 0; j--) {
			area += '<div class=\'col\'></div>';
		}
		area += '</div>';
	}
	document.getElementById('map-container').innerHTML = area;
	// 
	document.getElementsByClassName('col')[0].setAttribute('class', 'col actif');
	qDiv = document.getElementsByClassName('col').length;
	appPoints();
}