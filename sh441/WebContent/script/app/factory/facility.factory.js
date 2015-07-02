angular.module('factory.module').factory('FacilityFactory', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	factory.findById = function (id) {
		return __findById(id);
	};
	
	factory.findAll = function() {
		var deferred = $q.defer();

		$firebaseArray(factory.FACILITY_REF).$loaded().then(function(facilities){
			deferred.resolve(facilities);
		}, function(err){
			deferred.reject("ERROR: Failed on FacilityFactory.findAll");
		});

		return deferred.promise;
	};
	
	factory.getMembershipFacilityData = function(memberArray) {
		return $q.all(memberArray.map(function(member) {
			var id = member.facility;
			$log.debug("factory.getMembershipFacilityData id=[" + id + "]");
	        return __findById(id);
	    }));
	};
	
	function __findById(id) {
		return $firebaseObject(factory.FACILITY_REF.child(id)).$loaded();
	};
	
	return factory;
});