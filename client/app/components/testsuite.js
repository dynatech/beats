(function() {
  'use strict';	

	angular
		.module('beatsApp')
		.component('testsuite', testsuiteComponent());

	function testsuiteComponent() {
		var component = {
			bindings: { tsdata: '<' },
			templateUrl: 'client/app/components/testsuite.htm',
			controller: testsuiteController,
			controllerAs: 'vm'
		}
		return component;
	}

	testsuiteController.$inject = ['$log', '$scope', '$http', '$window', 'TestsuitesService', 'TestcasesService', 'DownloadService'];

	// Instantiate an object to hold the cloned test case details
	let newParams = {};

	function testsuiteController($log, $scope, $http, $window, TestsuitesService, TestcasesService, DownloadService) {
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
		vm.deleteTestsuite = deleteTestsuite;
		vm.downloadTestcase = downloadTestcase;
		vm.downloadTestsuite = downloadTestsuite;
		vm.saveTestsuite = saveTestsuite;

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
			vm.params.ts_id = vm.tsdata.testsuites[0].ts_id;
			TestcasesService.createTestcase(vm.params).then(function(response) {
				$log.debug("createTestcase", response);
				vm.crud_status = response.message;
				vm.params.tc_id = response.tc_id;
				vm.params.numTestCases = 0;

				//Hide the create testsuite modal
				jQuery(".modal.in").modal("hide");
				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");

				//Add the newly created data to the testcases list
				vm.tsdata.testsuites[0].testcases.push(vm.params);
				$log.debug("All Test Cases", vm.tsdata.testsuites[0]);
			}, function(response) {
				$log.debug("createTestcase", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
		}

		// Clone Test Case
		function cloneTestcase() {
			vm.params.ts_id = vm.tsdata.testsuites[0].ts_id;

			// Get first the test case details of the TC to be cloned
			TestcasesService.getTestcaseDetail(vm.params.tc_id)
				.then(( response ) => {
					newParams = {
						ts_id: vm.params.ts_id,
						tc_name: response.testcases[0].tc_name,
						tc_desc: response.testcases[0].tc_desc,
						global_wait: response.testcases[0].global_wait,
						steps: response.testcases[0].steps
					};

					// Clone the details of the chosen test case
					TestcasesService.cloneTestcase(newParams)
						.then(( response ) => {
							$log.debug("cloneTestcase", response);
							vm.crud_status = response.message;
							vm.params.tc_id = response.tc_id;
							newParams.tc_id = response.tc_id;
							vm.params.numTestCases = 0;

							// Hide the createTestsuite modal
							$(".modal.in").modal("hide");
							// Call the CRUD Status Message Modal
							$("#modalStatus").modal("show");

							console.log("---------------VM PARAMS VALUE---------------");
							console.log(vm.params);
							console.log("------------------NEW PARAMS-----------------");
							console.log(newParams);
							// Add the newly created data to the testcases list
							vm.tsdata.testsuites[0].testcases.push(newParams);
							$log.debug("All Test Cases",vm.tsdata.testsuites[0]);
						}, ( response ) => {
							$log.debug("cloneTestcase", response);
							vm.crud_status = response.message;

							// Call the CRUD Status Message Modal
							$("#modalStatus").modal("show");
						});
				}, ( response ) => {
					$log.debug("cloneTestcase", response);
					vm.crud_status = response.message;

					// Call the CRUD Status Message Modal
					$("#modalStatus").modal("show");
				});
		}

		// Update Test Case
		function updateTestcase() {
			$log.debug("updateTestcase");
		}

		// Delete Test Case
		function deleteTestcase() {
			TestcasesService.deleteTestcase(vm.params).then(function(response) {
				$log.debug("deleteTestcase", response);
				vm.crud_status = response.message;

				//Hide the create testsuite modal
				jQuery(".modal.in").modal("hide");
				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");

				//Remove deleted testsuite from the list
				var index = vm.tsdata.testsuites[0].testcases.indexOf(vm.params);
				if (index !== -1) {
					vm.tsdata.testsuites[0].testcases.splice(index, 1);
				$log.debug("All Test Cases", vm.tsdata.testsuites[0]);
				}
			}, function(response) {
				$log.debug("deleteTestcase", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
		}

		// Delete Test Suite
		function deleteTestsuite() {
			TestsuitesService.deleteTestsuite(vm.tsdata.testsuites[0]).then(function(response) {
				$log.debug("deleteTestsuite", response);

				// Go to Home Link
				var testsuite_link = $("#home-link").attr('href');
				$window.location.href = testsuite_link;
			}, function(response) {
				$log.debug("deleteTestsuite", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
		}

		// Download Test Case
		function downloadTestcase(test_type) {
			$log.debug("downloadTestcase", vm.params, test_type);
			DownloadService.downloadTestcaseById(vm.params.tc_id, test_type);
		}

		// Download Test Suite
		function downloadTestsuite() {
			$log.debug("downloadTestsuite");
			DownloadService.downloadTestsuite(vm.tsdata.testsuites[0], "selenium");
		}

		// Save changes to the Test Suite
		function saveTestsuite() {
    	$log.debug("testsuiteController saveTestsuite", vm.tsdata.testsuites[0]);
    	TestsuitesService.updateTestsuite(vm.tsdata.testsuites[0]).then(function(response) {
    		vm.crud_status = response.message;
    	}, function(response) {
    		vm.crud_status = response.message;
    	});

    	$log.debug("testsuiteController saveTestsuite", vm.crud_status);
			//Call the CRUD Status Message Modal
			jQuery("#modalStatus").modal("show");
		}

	}

})();