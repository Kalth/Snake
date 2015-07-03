function rand(max) {
	if (typeof max === 'number') {
		return Math.round(Math.random() * max);
	}
}

function isEven(value) {
	return (value % 2 === 0);
}