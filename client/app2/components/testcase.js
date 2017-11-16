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
	}

})();

