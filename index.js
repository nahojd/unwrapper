var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var unwrapper = require('./unwrapper');
var resolver = require('./resolver');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
	res.render('index', { title: 'Unwrapper' });
});

app.post('/', function(req, res) {
	var url = req.param('url');
	
	unwrapper.unwrap(url, function(unwrappedUrl) {
		var shortUrl = resolver.register(unwrappedUrl);

		res.render('index', { title: 'Unwrapper', url: url, unwrappedUrl: unwrappedUrl, shortUrl: 'http://localhost:3000/' + shortUrl })
	});
});	

app.get('/:shortUrl', function(req, res) {
	var destination = resolver.resolve(req.param('shortUrl'));

	if (destination) {
		res.location(destination);
		res.send(301);
	}
	else {
		res.send(404, 'No can find.')
	}
		

});

app.listen(3000);
