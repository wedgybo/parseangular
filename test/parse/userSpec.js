
describe('Parseangular', function () {

  function classUrl(path, id) {
    return id ?
      'https://api.parse.com/1/' + path + '/' + id :
      'https://api.parse.com/1/' + path;
  }

  describe('User', function () {

    var ParseUser, httpBackend, user, newUser, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseUser_, _$httpBackend_) {
      ParseUser = _ParseUser_;
      httpBackend = _$httpBackend_;

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

    it('should be able to sign up', function () {

      httpBackend.expectPOST(ParseUser.getUrl('users'));

      ParseUser.signUp(newUser).then(function (result) {
        // Tinkering with the should interface. Reads better than expect.
        result.should.be.a('object');
        result.objectId.should.equal('g7y9tkhB7O');
        result.sessionToken.should.equal('pnktnjyb996sj4p156gjtp4im');
        result.createdAt.toDateString().should.equal(createdAtDate.toDateString());
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
      });

      httpBackend.flush();
    });

    it('should delete an object', function () {

      httpBackend.expectDELETE(ParseUser.getUrl('users', user.objectId));

      ParseUser.destroy(user.objectId).then(function (result) {
        //expect(result.status).to.equal(200);
      });

      httpBackend.flush();
    });
  });

});