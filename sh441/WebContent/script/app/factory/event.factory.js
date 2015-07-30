(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('EventFactory', EventFactory);

    	EventFactory.$inject = ['$q', '$log', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'AuthFactory'];
    
    	function EventFactory($q, $log, $firebaseAuth, $firebaseArray, $firebaseObject, AuthFactory) {
			var factory = angular.extend(AuthFactory, {});
			var eventRef = factory.EVENT_REF;
		    var events = $firebaseArray(eventRef);
		    
			factory.createEvent = create;
			
			function create(eventToCreate) {
				var deferred = $q.defer();
				
				events.$add(eventToCreate).then(function (ref) {
					var obj = $firebaseObject(eventRef.child(ref.key()));
					return obj.$loaded();
				}, function (error) {
					deferred.reject(error);
				}).then(function(event){
					deferred.resolve(event);
				}, function (error) {
					deferred.reject(error);
				});
		
				return deferred.promise;
			};

			return factory;
    	};
})();

