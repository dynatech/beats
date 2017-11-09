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
		vm.clearParams = clearParams;
		vm.clickBeatsAction = clickBeatsAction;
		vm.createTestsuite = createTestsuite;
		vm.cloneTestsuite = cloneTestsuite;
		vm.updateTestsuite = updateTestsuite;
		vm.deleteTestsuite = deleteTestsuite;

		// Clear Parameters
		function clearParams() {
			$log.debug("clearParams");
			vm.params = null;
			// vm.params.ts_name = null;
			// vm.params.ts_desc = null;
			vm.crud_status = null;
		}

		// Click Delete Test Suite
		function clickBeatsAction(params) {
			$log.debug("clickBeatsAction", params);
			vm.params = params;
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

		// Clone Test Suite
		function cloneTestsuite() {
			$log.debug("cloneTestsuite");
		}

		// Update Test Suite
		function updateTestsuite() {
			$log.debug("updateTestsuite");
		}

		// Delete Test Suite
		function deleteTestsuite() {
			$log.debug("deleteTestsuite");
		}

	}

})();