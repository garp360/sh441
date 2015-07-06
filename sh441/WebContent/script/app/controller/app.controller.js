angular.module('controller.module').controller('AppCtrl', ['$scope', '$mdSidenav', '$controller', function($scope, $mdSidenav, $controller){
	angular.extend(this, $controller('AuthController', {$scope: $scope}));
	
	$scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
}]);