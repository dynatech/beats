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
		vm.selectedAction = selectedAction;
		vm.selectedAssertion = selectedAssertion;
		vm.selectedLocator = selectedLocator;

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

		function selectedAction(param) {
      $log.debug("testcaseController | selectedAction: start");
      var height_dft = 600;
      var width_dft = 720;
      
      switch(param.action) {
        case "Choose action":
        case "Import Test Case":
        case "Close Alert Box":
        case "Maximize Window":
          param.locateElement = {};
          param.assert_options = {};
          param.op_special_1 = {};
          param.op_special_2 = {};
          break;
        case "Modify Window Size":
          param.locateElement = {};
          param.assert_options = {};
          param.op_special_1.label = 'Width';
          param.op_special_1.show = true;
          param.op_special_1.value = width_dft;
          param.op_special_2.label = 'Height';
          param.op_special_2.show = true;
          param.op_special_2.value = height_dft;
          break;
        case "Go to URL":
          param.locateElement = {};
          param.op_special_1.label = 'Full URL';
          param.op_special_1.show = true;
          param.op_special_2 = {};
          param.assert_options = {};
          break;
        case "Wait":
          param.locateElement = {};
          param.op_special_1.label = 'Delay (ms)';
          param.op_special_1.show = true;
          param.op_special_1.value = 1000;
          param.op_special_2 = {};
          param.assert_options = {};
          break;
        case "Add Assertion":
          param.locateElement = {};
          param.op_special_1 = {};
          param.op_special_2 = {};
          param.assert_options.show = true;
          param.assert_options.type = 'Choose Type';
          break;
        default:
          param.locateElement.show = true;
          param.locateElement.by = 'Choose locator';
          param.op_special_1 = {};
          param.op_special_2 = {};
          param.assert_options = {};
          break;
      }

      //Reset showing the element id label
      param.element_id.show = false;

      $log.debug("testcaseController | selectedAction: end", param);
		}

		function selectedAssertion(param) {
      $log.debug("testcaseController | selectedAssertion: start");
      var delay_dft = 100;

      switch(param.assert_options.type) {
        case "Choose Type":
          param.locateElement = {};
          param.assert_options.delay = null;
          break;
        case "Title Contains Value":
          param.locateElement = {};
          param.op_special_2 = {};
          param.op_special_1.label = "Expected Title";
          param.op_special_1.show = true;
          param.assert_options.delay = delay_dft;
          break;
        case "URL Contains Value":
          param.locateElement = {};
          param.op_special_1 = {};
          param.op_special_2.label = 'Value to check for';
          param.op_special_2.show = true;
          param.assert_options.delay = delay_dft;
          break;
        case "Element is Visible":
        case "Element is Not Visible":
          param.op_special_1 = {};
          param.op_special_2 = {};
          param.locateElement.show = true;
          param.locateElement.by = 'Choose locator';
          param.assert_options.delay = delay_dft;
          break;
        default:
          param.op_special_1 = {};
          param.op_special_2.show = false;
          param.op_special_2.label = 'Value to check for';
          param.locateElement.show = true;
          param.locateElement.by = 'Choose locator';
          param.assert_options.delay = delay_dft;
          break;
      }

      //Reset showing the element id label
      param.element_id.show = false;

      $log.debug("testcaseController | selectedAssertion: end", param);
		}

		function selectedLocator(param) {
      $log.debug("testcaseController | selectedLocator: start");

      switch(param.action) {
        case "Write Text":
          param.op_special_1.label = "Text to write";
          param.op_special_1.show = true;
          break;
        case "Select Option":
          param.op_special_1.label = "Option to pick";
          param.op_special_1.show = true;
          param.element_id.value = null;
        default:
          break;
      }

      switch(param.locateElement.by) {
        case "Choose locator":
          param.element_id.show = false;
          param.element_id.value = null;
          param.op_special_1 = {};
          break;
        default:
          param.element_id.show = true;
          if (param.op_special_2.label == 'Value to check for') {
            param.op_special_2.show = true;
          }
          break;
      }

      $log.debug("testcaseController | selectedLocator: end");
		}

	}

})();

