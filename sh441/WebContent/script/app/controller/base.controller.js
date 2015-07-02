angular.module('controller.module').controller("BaseController",['$scope', function($scope){
	
	this.PATRONAGE_TYPE = [
		  {name: 'Private', value : "PRIVATE", order : 2},                  
		  {name: 'Public', value : "Public", order : 0},
		  {name: 'Semi-Private', value : "SEMI-PRIVATE", order : 1}
	];
	
	$scope.formatNameLF = function(user) {
		return user.lastName + ", " + user.firstName;
	};
	
	$scope.formatNameFL = function(user) {
		return user.firstName + " " + user.lastName;
	};

	$scope.formatDate = function(date) {
		return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss A") + " (UTC " + moment(date).utcOffset() + ")";
	};
	
	this.formatNameLF = function(user) {
		return user.lastName + ", " + user.firstName;
	};
	
	this.formatNameFL = function(user) {
		return user.firstName + " " + user.lastName;
	};

	this.formatDate = function(date) {
		return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss A") + " (UTC " + moment(date).utcOffset() + ")";
	};
	
}]);