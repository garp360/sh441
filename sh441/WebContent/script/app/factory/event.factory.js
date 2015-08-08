(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('EventFactory', EventFactory);

    	EventFactory.$inject = ['$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'AuthFactory'];
    
    	function EventFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, AuthFactory) {
			var factory = angular.extend(AuthFactory, {});

			factory.findAllFutureEvents = findAllFutureEvents; 
			factory.createEvent = save;
			factory.updateEvent = save;
			factory.deleteEvent = deleteEvent;
			factory.addPlayer = addPlayer;
			factory.removePlayer = removePlayer;

			function findAllFutureEvents() {
				return $firebaseArray(factory.EVENT_REF);
			};

			function save(eventData) {
				var deferred = $q.defer();
				var id = "evt-" + this.createGuid();
				var username = "UNKNOWN";
				var timestamp = moment().toISOString();
				var isCreate = true;
				
				if(eventData && eventData.$id) {
					isCreate = false;
					id = eventData.$id;
				}
				
				this.getUser().then(function(userObj) {
					username = userObj.username;
					return $firebaseObject(factory.EVENT_REF.child(id)).$loaded();
				}).then(function(event){
					transform(event, eventData, username, timestamp, isCreate);
					return event.$save();	
				}, function(error) {
					deferred.reject(error);
				}).then(function(event) {
					return $firebaseObject(factory.EVENT_REF.child(id)).$loaded();
				}, function(error) {
					deferred.reject(error);
				}).then(function(event) {
					deferred.resolve(event);	
				}, function(error) {
					deferred.reject(error);
				});
				
				return deferred.promise;
			};
			
			function deleteEvent(eventData) {
				var deferred = $q.defer();
				var id = eventData.$id;
				
				$firebaseObject(factory.EVENT_REF.child(id)).$loaded().then(function(event) {
					return event.$remove();
				}, function(error) {
					deferred.reject(error);
				}).then(function(event) {
					return $firebaseArray(factory.EVENT_REF);
				}).then(function(events) {
					deferred.resolve(events);	
				});
				
				return deferred.promise;
			};
			
			function transform(event, eventData, username, timestamp, isCreate){
				event.name = eventData.name;
				event.course = eventData.course;
				event.date = eventData.date;
				event.teeTimes = eventData.teeTimes;
				if(isCreate) {
					event.createdDate = timestamp;
					event.createdBy = username;
					event.participants = [];
				}
				event.modifiedDate = timestamp;
				event.modifiedBy = username;
			};
			
			
			function addPlayer(eventData, userData) {
				var player = transformUserToPlayer(userData);
				factory.EVENT_REF.child(eventData.$id).child('participants').child(userData.$id).set(player);
			};

			function removePlayer(eventData, userData) {
				factory.EVENT_REF.child(eventData.$id).child('participants').child(userData.$id).remove();
			};
			
			
			function transformUserToPlayer(userData) {
				return {
					username: userData.username,
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					abbr: userData.firstName.charAt(0) + ". " + userData.lastName
				};
			}
			
			return factory;
    	};
})();

