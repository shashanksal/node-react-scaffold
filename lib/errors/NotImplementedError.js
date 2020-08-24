
class NotImplementedError extends Error {
	constructor(methodName) {
		super(`Required method not implemented: ${methodName}`);
		this.name = 'NotImplementedError';
	}
}


module.exports = NotImplementedError;
