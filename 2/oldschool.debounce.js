/**
 * @module debounce
 * @type {Object}
 */
typeof module !== "undefined" &&
	module.exports &&
	(module.exports = {
		debounce: debounce
	});

function debounce(fn, timeout, invokeAsap, context ) {
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

	return function(){
		args = arguments;
		context || (context = this);
		lastCall = +new Date();

		invokeAsap && !timer && fn.apply(context, args);

		clearTimeout(timer);
		timer = setTimeout(timedOut, timeout);

		function timedOut() {
			!invokeAsap && fn.apply(context, args);
			timer = undefined;
		}
	}
} 