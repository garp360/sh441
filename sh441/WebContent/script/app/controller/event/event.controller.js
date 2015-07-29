(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('EventController', EventController);
    	EventController.$inject = ['$scope', '$log', '$controller', '$state', '$firebaseAuth', 'EventFactory', 'courses', 'event'];
    	
    	function EventController ($scope, $log, $controller, $state, $firebaseAuth, EventFactory, courses, event) {
			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			$scope.editMode = false;
			$scope.event = event;
			$scope.courses = courses;
			$scope.selectedCourse = event.course;
			$scope.selectedTeeTime = event.course.availableTeeTimes[0];
			
			$scope.onTimeSet = onTimeSet;
			$scope.displayTeeTime = displayTeeTime;
			$scope.changeCourse = changeCourse;
			$scope.toggleEditMode = toggleEditMode;
			$scope.addTeeTime = addTeeTime;
			$scope.removeTeeTime = removeTeeTime;
			$scope.removeAllTeeTimes = removeAllTeeTimes;
			$scope.teeTimeEditorEnabled = teeTimeEditorEnabled;
			$scope.create = createEvent;
			
			function onTimeSet(newDate, oldDate) {
				$scope.event.date = {
	        		formatted: (moment(newDate).hour(courses[2].teeTimeStart).minute(0).second(0)).format('ddd, MMM Do, YYYY'),
	        		utc: (moment(newDate).hour(courses[2].teeTimeStart).minute(0).second(0)).toDate()
	        	};
			};
			
			function displayTeeTime(teeTime, allTeeTimes) {
				var teeTimeToDisplay = moment(teeTime.utc).format('h:mm a');
				if(allTeeTimes[allTeeTimes.length-1].order != teeTime.order) {
					teeTimeToDisplay += ", ";
				}
				return teeTimeToDisplay;
			};
			
			function changeCourse(selectedCourse) {
				$scope.event.course = selectedCourse;
				removeAllTeeTimes($scope.event.teeTimes);
				$scope.selectedCourse = selectedCourse;
				$scope.selectedTeeTime = selectedCourse.availableTeeTimes[0];
			};
			
			function removeTeeTime(teeTime) {
				var teeTimes = [];
				teeTimes.push(teeTime);
				removeAllTeeTimes(teeTimes);
			}
			
			function createEvent() {
				EventFactory.createEvent($scope.event).then(function(event){
					$scope.event = event;
				}, function(){
					$log.debug("Create Event Failed");
				});
			}
			
			function removeAllTeeTimes(teeTimes) {
				if(teeTimes.length <= $scope.event.teeTimes.length) {
					var newTeeTimes = [];
					if(teeTimes.length < $scope.event.teeTimes.length) {
						angular.forEach($scope.event.teeTimes, function(existingTeeTime){
							var deleteTeeTime = false;
							angular.forEach(teeTimes, function(teeTimeToDelete){
								if(!deleteTeeTime && existingTeeTime.order === teeTimeToDelete.order) {
									deleteTeeTime = true;
								}
							});
							if(!deleteTeeTime) {
								newTeeTimes.push(existingTeeTime);
							}
						});						
					} 
					if(newTeeTimes.length === 0) {
						$scope.editMode = false;
					}
					$scope.event.teeTimes = newTeeTimes;
				}
			};
			
			function toggleEditMode(editModeState) {
				$scope.editMode = editModeState;
			};

			function teeTimeEditorEnabled() {
				return $scope.event.teeTimes.length > 0;
			};
			
			function addTeeTime(selectedTeeTime) {
				var teeTimes = angular.copy($scope.event.teeTimes);
				var valid = true;
				angular.forEach(teeTimes, function(teeTime) {
					if(teeTime.order === selectedTeeTime.order) {
						valid = false;
					}
				});
				
				if(valid) {
					teeTimes.push(selectedTeeTime);
					teeTimes.sort(function(a,b){
						return a.order - b.order;
					});
					$scope.event.teeTimes = teeTimes;
				}
				$scope.selectedTeeTime = event.course.availableTeeTimes[selectedTeeTime.order + 1];
			}; 
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
