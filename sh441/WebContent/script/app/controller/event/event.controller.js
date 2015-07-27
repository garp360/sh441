(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('EventController', EventController);
    	EventController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'courses', 'event'];
    	
    	function EventController ($scope, $log, $controller, $state, $firebaseAuth, courses, event, teeTimes) {
			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			$log.debug("Event :" + event);
			$scope.event = event;
			$scope.courses = courses;
			$scope.eventTeeTime = event.course.availableTeeTimes[1];
			
			$scope.onTimeSet = function(newDate, oldDate) {
				$scope.event.date = {
	        		formatted: (moment(newDate).hour(courses[2].teeTimeStart).minute(0).second(0)).format('ddd, MMM Do, YYYY'),
	        		utc: (moment(newDate).hour(courses[2].teeTimeStart).minute(0).second(0)).toDate()
	        	};
			};
			
			$scope.displayTeeTimes = function(event) {
				var teeTimes = "";
				angular.forEach(event.teeTimes, function(teeTime) {
					if(teeTimes.length > 0) {
						teeTimes = teeTimes + ", ";
					}
					teeTimes = teeTimes + teeTime.formatted;
				});
				return teeTimes;
			};
			
//			$scope.changeCourse = function() {
//				
//				
//			};
//			
//			
//			$scope.updateTeeTimes = function() {

//    			var scheduled = [teeTimes[5], teeTimes[6], teeTimes[7], teeTimes[8]];
//    			var available = teeTimes;
//    			available.splice(5,4);
//    			return {
//    	        	name: 'Pidcock Group',
//    	        	date: {
//    	        		formatted: (moment(new Date()).hour(courses[2].teeTimeStart).minute(0).second(0)).format('ddd, MMM Do, YYYY'),
//    	        		utc: (moment(new Date()).hour(courses[2].teeTimeStart).minute(0).second(0)).toDate()
//    	        	},
//    	        	course: courses[2],
//    	        	availableTeeTimes: available,
//    	        	teeTimes: scheduled

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