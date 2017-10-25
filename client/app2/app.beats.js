var myApp = angular.module('beatsApp', ['ui.router']);

myApp.config(function($stateProvider) {
	var helloState = {
		name: 'hello',
		url: '/hello',
		component: 'hello'
	};

	$stateProvider.state(helloState);
});

myApp.run(function($http) {
  $http.get('client/app2/data/people.json', { cache: true });
});