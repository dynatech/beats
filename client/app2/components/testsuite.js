(function() {
  'use strict';	

	angular
		.module('beatsApp')
		.component('testsuite', testsuiteComponent());

	function testsuiteComponent() {
		var component = {
			bindings: { tsdata: '<' },
			templateUrl: 'client/app2/components/testsuite.htm',
			controller: testsuiteController,
			controllerAs: 'vm'
		}
		return component;
	}

	testsuiteController.$inject = ['$log', '$scope', '$http', '$window', 'TestcasesService', 'TestsuitesService'];

	function testsuiteController($log, $scope, $http, $window, TestcasesService, TestsuitesService) {
		$log.debug("testsuiteController start");
		var vm = this;
		vm.params = null;
		vm.crud_status = null;

		// Functions for Test Suite Page
		vm.clearParams = clearParams;
		vm.clickBeatsAction = clickBeatsAction;
		vm.createTestcase = createTestcase;
		vm.cloneTestcase = cloneTestcase;
		vm.updateTestcase = updateTestcase;
		vm.deleteTestcase = deleteTestcase;
		vm.downloadTestcase = downloadTestcase;
		vm.downloadTestsuite = downloadTestsuite;

		// Clear Parameters
		function clearParams() {
			$log.debug("clearParams");
			vm.params = null;
			vm.crud_status = null;

			// Make forms pristine
			if ($scope.createTestcaseForm)
				$scope.createTestcaseForm.$setPristine();
		}

		// Click a beats action
		function clickBeatsAction(params) {
			$log.debug("clickBeatsAction", params);
			vm.params = params;
		}

		// Create Test Case
		function createTestcase() {
			$log.debug("createTestcase");
		}

		// Clone Test Case
		function cloneTestcase() {
			$log.debug("cloneTestcase");
		}

		// Update Test Case
		function updateTestcase() {
			$log.debug("updateTestcase");
		}

		// Delete Test Case
		function deleteTestcase() {
			$log.debug("deleteTestcase");
		}

		// Download Test Case
		function downloadTestcase() {
			$log.debug("downloadTestcase");
		}

		// Download Test Suite
		function downloadTestsuite() {
			$log.debug("downloadTestsuite");
		}

	}

})();