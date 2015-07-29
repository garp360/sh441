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
			
			function create(event) {
				return events.$add(event);
			};

			return factory;
    	};
})();

