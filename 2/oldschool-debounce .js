/**
 * @module debounce
 * @type {Object}
 */
typeof module !== "undefined" &&
	module.exports &&
	(module.exports = {
		debounce: o_debounce
	});

function o_debounce(fn, timeout, invokeAsap, context ) {
	if(!fn || !fn instanceof Function)
		throw new Error('Function as first argument required =(');

	timeout = +timeout || 100;

	if( typeof invokeAsap !== "boolean" ) {
		context = invokeAsap;
		invokeAsap = false;
	}

	var timer,
		lastCall = 0,
		args;

	return function() {
		args = arguments;
		context || (context = this);
		lastCall = +new Date();

		invokeAsap && !timer && fn.apply(context, args);

		// Во всем виноват не Волан-де-Морт, а оно!
		clearTimeout(timer);
		timer = setTimeout(timedOut, timeout);

		function timedOut() {
			!invokeAsap && fn.apply(context, args);
			timer = undefined;
		}
	}
} 