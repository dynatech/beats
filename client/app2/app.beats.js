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

	// This will display details of a test suite
	var testsuiteState = {
		name: 'testsuite',
		url: '/testsuite/{tsId}',
		component: 'testsuite',
		resolve: {
			tsdata: function(TestsuitesService, $transition$) {
				return TestsuitesService.getTestsuiteDetail($transition$.params().tsId)
			}
		}
	}

	// This will display details of a test case
	var testcaseState = {
		name: 'testcase',
		url: '/testcase/{tcId}',
		component: 'testcase',
		resolve: {
			tcasedata: function(TestcasesService, $transition$) {
				return TestcasesService.getTestcaseDetail($transition$.params().tcId)
			}
		}
	}

	// Declare states to make it available for "ui-sref" calls
	$stateProvider.state(helloState);
	$stateProvider.state(mainState);
	$stateProvider.state(testsuiteState);
	$stateProvider.state(testcaseState);

	// Use the Main Testsuite List Page as the default page
	$urlRouterProvider.otherwise('/');
});