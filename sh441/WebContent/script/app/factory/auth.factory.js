(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('AuthFactory', AuthFactory);

    	AuthFactory.$inject = ['$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'BaseFactory'];
    
    	function AuthFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, BaseFactory) {
			var factory = angular.extend(BaseFactory, {});
			var authRef = $firebaseAuth(factory.AUTH_REF);
	
			factory.getUser = getUser;
			factory.getAuth = getAuth;
			factory.logoff = logoff;
			factory.login = login;
			factory.register = register;
			
			function getUser() {
				var deferred = $q.defer();

				getAuth().then(function(authData) {
					return authData;
				}).then(function(authData) {
					if(authData) {
						return $firebaseObject(factory.USER_REF.child(authData.uid)).$loaded();
					} else {
						return null;
					}
				}).then(function(userData) {
					deferred.resolve(userData);
				});
				
				return deferred.promise;
			};

			function getAuth() {
				var deferred = $q.defer();
				deferred.resolve(authRef.$getAuth());
				return deferred.promise;
			};
	
			function logoff() {
				return authRef.$unauth();
			};

			function register ( registrationForm ) {
				var deferred = $q.defer();
				var _credentials = {};
				validateRegistration(registrationForm).then(function (credentials) {
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

			function login (loginForm) {
				var deferred = $q.defer();
				validateLogin(loginForm).then(function (credentials) {
					$log.debug("factory.login credentials" + credentials);
					return authRef.$authWithPassword(credentials);
				}, function (error) {
					deferred.reject(error);
				}).then(function(authData) {
					return getUser();
				}).then(function(userData) {
					deferred.resolve(userData);
				});
		
				return deferred.promise;
			};
			
			function validateRegistration(registrationForm) {
				var deferred = $q.defer();
				if(registrationForm.username && registrationForm.password) {
					deferred.resolve(getCredentials(registrationForm));
				} else {
					deferred.reject("Invalid registration form");
				}

				return deferred.promise;
			};
			
			function validateLogin(loginForm) {
				var deferred = $q.defer();
				if(loginForm.username && loginForm.password) {
					deferred.resolve(getCredentials(loginForm));
				} else {
					deferred.reject("Invalid login credentials");
				}
		
				return deferred.promise;
			};

			function getCredentials(form) {
				return {
					email: form.username,
					password: form.password
				};
			}
		return factory;
	};
})();

