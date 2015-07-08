(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('BaseFactory', BaseFactory); 
    	
    	function BaseFactory ($q, $log) {
    		var factory = {};
    		
    		factory.AUTH_REF = new Firebase("https://sh441.firebaseio.com");
			factory.EVENT_REF = new Firebase("https://sh441.firebaseio.com/event");
			factory.FACILITY_REF = new Firebase("https://sh441.firebaseio.com/facility");
			factory.MEMBER_REF = new Firebase("https://sh441.firebaseio.com/member");
			factory.USER_REF = new Firebase("https://sh441.firebaseio.com/user");
			
			factory.getValue = function(value, defaultValue) {
				var result = defaultValue;
				if(value) {
					result = value; 
				} 
				return result;
			};
			
			return factory;
    	};
})();