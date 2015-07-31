(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('EventFactory', EventFactory);

    	EventFactory.$inject = ['$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'AuthFactory'];
    
    	function EventFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, AuthFactory) {
			var factory = angular.extend(AuthFactory, {});

			factory.createEvent = save;
			factory.updateEvent = save;

			function save(eventToSave) {
				var deferred = $q.defer();
				var id = "evt-" + this.createGuid();
				var user = "UNKNOWN";
				var timestamp = moment().toISOString();
				
				this.getAuth().then(function(authData) {
					return authData;
				}).then(function(authData) {
					if(authData) {
						user = authData.uid;
						if(eventToSave && eventToSave.$id) {
							id = eventToSave.$id;
						}
						return $firebaseObject(factory.EVENT_REF.child(id)).$loaded();
					} else {
						return null;
					}
				}).then(function(event) {
					if(event) {
						event.name = eventToSave.name;
						event.course = eventToSave.course;
						event.date = eventToSave.date;
						event.teeTimes = eventToSave.teeTimes;
						event.createdDate = timestamp;
						event.modifiedDate = timestamp;
						event.createdBy = user;
						event.modifiedBy = user;
						return event.$save();	
					} else {
						return null;
					}
				}).then(function(event) {
					if(event) {
						return $firebaseObject(factory.EVENT_REF.child(id)).$loaded();
					} else {
						return null;
					}
				}).then(function(event) {
					if(event) {
						deferred.resolve(event);	
					} else {
						deferred.reject("Error creating event");
					}
				},function(error) {
					deferred.reject(error);
				});
				
				return deferred.promise;
			};
			
			
			return factory;
    	};
})();

