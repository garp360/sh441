(function() {
    'use strict';
    
   angular
   .module('hb.sh441', ['ui.router', 'ui.bootstrap.datetimepicker', 'angularNumberPicker', 'ngMaterial', 'ngMessages', 'formly', 'formlyBootstrap', 'firebase', 'controller.module', 'factory.module'])
   .config(function($mdThemingProvider) {
	
		var hs441PrimaryPalette = $mdThemingProvider.extendPalette('blue', {
		    '500': '#084B8A'
		  });
		
		var hs441AccentPalette1 = $mdThemingProvider.extendPalette('green', {
		    '500': '#0B3B17'
		  });
	
		var hs441AccentPalette2 = $mdThemingProvider.extendPalette('yellow', {
			'500': '#D7DF01'
		});
	
		$mdThemingProvider.definePalette('hs441Palette', hs441PrimaryPalette);
		
		$mdThemingProvider.theme('default')
	    	.primaryPalette('hs441Palette')
	    	.dark();
	});
})();



//https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
//https://github.com/toddmotto/angularjs-styleguide