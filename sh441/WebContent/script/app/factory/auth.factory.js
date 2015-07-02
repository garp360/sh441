angular.module('factory.module').factory('AuthFactory', function( $q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	var authRef = $firebaseAuth(factory.AUTH_REF);

	factory.register = function( registrationForm ) {
		var deferred = $q.defer();
		var _credentials = {};
		__validateRegistration(registrationForm).then(function (credentials) {
			_credentials = credentials;
			return authRef.$createUser(_credentials);
		}, function (error) {
			deferred.reject(error);
		}).then(function(userData){
			return authRef.$authWithPassword(_credentials);
		}, function (error) {
			deferred.reject(error);
		}).then(function(authData){
			registrationForm.email = registrationForm.username;
			return $firebaseObject(factory.USER_REF.child(authData.uid));
		}, function (error) {
			deferred.reject(error);
		}).then(function(userData){
			userData.username = registrationForm.username;
			userData.password = registrationForm.password;
			userData.firstName = registrationForm.firstName;
			userData.lastName = registrationForm.lastName;
			userData.middleName = registrationForm.middleName;
			userData.email = registrationForm.username;
			return userData.$save();
		}, function (error) {
			deferred.reject(error);
		}).then(function(userData){
			deferred.resolve(userData);
		}, function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	factory.login = function(loginForm) {
		var deferred = $q.defer();
		__validateLogin(loginForm).then(function (credentials) {
			$log.debug("factory.login credentials" + credentials);
			return authRef.$authWithPassword(credentials);
		}, function (error) {
			deferred.reject(error);
		}).then(function(authData) {
			$log.debug("factory.login authData" + authData);
			return $firebaseObject(factory.USER_REF.child(authData.uid)).$loaded();
		}, function (error) {
			deferred.reject(error);
		}).then(function(userData) {
			deferred.resolve(userData);
		}, function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	function __validateLogin(loginForm) {
		var deferred = $q.defer();
		if(loginForm.username && loginForm.password) {
			deferred.resolve(__getCredentials(loginForm));
		} else {
			deferred.reject("Invalid login credentials");
		}

		return deferred.promise;
	};

	function __validateRegistration(registrationForm) {
		var deferred = $q.defer();
		if(registrationForm.username && registrationForm.password) {
			deferred.resolve(__getCredentials(registrationForm));
		} else {
			deferred.reject("Invalid registration form");
		}

		return deferred.promise;
	};

	function __getCredentials(form) {
		return credentials = {
			email: form.username,
			password: form.password
		};
	}

	return factory;

});