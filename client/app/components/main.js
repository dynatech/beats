(function() {
  'use strict';		

	angular
		.module('beatsApp')
		.component('main', mainComponent());

	function mainComponent() {
		var component = {
			bindings: { maindata: '<' },
			templateUrl: 'client/app/components/main.htm',
			controller: mainController,
			controllerAs: 'vm'
		}
		return component;
	}

	mainController.$inject = ['$log', '$scope', '$http', '$window', 'TestsuitesService', 'TestcasesService', 'DownloadService'];

	// Instantiate an object to hold the cloned test case details
	let ts_new_params = {};
	let tc_new_params = {};

	function mainController($log, $scope, $http, $window, TestsuitesService, TestcasesService, DownloadService) {
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

			TestsuitesService.getTestsuiteDetail(vm.params.ts_id)
			.then(( response ) => {
				$log.debug("createTestsuite", response);

				ts_new_params = {
					testcases: response.testsuites["0"].testcases,
					ts_desc: response.testsuites["0"].ts_desc,
					ts_name: response.testsuites["0"].ts_name
				};

				TestsuitesService.cloneTestsuite(ts_new_params)
				.then(( response ) => {
					$log.debug("cloneTestsuite", response);
					vm.crud_status = response.message;
					ts_new_params.ts_id = response.ts_id;
					ts_new_params.numTestCases = ts_new_params.testcases.length;

					//Hide the create testsuite modal
					jQuery(".modal.in").modal("hide");
					//Call the CRUD Status Message Modal
					jQuery("#modalStatus").modal("show");

					// Get the IDs of all testcases and clone the corresponding data one by one using the TestcasesService.cloneTestcase
					loopCloneTestcase(ts_new_params.testcases);

					//Add the newly created data to the testsuites list
					vm.maindata.testsuites.push(ts_new_params);
					$log.debug("All Test Suites", vm.maindata);

				}, ( response ) => {
					$log.debug("createTestsuite", response);
					vm.crud_status = response.message;

					//Call the CRUD Status Message Modal
					jQuery("#modalStatus").modal("show");
				});

			}, (response) => {
				$log.debug("cloneTestsuite", response);
				vm.crud_status = response.message;

				//Call the CRUD Status Message Modal
				jQuery("#modalStatus").modal("show");
			});
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


		// Clone multiple testcases
		function loopCloneTestcase(array) {
			array.forEach((currentValue) => {
				let tc_id = currentValue.tc_id;

				// Get first the test case details of the TC to be cloned
				TestcasesService.getTestcaseDetail(tc_id) // change to a variable
					.then(( response ) => {
						tc_new_params = {
							ts_id: ts_new_params.ts_id,
							tc_name: response.testcases[0].tc_name,
							tc_desc: response.testcases[0].tc_desc,
							global_wait: response.testcases[0].global_wait,
							steps: response.testcases[0].steps
						};

						// Clone the details of the chosen test case
						TestcasesService.cloneTestcase(tc_new_params)
							.then(( response ) => {
								$log.debug("cloneTestcase", response);
							}, ( response ) => {
								$log.debug("cloneTestcase", response);
							});
					}, ( response ) => {
						$log.debug("cloneTestcase", response);
					});			
			})
		}
	}

})();