angular.module('factory.module').factory('BaseFactory', function($q, $log) {
	var factory = {};
	factory.AUTH_REF = new Firebase("https://sh441.firebaseio.com");
	factory.EVENT_REF = new Firebase("https://sh441.firebaseio.com/event");
	factory.FACILITY_REF = new Firebase("https://sh441.firebaseio.com/facility");
	factory.MEMBER_REF = new Firebase("https://sh441.firebaseio.com/member");
	factory.USER_REF = new Firebase("https://sh441.firebaseio.com/user");
	
	return factory;
});