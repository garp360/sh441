(function() {
    'use strict';
    
    angular.module('hb.sh441')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/');
	 
	    $stateProvider
	        .state('home', {   
	        	url:'/',
	        	resolve : {
	        		user : function(AuthFactory) {
	    				return AuthFactory.getUser();
	    			}
	        	},
	        	views: {
	        		'' : {	
	        			templateUrl: 'view/home.html',
	        			controller: function($scope, $controller, $log) {
	        				angular.extend(this, $controller('AuthController', {$scope: $scope}));
			    		}
	        		},
	        		'profile@home' : {
			    		templateUrl: 'view/partial/member-profile.html',
			    		controller: 'AuthController'
	        		},
	        		'facility@home' : {
			    		templateUrl: 'view/partial/member-facility.html',
			    		controller: function($scope, $controller, $log) {
			    			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			    			$scope.membershipInfo = {};
			    		}
	        		},
	        		'events@home' : {
			    		templateUrl: 'view/partial/member-events.html',
			    		controller: 'SignUpController',
			    		resolve : {
			    			events : function(EventFactory) {
			    				return EventFactory.findAllFutureEvents();
			    			}
			    		}
	        		}
	        	}
	        })
	        .state('registration', {
	        	url:'/user/register/:email',
	    		templateUrl: 'view/registration-form.html',
	    		controller: function($scope, $controller, $log, $state, AuthFactory, registrationForm) {
	    			angular.extend(this, $controller('AuthController', {$scope: $scope}));
	    			$scope.registrationForm = registrationForm;
	    			$scope.registrationError = {};
	    			
	    			$scope.register = function() {
	    				AuthFactory.register(registrationForm).then(function(user) {
	    					$state.go("home");
	    				}, function(error) {
	    					$log.debug(error);
	    				});
	    			};
	    		},
	        	resolve : {
	        		registrationForm : function($stateParams){
	        	          return {username: $stateParams.email};
	        	    }
	        	}
	        })
	        .state('events', {
	        	url:'/event',
	    		templateUrl: 'view/event/event-form.html',
	    		controller: 'EventController',
	        	resolve : {
	        		courses : function() {
	        			return [ {id: 'crs1', name: 'Cimarrone', patronage : 'SEMI-PRIVATE', order : 2, teeTimeInterval: 8, teeTimeStart: 7, availableTeeTimes: []},                  
	        			 		 {id: 'crs2', name: 'St Johns', patronage : "SEMI-PRIVATE", order : 1, teeTimeInterval: 10, teeTimeStart: 7, availableTeeTimes: []},
	        			 		 {id: 'crs3', name: 'South Hampton', patronage : "SEMI-PRIVATE", order : 0, teeTimeInterval: 9, teeTimeStart: 7, availableTeeTimes: []}
	        			];
	        		},
	        		teeTimes : function (courses) {
	        			
	        	    	angular.forEach(courses, function(course){
	        	    		var firstTime =  moment().hour(course.teeTimeStart).minute(0).second(0);
	        	    		var firstTeeTime = {
	        	    			order: 0,
	        	    			formatted : firstTime.format('hh:mm A'),
	        	    			utc : firstTime.toISOString()
	        	    		};
	        	    		
	        	    		course.availableTeeTimes.push(firstTeeTime);
	        	    		for(var i=0; i<70; i++) {
	        	    			var priorTeeTime = moment(course.availableTeeTimes[i].utc);
	        	    			var nextTime = priorTeeTime.add(course.teeTimeInterval, 'm');
	        	    			var nextTeeTime = {
	        	    				order: i+1,
    	        	    			formatted : nextTime.format('hh:mm A'),
    	        	    			utc : nextTime.toISOString()
	    	        	    	};
	        	    			course.availableTeeTimes.push(nextTeeTime);	        	    			
	        	    		}
	        	    	});
	        	    	
	        	    	return courses;
	        	    },
	        		event : function(courses){
	        			var today = moment(new Date()).hour(courses[2].teeTimeStart).minute(0).second(0);
	        			
	        			return {
	        	        	name: 'Pidcock Group',
	        	        	date: today.toISOString(),
	        	        	course: courses[2],
	        	        	teeTimes: courses[2].availableTeeTimes.slice(4,8)
        				};
        			},
	        	}
	    	});
	       
	}]); 
})();

