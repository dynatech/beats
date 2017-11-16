(function() {
  'use strict';	

	angular
		.module('beatsApp')
		.component('testcase', testcaseComponent());

	function testcaseComponent() {
		var component = {
			bindings: { tcdata: '<' },
			templateUrl: 'client/app2/components/testcase.htm',
			controller: testcaseController,
			controllerAs: 'vm'
		}
		return component;
	}

	testcaseController.$inject = ['$log', '$scope', '$http', '$window', 'TestcasesService'];

	function testcaseController($log, $scope, $http, $window, TestcasesService) {
		$log.debug("testcaseController start");
		var vm = this;

		vm.crud_status = null;
		vm.params = null;
    vm.selected = null;

		// Function declarations
		vm.clearParams = clearParams;
		vm.clickBeatsAction = clickBeatsAction;
		vm.addStep = addStep;
		vm.removeStep = removeStep;

		// Function definitions

		function clearParams() {
			$log.debug("testcaseController | clearParams");
			vm.params = null;
			vm.crud_status = null;
		}

		function clickBeatsAction(params) {
			$log.debug("testcaseController | clickBeatsAction", params);
			vm.params = params;
		}

		function addStep() {
			$log.debug("testcaseController | addStep: start");

			var step_blank = {
				name: '',
				action: 'Choose action',
				locateElement: {},
				element_id: {},
				op_special_1: {},
				op_special_2: {},
				assert_options: {}
			};

			if (vm.tcdata.testcases[0].steps == null) {
				vm.tcdata.testcases[0].steps = [];
			}

			vm.tcdata.testcases[0].steps.push(step_blank);			
			$log.debug("testcaseController | addStep: end", vm.tcdata.testcases[0].steps);
		}

		function removeStep(index) {
			$log.debug("testcaseController | removeStep: ", index);
			vm.tcdata.testcases[0].steps.splice(index, 1);
		}

	}

})();

