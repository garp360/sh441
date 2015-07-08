(function() {
    'use strict';

    angular
    	.module('factory.module')
    	.factory('FacilityFactory', FacilityFactory); 
    
    	function FacilityFactory ( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
    		var factory = angular.extend(BaseFactory, {});
    		
    		factory.findById = findById;
    		factory.findAll = findAll;
    		factory.getMembershipFacilityData = getMembershipFacilityData;
    		
	
			function findById (id) {
				return $firebaseObject(factory.FACILITY_REF.child(id)).$loaded();
			};
			
			function findAll () {
				var deferred = $q.defer();
		
				$firebaseArray(factory.FACILITY_REF).$loaded().then(function(facilities){
					deferred.resolve(facilities);
				}, function(err){
					deferred.reject("ERROR: Failed on FacilityFactory.findAll");
				});
		
				return deferred.promise;
			};
			
			function getMembershipFacilityData(memberArray) {
				return $q.all(memberArray.map(function(member) {
					var id = member.facility;
					$log.debug("factory.getMembershipFacilityData id=[" + id + "]");
			        return findById(id);
			    }));
			};
	
			return factory;
    	};
})();