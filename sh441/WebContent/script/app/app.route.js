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
			    		controller: function($scope, $controller, $log, events) {
			    			angular.extend(this, $controller('AuthController', {$scope: $scope}));
			    			$scope.events = events;
			    		},
			    		resolve : {
			    			events : function() {
			    				return [{name: "Event1", date: "1", participants:["1", "1", "1", "1", "1"]}, {name: "Event2", date: "2", participants:["1", "1", "1", "1", "1"]}, {name: "Event3", date: "3", participants:["1", "1", "1", "1", "1"]}, {name: "Event4", date: "4", participants:["1", "1", "1", "1", "1"]},
			    				        {name: "Event1", date: "1", participants:["1", "1", "1", "1", "1"]}, {name: "Event2", date: "2", participants:["1", "1", "1", "1", "1"]}, {name: "Event3", date: "3", participants:["1", "1", "1", "1", "1"]}, {name: "Event4", date: "4", participants:["1", "1", "1", "1", "1"]},
			    				        {name: "Event1", date: "1", participants:["1", "1", "1", "1", "1"]}, {name: "Event2", date: "2", participants:["1", "1", "1", "1", "1"]}, {name: "Event3", date: "3", participants:["1", "1", "1", "1", "1"]}, {name: "Event4", date: "4", participants:["1", "1", "1", "1", "1"]}
			    				        ];
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
	        .state('event-create', {
	        	url:'/event/new',
	    		templateUrl: 'view/event/event-form.html',
	    		controller: 'EventController',
	        	resolve : {
	        		courses : function() {
	        			return [ {name: 'Cimarrone', patronage : 'SEMI-PRIVATE', order : 2, teeTimeInterval: 8, teeTimeStart: 7},                  
	        			 		 {name: 'St Johns', patronage : "SEMI-PRIVATE", order : 1, teeTimeInterval: 10, teeTimeStart: 7},
	        			 		 {name: 'South Hampton', patronage : "SEMI-PRIVATE", order : 0, teeTimeInterval: 9, teeTimeStart: 7}
	        			];
	        		},
	        		event : function(courses){
	        			return {
	        	        	name: 'Pidcock Group',
	        	        	date: new Date(),
	        	        	course: courses[2],
	        	        	teeTimes: []
        				};
	        	    }
	        	}
	    	});
	       
	}]); 
})();

