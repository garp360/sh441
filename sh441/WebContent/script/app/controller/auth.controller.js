angular.module('controller.module').controller("AuthController",['$scope', '$log', '$controller', '$firebaseAuth', 'AuthFactory', function($scope, $log, $controller, $firebaseAuth, AuthFactory){
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	$scope.authRef = $firebaseAuth(new Firebase("https://sh441.firebaseio.com"));
	$scope.isAuth = false;
	$scope.user = {};
	
	$scope.authRef.$onAuth(function(authData) {
		if (authData) {
			console.log("Logged in as:", authData.uid);
			$scope.isAuth = true;
			AuthFactory.getUser().then(function(user) {
				$scope.user = user;
			});
		} else {
			console.log("Logged out");
			$scope.isAuth = false;
		}
	});
	
	$scope.signOut = function() {
		AuthFactory.logoff();
		$scope.isAuth = false;
		$scope.user = {};
	};
	
	$scope.resetPassword = function() {
		
	};
}]);