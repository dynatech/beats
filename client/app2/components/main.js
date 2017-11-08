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
		vm.crud_status = null;

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
			vm.crud_status = null;
		}

		// Create Test Suite
		function createTestsuite() {
			TestsuitesService.createTestsuite(vm.params).then(function(response) {
				$log.debug("createTestsuite", response);
				vm.crud_status = response.message;
				vm.params.ts_id = response.ts_id;
				vm.params.numTestCases = 0;

				//Hide the create testsuite modal
				jQuery(".modal.in").modal("hide");
				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");

				//Add the newly created data to the testsuites list
				vm.maindata.testsuites.push(vm.params);
				$log.debug("All Test Suites", vm.maindata);
			}, function(response) {
				$log.debug("createTestsuite", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
		}

	}

})();