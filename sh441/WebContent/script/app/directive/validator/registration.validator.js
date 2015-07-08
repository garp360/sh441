angular.module('hb.sh441').directive('registration', function() {
    return {
 
      // limit usage to argument only
      restrict: 'A',
 
      // require NgModelController, i.e. require a controller of ngModel directive
      require: 'ngModel',
 
      // create linking function and pass in our NgModelController as a 4th argument
      link: function(scope, element, attr, ctrl) {
    	  
    	    // please note you can name your function & argument anything you like
    	    function customValidator(ngModelValue) {
    	        
    	        // check if contains uppercase
    	        // if it does contain uppercase, set our custom `uppercaseValidator` to valid/true
    	        // otherwise set it to non-valid/false
    	        if (/[A-Z]/.test(ngModelValue)) {
    	            ctrl.$setValidity('uppercaseValidator', true);
    	        } else {
    	            ctrl.$setValidity('uppercaseValidator', false);
    	        }
    	 
    	        // check if contains number
    	        // if it does contain number, set our custom `numberValidator`  to valid/true
    	        // otherwise set it to non-valid/false
    	        if (/[0-9]/.test(ngModelValue)) {
    	            ctrl.$setValidity('numberValidator', true);
    	        } else {
    	            ctrl.$setValidity('numberValidator', false);
    	        }
    	 
    	        // check if the length of our input is exactly 6 characters
    	        // if it is 6, set our custom `sixCharactersValidator` to valid/true
    	        // othwise set it to non-valid/false
    	        if (ngModelValue.length === 6) {
    	            ctrl.$setValidity('sixCharactersValidator', true);
    	        } else {
    	            ctrl.$setValidity('sixCharactersValidator', false);
    	        }
    	 
    	        // we need to return our ngModelValue, to be displayed to the user(value of the input)
    	        return ngModelValue;
    	    }
    	 
    	    // we need to add our customValidator function to an array of other(build-in or custom) functions
    	    // I have not notice any performance issues, but it would be worth investigating how much
    	    // effect does this have on the performance of the app
    	    ctrl.$parsers.push(customValidator);
    	    //http://odetocode.com/blogs/scott/archive/2014/10/16/working-with-validators-and-messages-in-angularjs.aspx
    	}
    };
});