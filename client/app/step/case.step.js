(function() {
    'use strict';

    angular
        .module('beatsApp')
        .component("caseStep", caseStep());

    function caseStep() {
        var component = {
            transclude: true,
            require: {
                parent: '^testCase'
            },
            templateUrl: "client/app/steps/caseStep.html",
            controller: caseStepController,
            controllerAs: 'vm',
        }
        return component;
    }

    caseStepController.$inject = ['$log', '$scope'];

    function caseStepController ($log, $scope) {
        var vm = this;
        vm.id = '2';
    }
})();
