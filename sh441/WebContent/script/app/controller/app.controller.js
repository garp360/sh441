(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('AppCtrl', AppCtrl); 
    
    	AppCtrl.$inject = ['$scope', '$mdSidenav', '$controller', '$state', 'AuthFactory'];
    	
    	function AppCtrl($scope, $mdSidenav, $controller, $state, AuthFactory){
			angular.extend(this, $controller('AuthController', {$scope: $scope}));
	
			$scope.toggleSidenav = function(menuId) {
				$mdSidenav(menuId).toggle();
			};
	
			$scope.signOut = function(menuId) {
		    	$mdSidenav(menuId).toggle();
		    	$scope.logoff();
			};
			
			$scope.createEvent = function(menuId) {
		    	$mdSidenav(menuId).toggle();
		    	$state.go("event-create");
			};
    	};
})();