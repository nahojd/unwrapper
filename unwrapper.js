var http = require('http');

var lookup = defaultLookup;

function defaultLookup(url, callback) {
	console.log('Looking up ' + url);
	http.get(url, function(response) {
		console.log(response.statusCode);
		console.log(response.headers);
		callback({ statusCode: response.statusCode, redirectUrl: response.headers.location });

	}).on('error', function(e) {
		console.log('Error: ' + e.message);
	});
}



function init(settings) {
	if (settings && settings.lookup)
		lookup = settings.lookup;
	else
		lookup = defaultLookup;
} 

function unwrap(url, callback) {

	lookup(url, function(lookupResult) {
		if (lookupResult.statusCode !== 301) {
			callback(url);
			return;
		}

		unwrap(lookupResult.redirectUrl, callback);
	});
}

module.exports = {
	init: init,
	unwrap: unwrap
}