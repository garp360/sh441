angular.module('hb.sh441')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {   
        	url:'/',
        	resolve : {
    			user : function(AuthFactory) {
    				return AuthFactory.login({
    					username : "garth.pidcock@gmail.com",
    					password: "tnplh"
    				});
    			},
    			isAuth : function(user) {
    				return user != null && user.$id != null;
    			},
    			memberInfo : function(user, MemberFactory) {
    				var memberIdArray = [];
    				if(user.membership) {
    					memberIdArray.push(user.membership);
    				}
    				return MemberFactory.getMembershipData(memberIdArray);
    			},
    			facilityInfo : function(memberInfo, FacilityFactory) {
    				return FacilityFactory.getMembershipFacilityData(memberInfo);
    			},
    			memberships : function(memberInfo, facilityInfo) {
    				var memberships = [];
    				angular.forEach(memberInfo, function(member){
    					angular.forEach(facilityInfo, function(facility){
    						if(facility.$id === member.facility) {
    							memberships.push({
    								member: member,
    								facility: facility
    							});
    						}
    					});
    				});
    				return memberships;
    			}
    		},
        	views: {
        		'' : {	
        			templateUrl: 'view/home.html'
        		},
        		'profile@home' : {
		    		templateUrl: 'view/partial/member-profile.html',
		    		controller: function($scope, $controller, $log, isAuth, user, memberships) {
		    			angular.extend(this, $controller('BaseController', {$scope: $scope}));
		    			$log.debug("isAuth = [" + isAuth + "]");
		    			$scope.isAuth = isAuth;
		    			$scope.user = user;
		    			$scope.memberships = memberships;
		    		}
        		},
        		'facility@home' : {
		    		templateUrl: 'view/partial/member-facility.html',
		    		controller: function($scope, $controller, facility, isAuth, memberships) {
		    			angular.extend(this, $controller('FacilityController', {$scope: $scope}));
		    			$scope.facility = facility;
		    			$scope.isAuth = isAuth;
		    			$scope.membershipInfo = memberships;
		    		},
		    		resolve : {
		    			facility : function(FacilityFactory) {
		    				return FacilityFactory.findAll();
		    			}
		    		}
        		},
        		'events@home' : {
		    		templateUrl: 'view/partial/member-events.html',
		    		controller: function($scope, $controller, events, isAuth) {
		    			angular.extend(this, $controller('BaseController', {$scope: $scope}));
		    			$scope.events = events;
		    			$scope.isAuth = isAuth;
		    		},
		    		resolve : {
		    			events : function() {
		    				return [{name: "Event1", date: "1", participants:["1", "1", "1", "1", "1"]}, {name: "Event2", date: "2", participants:["1", "1", "1", "1", "1"]}, {name: "Event3", date: "3", participants:["1", "1", "1", "1", "1"]}, {name: "Event4", date: "4", participants:["1", "1", "1", "1", "1"]}];
		    			}
		    		}
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