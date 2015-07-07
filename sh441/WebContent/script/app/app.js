var app = angular.module('hb.sh441', ['ui.router', 'ngMaterial', 'ngMessages', 'firebase', 'controller.module', 'factory.module']);
app.config(function($mdThemingProvider) {
	
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