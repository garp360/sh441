(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('SignUpController', SignUpController);
    	SignUpController.$inject = ['$scope', '$controller', '$log', 'EventFactory', 'events', 'user'];
    	
    	function SignUpController ($scope, $controller, $log, EventFactory, events, user) {
    		angular.extend(this, $controller('AuthController', {$scope: $scope}));
			$scope.events = events;
			$scope.isAdmin = user.role === 'ADMIN';
			
			$scope.eventDate = eventDate;
			$scope.participantCount = participantCount;
			$scope.isParticipant = isParticipant;

			$scope.addParticipant = addParticipant;
			$scope.removeParticipant = removeParticipant;
			
			function eventDate(event) {
				var formattedDate = moment(event.date).format("ddd, MMM Do YYYY");
				
				if(event.teeTimes && event.teeTimes.length > 0) {
					formattedDate = formattedDate + " @ " + moment(event.teeTimes[0].utc).format("h:mm A");
				}
				
				return formattedDate;
			};

			function participantCount(event) {
				var count = 0;
				if(event.participants) {
					for ( var property in event.participants) {
						if (event.participants.hasOwnProperty(property)) {
							count += 1;
						}
					}
				}
				return count;
			};
			
			function isParticipant(event) {
				return event.participants && event.participants[user.$id];
			};
			
			function addParticipant(event) {
				EventFactory.addPlayer(event, user);				
			};

			function removeParticipant(event) {
				EventFactory.removePlayer(event, user);				
			};

		};
})();