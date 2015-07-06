angular.module('controller.module').controller("FacilityController",['$scope', '$state', '$controller', '$log', function($scope, $state, $controller, $log) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	$scope.patronageTypes = this.PATRONAGE_TYPE;
}]);