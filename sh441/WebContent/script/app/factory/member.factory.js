angular.module('factory.module').factory('MemberFactory', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});

	factory.getMembershipData = function (memberIdArray) {
		return $q.all(memberIdArray.map(function(id) {
			$log.debug("factory.getMembershipData id=[" + id + "]");
	        return __findById(id);
	    }));
	};
	
	factory.findById = function(id) {
		__findById(id);
	};
	
	function __findById(id) {
		return $firebaseObject(factory.MEMBER_REF.child(id)).$loaded();
	}
	
	return factory;
});