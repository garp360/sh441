angular.module('controller.module').controller('AppCtrl', ['$scope', '$mdSidenav', '$controller', 'AuthFactory', function($scope, $mdSidenav, $controller, AuthFactory){
	angular.extend(this, $controller('AuthController', {$scope: $scope}));
	
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
	
	$scope.signOut = function(menuId) {
    	$mdSidenav(menuId).toggle();
    	$scope.logoff();
	};
	
	
}]);