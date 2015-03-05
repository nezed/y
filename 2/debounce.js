/**
 * @module debounce
 * @type {Object}
 */
typeof module !== "undefined" &&
	module.exports &&
	(module.exports = {
		debounce: debounce,
		throttle: throttle
	});

/**
 * Звезда в представлении не нуждается
 * 
 * С каждой попыткой вызова дебаунснутой функции, итоговый таймаут отодвигается на timeout
 *
 * > Debounced with `invokeAsap` == false:
 * > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
 * >                          X                                 X
 * >
 * > Debounced with `invokeAsap` == true:
 * > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
 * > X                                 X
 *
 * @param {Function} fn функция которую нужно выполнять не чаще timeout
 * @param {Number} timeout Uint32
 * @param {Boolean} [invokeAsap] Указывает когда будет вызвана исходная функция. true - в момент первого вызова, или false - по истичению таймаута
 * @param {Object} [context] контекст в котором будет вызываться fn
 */
function debounce(fn, timeout, invokeAsap, context ) {
	if(!fn || !fn instanceof Function)
		throw new Error('Function as first argument required =(');

	timeout = timeout >>> 0 || 100;

	// invokeAsap мы не троаем видите ли, зато контекс по полной
	if( arguments.length === 3 && typeof invokeAsap !== "boolean" ) {
		context = invokeAsap;
		invokeAsap = false;
	}

	/** пусть будет тут ID таймера, если он есть */
	var timer,
		/**
		 * Время последнего вызова дебаунстой функции.
		 * Нужно чтобы не делать каждый раз clear/setTimeout
		 */
		lastCall = 0,
		/** Аргументы, с которыми последний раз была вызвана дебаунснутая ф-я */
		args;


	/**
	 * Непосредственно объявление и возврат дебаунснутой функции,
	 * которая и будет вершить правосудие
	 */
	return function() {
		// Запомним контекст и аргументы текущего вызова.
		// Если оригинальную функцию нужно вызвать сейчас - ничего страшного
		// А вообще, пригодится при invokeAsap == false
		args = arguments;
		context || (context = this);

		// Когда был последний вызов? Да только что
		lastCall = +new Date();

		// Вот, вызвать оригинальную ф-ю только если не висит таймаутов с прошлых вызовов
		invokeAsap && !timer && fn.apply(context, args);

		// Ты у нас первый раз? Поставим на счетчик
		if( !timer ) {
			timer = setTimeout(timedOut, timeout);
		}

		function timedOut() {
			// Если с момента ожидания таймаутов не было вызовов
			// Надо же, такая ситуация встречается =D
			if( +new Date() - lastCall >= timeout ) {
				// Ну уж если в строке 56 не вызвали, то тут то должны. Почти должны
				!invokeAsap && fn.apply(context, args);
				// таймеров больше нет, ждать и вызывать пока нечего, отдыхай
				timer = undefined;
			} else {
				// Еще успело прилететь вызовов?
				// Ок, подождем...
				timer = setTimeout(
					timedOut,
					// Ну дык если второй вызов произошел спустя timeout/2,
					// то еще ждать целый timeout смысла не имеет
					lastCall - +new Date() + timeout
				);
			}
		}
	}
}

/**
 * Крутой зверь, шустрый.
 * с момента первого вызова в течении timeout все вызовы будут игнорироваться.
 * Кроме первого и последнего, в зависимости от invokeAsap
 *
 * > Throttled with `invokeAsap` == false:
 * > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
 * >      X    X    X    X    X             X    X    X    X    X
 * >
 * > Throttled with `invokeAsap` == true:
 * > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
 * > X    X    X    X    X             X    X    X    X    X
 *
 * @param {Function} fn функция которую нужно выполнять не чаще timeout
 * @param {Number} timeout Uint32
 * @param {Boolean} [invokeAsap] Указывает когда будет вызвана исходная функция. true - в момент первого вызова, или false - по истичению таймаута
 * @param {Object} [context] контекст в котором будет вызываться fn
 */
function throttle(fn, timeout, invokeAsap, context) {
	if(!fn || !fn instanceof Function)
		throw new Error('Function as first argument required =(');

	timeout = timeout >>> 0 || 100;

	// invokeAsap мы не троаем видите ли, зато контекс по полной
	if( arguments.length === 3 && typeof invokeAsap !== "boolean" ) {
		context = invokeAsap;
		invokeAsap = false;
	}


	/** пусть будет тут ID таймера, если он есть */
	var timer,
		/** Аргументы, с которыми последний раз была вызвана дебаунснутая ф-я */
		args;

		/**
		 * Непосредственно объявление и возврат троттлнутой функции, (кто-нибудь, верните мне мой язык)
		 * которая и будет вершить правосудие
		 */
		return function() {
			// Запомним контекст и аргументы текущего вызова.
			// Если оригинальную функцию нужно вызвать сейчас - ничего страшного
			// А вообще, пригодится при invokeAsap == false
			args = arguments;
			context || (context = this);

			// Вот, вызвать оригинальную ф-ю только если не висит таймаутов с прошлых вызовов
			invokeAsap && !timer && fn.apply(context, args);

			// Че вызываешь!!1 Занято!
			if(timer)
				return;

			// Ты у нас первый раз? Поставим на счетчик
			timer = setTimeout(timedOut, timeout);

			function timedOut() {
				// Ну уж если в строке 127 не вызвали, то тут то должны. Почти должны
				!invokeAsap && fn.apply(context, args);
				// таймеров больше нет, ждать и вызывать пока нечего, отдыхай
				timer = undefined;
			}
		}
}