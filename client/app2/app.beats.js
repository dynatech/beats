var myApp = angular.module('beatsApp', ['ui.router']);

myApp.config(function($stateProvider) {
	var helloState = {
		name: 'hello',
		url: '/hello',
		component: 'hello'
	};

	// This will display a list of test suites
	var mainState = {
		name: 'main',
		url: '/main',
		component: 'main',
		resolve: {
			main: function(TestsuitesService) {
				return TestsuitesService.getAllTestsuites();
			}
		}
	}

	$stateProvider.state(helloState);
	$stateProvider.state(mainState);
});

myApp.run(function($http) {
  $http.get('client/app2/data/people.json', { cache: true });
});