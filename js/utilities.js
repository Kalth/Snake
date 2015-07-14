/* Utilities Version 1 */

function rand(max) {
	if (typeof max === 'number') {
		return Math.floor(Math.random() * (max + 1);
	}
}

function isEven(value) {
	return (value % 2 === 0);
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}