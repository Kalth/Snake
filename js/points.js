function appPoints() {
	var randSPoint;
	var randPosiAppPoint;
	// 
	if (varsGlobal.tabPosi.length <= 4 
		|| varsGlobal.sPTimer == true) {
		randSPoint = 1;
	} else {
		randSPoint = Math.round(Math.random() * 10);
	}

	randPosiAppPoint = Math.round(Math.random() * (varsGlobal.dimArea[0] * varsGlobal.dimArea[1] - 1)); // verfifier sa porté
	while(true) {
		console.log(randPosiAppPoint);
		var attrCaseAppPoint = document.getElementsByClassName('col')[randPosiAppPoint].getAttribute('class');
		if (attrCaseAppPoint != 'col actif' 
			&& attrCaseAppPoint != 'col point' 
			&& attrCaseAppPoint != 'col queue' 
			&& attrCaseAppPoint != 'col sPoint' 
			&& randSPoint <= 9) {
			document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col point');
			break;
		} else if (attrCaseAppPoint != 'col actif' 
			&& attrCaseAppPoint != 'col point' 
			&& attrCaseAppPoint != 'col queue' 
			&& attrCaseAppPoint != 'col sPoint' 
			&& randSPoint === 10) {
			document.getElementsByClassName('col')[randPosiAppPoint].setAttribute('class', 'col sPoint');
			varsGlobal.sPTimer = true;
			console.log('Super point apparu!');
			setTimeout(timerSPoint(randPosiAppPoint),10000);
			break;
		} else {
			randPosiAppPoint = Math.round(Math.random() * (varsGlobal.dimArea[0] * varsGlobal.dimArea[1]));
		}
	}
}
function timerSPoint(posiSPoint) {
	if (document.getElementsByClassName('col')[posiSPoint].getAttribute('class') == 'col sPoint') {
		document.getElementsByClassName('col')[posiSPoint].setAttribute('class', 'col');
		appPoints();
	}
	varsGlobal.sPTimer = false;
}

function pointMarqué(pts) { // pas d'accent!!!!
	var affSco = document.getElementById('score');
	varsGlobal.sco += pts;
	affSco.innerHTML = varsGlobal.sco + ' pts';
	appPoints();
	// En cas de super Point le serpent accelere
	if (pts == 5) {
		vitessePlus();
	}
	// Si le score attein le palier diffSco le serpent accelere et le palier est augmenté
	if (varsGlobal.sco >= varsGlobal.diffSco) {
		varsGlobal.diffSco += varsGlobal.diffSco + varsGlobal.sco / 2;
		augVitesse();
	}
}

function augVitesse() {
	var minMvt = 100;
	var variMvt;
	var l = Math.ceil(varsGlobal.sco / 4) + 1;
	variMvt = 650 - (Math.log(l) * 325);
	if (variMvt > 0) {
		varsGlobal.vitMvt = minMvt + variMvt;
	} else {
		varsGlobal.vitMvt = minMvt;
	}
}