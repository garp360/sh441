(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('EventController', EventController);
    	EventController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'courses', 'event'];
    	
    	function EventController ($scope, $log, $controller, $state, $firebaseAuth, courses, event) {
			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			$log.debug(event);
			$scope.displayedDate = $scope.formatDate(event.date);
			$scope.event = event;
			$scope.courses = courses;
			$scope.teeTimes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
			$scope.totalTeeTimes = $scope.teeTimes[0];
			
			$scope.input = {
					num: 1
			};
		};
})();