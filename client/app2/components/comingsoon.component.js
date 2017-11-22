(function() {
	'use strict';

	angular
		.module('beatsApp')
		.component('comingsoon', comingsoonComponent());

	function comingsoonComponent() {
		var component = {
			bindings: { featuretitle: '<' },
			templateUrl: 'client/app2/components/comingsoon.component.htm',
			controllerAs: 'vm'
		}
		return component;
	}

})();