(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('MemberFactory', MemberFactory); 
    
	    function MemberFactory( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
			var factory = angular.extend(BaseFactory, {});
			
			factory.findById = findById;
			factory.getMembershipData = getMembershipData;
			
			
			function findById(id) {
				return $firebaseObject(factory.MEMBER_REF.child(id)).$loaded();
			};
			
			function getMembershipData (memberIdArray) {
				return $q.all(memberIdArray.map(function(id) {
					$log.debug("factory.getMembershipData id=[" + id + "]");
			        return findById(id);
			    }));
			};

			return factory;
    	};
})();