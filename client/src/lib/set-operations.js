/*
 * Operators for Sets/Lists
 */

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}


export default {
	not,
	intersection,
};
