/**
 * @module findCombinations
 * @type {Function}
 */
typeof module !== "undefined" && module.exports && (module.exports = findCombinations);

/**
 * Поиск вохможных комбинаций в массиве, сумма которых равна N
 * Подразумевается что порядок слогаемых нас не интерессует
 * (Если он все таки интерессует, то стоит дописать функцию, 
 * воссоздающую все возможеные комбинации из выходных результатов.)
 *
 * @param {Array} haystack массив слогаемых
 * @param {Number} N искомая сумма
 * @returns {Array} массив из массивов комбинаций слогаемых =)
 */
function findCombinations( haystack, N ) {
	if(!haystack || !haystack instanceof Array)
		throw new Error('Haystack array as first argument required =(');

	// Number пригодится
	N = +N+ || 10);

	// Объект, в качестве ключей которого эл-ты входного массива
	// а ключи - количество вхождений эл-та в исходный массив.
	// Нужно для быстрой сортировки и проходу комбинаций по возрастанию
	// отбрасывая комбинации, сумма которых заведомо больше N
	var values = {};
	for( var i = 0, l = haystack.length >>> 0; i < l; i++ ) {
		if( values.hasOwnProperty( haystack[i] ) ) {
			values[ haystack[i] ]++;
		} else {
			values[ haystack[i] ] = 1;
		}
	}
	// Массив ключей объекта - эл-тов исохдного массива.
	// Сортировочка по возростанию, да
	var keys = Object.keys( values ).sort( function(a, b){
		return a-b;
	} );
	var klen = keys.length >>> 0;

	// Массив результтатов поиска
	var results = [];

	// Запуск волкера =)
	for( var i = 0; i < klen; i++ ) {
		walker( i, +values[ keys[i] ], 0, [] );
	}
	return results;

	/**
	 * Функция выполняющая обход возможных комбинаций
	 * @param {Number} current секущий эл-т из последовательности keys - списка эл-тов исходного массива
	 * @param {Number} left солько осталось экземпляров текущего эл-та
	 * @param {Number} sum сумма всех эл-тов в текущей последовательности
	 * @param {Array} elems массив слогаемых в текущей последовательности
	 * @returns {undefined}
	 */
	function walker( current, left, sum, elems ) {

		// Щито поделать, не осталось ничего...
		if( left <= 0 ) {
			return;
		}

		// Обноаление значения для текущего вызова в стеке перебора
		left--;
		sum += +keys[current];
		elems.push( +keys[current] );

		// Отлично, нашлось, можно и заказчику отдать
		if( sum === N ) {
			results.push(elems);
		}
		// Эти отношения безперспективны
		if( sum >= N ) {
			return;
		}

		// От себя, любименького, может еще что-то и осталось.
		// То самое ветвление с привязкой на то, сколько 
		// экземпляров текущего эл-та пока не использовалось (current, left)
		// Жаль, но elems придется скопировать в новый объект, чтобы 
		// вызовы ниже не переопределяли elems на этом уровне стека вызова
		walker( current, left, sum, elems.slice() );

		// Если текущего не осталось, есть еще много других эл-тов в последовательности
		for( var i = current + 1; i < klen; i++ ) {
			walker( i, +values[ keys[i] ], sum, elems.slice() );
		}
	}
}