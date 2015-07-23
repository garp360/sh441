(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('EventController', EventController);
    	EventController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'courses', 'event', 'teeTimes'];
    	
    	function EventController ($scope, $log, $controller, $state, $firebaseAuth, courses, event, teeTimes) {
			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			$log.debug("Event :" + event);
			$log.debug("TeeTimes :" + teeTimes[event.course.id]);
			$scope.displayedDate = event.date.formatted;
			$scope.event = event;
			$scope.courses = courses;
			$scope.teeTimes = teeTimes[event.course.id];
			$scope.eventTeeTime = $scope.teeTimes[1];

			
//			$scope.changeCourse = function() {
//				
//				
//			};
//			
//			
//			$scope.updateTeeTimes = function() {
//				var startingTeeTime = $scope.event.date;
//				var teeTimes = [];
//				teeTimes.push(startingTeeTime);
//				for(var i=0; i<val-1; i++) {
//					var nextTeeTime = moment(teeTimes[i]).add($scope.course.teeTimeInterval, 'm');
//					teeTimes.push(nextTeeTime);
//				}
//				
//				$scope.event.teeTimes = teeTimes;
//			};
		};
})();