(function() {
  'use strict';

  angular
    .module('beatsApp')
    .component('modalStatus', modalStatusComponent());

  function modalStatusComponent() {
    var component = {
      bindings: { crudstatus: '<' },
      templateUrl: 'client/app2/components/modal.status.component.htm',
      controller: modalStatusController,
      controllerAs: 'vm'
    }
    return component;
  }

  modalStatusController.$inject = ['$log'];

  function modalStatusController($log) {
    $log.debug("modalStatusController start");
  }


})();