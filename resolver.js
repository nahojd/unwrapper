var randomStringGenerator = getRandomString;

var registeredUrls = {};

function getRandomString() {
	var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function register(url) {
	var shortUrl = randomStringGenerator();
	registeredUrls[shortUrl] = url;
	return shortUrl;
}

function resolve(shortUrl) {
	return registeredUrls[shortUrl];
}

function init(settings) {
	if (settings.randomStringGenerator)
		randomStringGenerator = settings.randomStringGenerator;
}

module.exports = {
	init: init,
	register: register,
	resolve: resolve
};