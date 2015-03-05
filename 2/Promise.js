/**
 * Из "спортивного интереса" на скорую руку
 * @module findCombinations
 * @type {Function}
 */
typeof module !== "undefined" && module.exports && (module.exports = Promise);

/**
 * @constructor
 */
function Promise() {
	var callbacks = [];

	return {
		then: function(fn) {
			callbacks.push(fn);
			return this;
		},
		resolve: function() {
			for( var i = 0, l = callbacks.length; i < l; i++ ) {
				callbacks[i]();
			}
			callbacks.splice();
			return this;
		}
	}
}