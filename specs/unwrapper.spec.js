describe('unwrapper', function() {
	var unwrapper;

	describe('unwrap', function() {
		beforeEach(function() {
			unwrapper = require('../unwrapper');
		});

		var fakeLookup = function(url, callback) {
			var lookupTable = {
				'http://slate.me/1h0svt8': { statusCode: 301, redirectUrl: 'http://slate.trib.al/8OfbdvM' },
				'http://slate.trib.al/8OfbdvM': { statusCode: 301, redirectUrl: 'http://slate.me/1tByJQz' },
				'http://slate.me/1tByJQz': { statusCode: 301, redirectUrl: 'http://www.slate.com/blogs/future_tense' },
				'http://www.slate.com/blogs/future_tense': { statusCode: 200 }
			};

			if (lookupTable[url]) {
				callback(lookupTable[url]);
				return;
			}
				

			callback({ statusCode: 404 });
		}

		it('should follow permanent redirects', function(done) {
			unwrapper.init({ lookup: fakeLookup });

			unwrapper.unwrap('http://slate.me/1h0svt8', function(result) {
				expect(result).toBe('http://www.slate.com/blogs/future_tense');
				done();	
			});

			
		});

		it('should resolve actual redirects', function(done) {
			unwrapper.init();

			unwrapper.unwrap('http://goo.gl/8yruDv', function(result) {
				expect(result).toBe('http://johan.driessen.se/');
				done();	
			});

			
		});
	});
});