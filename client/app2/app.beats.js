var myApp = angular.module('beatsApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
	var helloState = {
		name: 'hello',
		url: '/hello',
		component: 'hello'
	};

	// This will display a list of test suites
	var mainState = {
		name: 'main',
		url: '/',
		component: 'main',
		resolve: {
			main: function(TestsuitesService) {
				return TestsuitesService.getAllTestsuites();
			}
		}
	}

	// Declare states to make it available for "ui-sref" calls
	$stateProvider.state(helloState);
	$stateProvider.state(mainState);

	// Use the Main Testsuite List Page as the default page
	$urlRouterProvider.otherwise('/');
});