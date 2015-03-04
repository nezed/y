var min = -300,
	max = 150,
	num = 20;

for( var i = 0, haystack = new Array(num), range = (max - min); i < num; i++) {
	haystack[i] = Math.round( Math.random() * range ) + min;
}

require( 'fs' ).writeFile( 'haystack.json', JSON.stringify(haystack), console.log.bind(console, 'Success!') );