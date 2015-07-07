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
		    		controller: function($scope, $controller, $log, $state, AuthFactory, user) {
		    			angular.extend(this, $controller('AuthController', {$scope: $scope}));
		    			$scope.user = user;
		    			$scope.loginForm = {};
		    			
		    			$scope.signIn = function(loginForm) {
		    				$log.debug("email = " + loginForm.username);
		    				AuthFactory.login({username: loginForm.username, password: loginForm.password}).then(function(user){
		    					$scope.user = user;
		    				});
		    			};
		    			
		    			$scope.register = function(loginForm) {
		    				$log.debug("email = " + loginForm.username);
		    				$state.go("registration", {'email': loginForm.username});
		    			};
		    		}
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
		    				return [{name: "Event1", date: "1", participants:["1", "1", "1", "1", "1"]}, {name: "Event2", date: "2", participants:["1", "1", "1", "1", "1"]}, {name: "Event3", date: "3", participants:["1", "1", "1", "1", "1"]}, {name: "Event4", date: "4", participants:["1", "1", "1", "1", "1"]}];
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
        .state('facility-create', {
        	url:'/facility/new',
    		templateUrl: 'view/facility/create.html',
    		controller: function($scope, $controller) {
    			angular.extend(this, $controller('FacilityController', {$scope: $scope}));
    			$scope.facility = {};
    			$scope.clear = function() {
    				$scope.facility = {};
    			};
    			$scope.save = function() {
    				var facilities = [];
    				facilities.push($scope.facility);
    				this.saveOrUpdate(facilities);
    			};
    		}
        });
}]); 