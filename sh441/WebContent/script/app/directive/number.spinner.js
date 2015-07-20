(function() {
    'use strict';
    
    angular
		.module('hb.sh441')
		.directive('hbNumberSpinner',  function () {
			var _template = '	<div class="input-group spinner">'															+
   	 		'				<input type="text" class="form-control" ng-model="input.num">'									+
   	 		'				<div class="input-group-btn-vertical">'															+
   	 		'					<button class="btn btn-default" type="button" ng-click="decrement()"><i class="fa fa-caret-up"></i></button>' 		+
   	 		'					<button class="btn btn-default" type="button" ng-click="increment()"><i class="fa fa-caret-down"></i></button>' 	+
   	 		'				</div>'																							+
   	 		'			</div>';
			

			var _controller = [ '$scope', function($scope) {
				$scope.increment = function() {
					$scope.add();

					// Add new customer to directive scope
					$scope.items.push({
						name : 'New Directive Controller Item'
					});
				};
				
				$scope.decrement = function() {
					$scope.add();

					// Add new customer to directive scope
					$scope.items.push({
						name : 'New Directive Controller Item'
					});
				};
			}];
			
		    return {
		        restrict: 'E', // E = element
		        scope: {
	        		min: '@',
		            max: '@',
		            input: '=',
		            increment: '&',
		            decrement: '&'
		        },
		        template: _template,
		        require: 'ngModel',
		        replace: true,
		        controller: _controller,
		        link: function ($scope, element, attrs, ngModelCtrl) { 
		        	var min = attrs.min;
		        	var max = attrs.max;
		        	
		        } //DOM manipulation
		    };
		});
})();