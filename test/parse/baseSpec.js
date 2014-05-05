
describe('Parseangular', function () {

  describe('config provider', function () {

    var parseangularProvider;

    beforeEach(function () {

      // Create a fake module so we can get the mallzee service provider to test the config methods
      var configModule = angular.module('test.parseangular', function () {});
      configModule.config(function(ParseangularProvider) {
        parseangularProvider = ParseangularProvider;
        parseangularProvider.initialize('appid', 'apikey');
      });

      module('parseangular', 'test.parseangular');

      inject(function () {});
    });

    it('should allow the configuration of the base url', function() {

      // Check we have the injected provider from our fake module
      expect(parseangularProvider).to.not.equal(null);

      // Check the default base URL.
      expect(parseangularProvider.getBaseUrl()).to.equal('https://api.parse.com/1');
      expect(parseangularProvider.getHeaders()['X-Parse-Application-Id']).to.equal('appid');
      expect(parseangularProvider.getHeaders()['X-Parse-REST-API-Key']).to.equal('apikey');

    });
  });
});