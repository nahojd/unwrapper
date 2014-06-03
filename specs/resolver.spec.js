var resolver = require('../resolver');

describe('resolver', function() {
	it('should work', function() {
		expect(true).toBe(true);
	})

	describe('register url', function() {
		beforeEach(function() {
			resolver.init({ randomStringGenerator: function() { return 'AaBb1'; } });
		});

		it('should return a short url', function() {
			var result = resolver.register('http://example.com');

			expect(result).toBe('AaBb1');
		})
	});

	describe('resolve url', function() {
		describe('url is registered', function() {
			it('should return the registered url', function() {
				var shortUrl = resolver.register('http://example.com');

				var result = resolver.resolve(shortUrl);

				expect(result).toBe('http://example.com');
			});
		});

		describe('url is not registered', function() {
			it('should return undefined', function() {
				var result = resolver.resolve('abcde');

				expect(result).toBeUndefined();
			});
		});
	});


});