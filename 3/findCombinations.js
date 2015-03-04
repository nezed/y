function findCombinations( list, of ) {
	if(!list || !list instanceof Array)
		throw new Error('Haystack array as first argument required =(');

	of = +(of || 10);

	var values = {};
	for( var i = 0, l = list.length >>> 0; i < l; i++ ) {
		if( values.hasOwnProperty( list[i] ) ) {
			values[ list[i] ]++;
		} else {
			values[ list[i] ] = 1;
		}
	}
	var keys = Object.keys( values ).sort( function(a, b){
		return a-b;
	} );
	var klen = keys.length >>> 0;

	var results = [];
	for( var i = 0; i < klen; i++ ) {
		walker( i, +values[ keys[0] ], 0, [] );
	}
	return results;


	function walker( current, left, sum, elems ) {
		if( left <= 0 ) {
			return;
		}

		left--;
		sum += +keys[current];
		elems.push( keys[current] );

		if( sum === of ) {
			results.push(elems);
		}
		if( sum >= of ) {
			return;
		}

		walker( current, left, sum, elems.slice() );
		for( var i = current + 1; i < klen; i++ ) {
			walker( i, +values[ keys[i] ], sum, elems.slice() );
		}
	}
}
module && module.exports && (module.exports = findCombinations);