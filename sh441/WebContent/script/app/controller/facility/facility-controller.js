(function() {
    'use strict';

    angular
    	.module('controller.module')
    	.controller('FacilityController', FacilityController);
    
    	FacilityController.$inject = ['$scope', '$state', '$controller', '$log']; 
    	function FacilityController ($scope, $state, $controller, $log) {
    		angular.extend(this, $controller('BaseController', {$scope: $scope}));
    		$scope.patronageTypes = this.PATRONAGE_TYPE;
    	};
})();