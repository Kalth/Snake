function rand(max) {
	if (typeof max === 'number') {
		return Math.floor(Math.random() * (max + 1));
	}
}

function isEven(value) {
	return (value % 2 === 0);
}