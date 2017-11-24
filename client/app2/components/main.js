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

	mainController.$inject = ['$log', '$scope', '$http', '$window', 'TestsuitesService', 'DownloadService'];

	function mainController($log, $scope, $http, $window, TestsuitesService, DownloadService) {
		$log.debug("mainController start test edit");
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
		vm.downloadTestsuite = downloadTestsuite;

		// Clear Parameters
		function clearParams() {
			$log.debug("clearParams");
			vm.params = null;
			vm.crud_status = null;

			// Make forms pristine
			if ($scope.createTestsuiteForm)
				$scope.createTestsuiteForm.$setPristine();
		}

		// Click a beats action
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
			TestsuitesService.deleteTestsuite(vm.params).then(function(response) {
				$log.debug("deleteTestsuite", response);
				vm.crud_status = response.message;

				//Hide the create testsuite modal
				jQuery(".modal.in").modal("hide");
				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");

				//Remove deleted testsuite from the list
				var index = vm.maindata.testsuites.indexOf(vm.params);
				if (index !== -1) {
					vm.maindata.testsuites.splice(index, 1);
					$log.debug("All Test Suites", vm.maindata);
				}
			}, function(response) {
				$log.debug("deleteTestsuite", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
		}

		// Download Test Suite
		function downloadTestsuite() {
			$log.debug("downloadTestsuite");
			DownloadService.downloadTestsuiteById(vm.params.ts_id, "selenium");
		}

	}

})();