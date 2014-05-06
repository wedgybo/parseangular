
describe('Parseangular', function () {

  describe('User', function () {

    var ParseUser, httpBackend, window, user, newUser, store, createdAtDate = new Date();

    beforeEach(function () {;

      angular.module('test.parseangular', function () {}).config(function (ParseangularProvider) {
        ParseangularProvider.initialize('appid', 'apikey');
      });
      module('parseangular', 'test.parseangular');
    });

    beforeEach(inject(function (_ParseUser_, _$httpBackend_, _$window_) {

      ParseUser = _ParseUser_;
      ParseUser.parse.setAppId('appid');
      ParseUser.parse.setApiKey('apikey');

      httpBackend = _$httpBackend_;
      window = _$window_;

      newUser = {
        username: 'cooldude6',
        password: '1234',
        phone: '415-392-0202'
      };

      user = {
        "username": "cooldude6",
        "phone": "415-392-0202",
        "createdAt": createdAtDate,
        "updatedAt": createdAtDate,
        "objectId": "g7y9tkhB7O"
      };

      store = {};

      sinon.stub(window.localStorage, 'setItem', function (key, data) {
        return store[key] = data;
      });

      sinon.stub(window.localStorage, 'getItem', function (key) {
        return store[key];
      });

      // List users
      httpBackend.whenGET(ParseUser.getUrl('users')).respond(200, { results: [user] });
      // GET a user
      httpBackend.whenGET(ParseUser.getUrl('users', user.objectId)).respond(200, user);

      // SignUp
      httpBackend.whenPOST(ParseUser.getUrl('users')).respond(201, {
        "createdAt": createdAtDate,
        "objectId": "g7y9tkhB7O",
        "sessionToken": "pnktnjyb996sj4p156gjtp4im"
      });

      // Login
      httpBackend.whenGET(ParseUser.getUrl('login')).respond(200, {
        username: 'cooldude6',
        phone: '415-392-0202',
        createdAt: '2011-11-07T20:58:34.448Z',
        updatedAt: '2011-11-07T20:58:34.448Z',
        objectId: 'g7y9tkhB7O',
        sessionToken: 'pnktnjyb996sj4p156gjtp4im'
      });

      // Update user
      httpBackend.whenPUT(ParseUser.getUrl('users', user.objectId)).respond(200);

      // Remove user
      httpBackend.whenDELETE(ParseUser.getUrl('users', user.objectId)).respond(200);

    }));

    afterEach(function () {
      // Reset the spies after each test
      window.localStorage.setItem.restore();
      window.localStorage.getItem.restore();
    });

    it('should be able to sign up a new user', function () {

      httpBackend.expectPOST(ParseUser.getUrl('users'));

      ParseUser.signUp(newUser).then(function (result) {
        // Tinkering with the should interface. Reads better than expect.
        result.should.be.a('object');
        result.objectId.should.equal('g7y9tkhB7O');
        result.sessionToken.should.equal('pnktnjyb996sj4p156gjtp4im');
        result.createdAt.toDateString().should.equal(createdAtDate.toDateString());

        expect(store).to.not.be.empty;
        expect(window.localStorage.setItem.called).to.be.true;
      });

      httpBackend.flush();
    });

    it('should fail signing up if required fields are missing', function () {

      expect(function () {
        ParseUser.signUp({ password: 'nousername' });
      }).to.throw('Field username is required');

      expect(function () {
        ParseUser.signUp({ username: 'nopassword' });
      }).to.throw('Field password is required');

    });

    it('should be able to login', function () {

      httpBackend.expectGET(ParseUser.getUrl('login') + '?password=1234&username=cooldude6').respond(200, {
        username: 'cooldude6',
        phone: '415-392-0202',
        createdAt: '2011-11-07T20:58:34.448Z',
        updatedAt: '2011-11-07T20:58:34.448Z',
        objectId: 'g7y9tkhB7O',
        sessionToken: 'pnktnjyb996sj4p156gjtp4im'
      });

      ParseUser.login(newUser.username, newUser.password).then(function (result) {
        result.should.be.a('object');
        result.sessionToken.should.be.a('string');
        result.sessionToken.should.equal('pnktnjyb996sj4p156gjtp4im');

        // TODO: Check that the session token is saved to local storage / cookie
      });

      httpBackend.flush();
    });

    it('should be able to logout');

    it('should be able to reset a password', function () {

      httpBackend.expectPOST(ParseUser.getUrl('requestPasswordReset'), { email: 'test@test.com' }).respond(200, {});

      ParseUser.requestPasswordReset('test@test.com').then(function (result) {
        result.should.be.a('object');
        result.should.be.empty;
      });

      httpBackend.flush();
    });

    it('should be able to switch users');

    it('should be able to fetch the current user');

    it('should delete a user', function () {

      httpBackend.expectDELETE(ParseUser.getUrl('users', user.objectId));

      ParseUser.destroy(user.objectId).then(function (result) {
        //expect(result.status).to.equal(200);
      });

      httpBackend.flush();
    });
  });

});