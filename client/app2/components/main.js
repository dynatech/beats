(function() {
  'use strict';		

	angular
		.module('beatsApp')
		.component('main', mainComponent());

	function mainComponent() {
		var component = {
			bindings: { maindata: '<' },
			templateUrl: 'client/app2/components/main.htm',
			controller: mainController,
			controllerAs: 'vm'
		}
		return component;
	}

	mainController.$inject = ['$log', '$scope', '$http', '$window', 'TestsuitesService'];

	function mainController($log, $scope, $http, $window, TestsuitesService) {
		$log.debug("mainController start");
		var vm = this;
		vm.params = null;

		// Functions for Main Page
		vm.testCall = testCall;
		vm.clearParams = clearParams;
		vm.createTestsuite = createTestsuite;

		// Test Call
		function testCall() {
			$log.debug("testCall");
		}

		// Clear Parameters
		function clearParams() {
			$log.debug("clearParams");
			vm.params = null;
		}

		// Create Test Suite
		function createTestsuite() {
			$log.debug("createTestsuite");
			$log.debug("New Test Suite", vm.params);
			TestsuitesService.createTestsuite(vm.params);
		}


	}

})();