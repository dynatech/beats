/*
Created by: Prado Arturo Bognot
Position: SWAT Supervising SRS
Date: Oct 6, 2017
*/

/*(function() {
    'use strict';

    angular
        .module('app.home')
        .component(homeComponent());

    function homeComponent() {
    	var component = {
	    	templateUrl: '/client/app/home.home.htm',
	    	controller: homeController,
	    	controllerAs: 'vm'
    	};

    	return component;
    }

    homeController.$inject = ['$log'];

    function homeController($log) {
    	var vm = this;
    	vm.$onInit = onInit;
    	vm.greeting = 'This is the home page';

    	function onInit() {
    		$log.debug('homeController: You have successfully called the home controller');
    	}

    	vm.toggleGreeting = function() {
    		vm.greeting = (vm.greeting == 'This is the home page') ? 'whats up' : 'This is the home page'
    	}
    }

})();*/

/*(function() {
  'use strict';

	angular.module('hellosolarsystem').component('hello', {
	  templateUrl: 'components/hello.htm',

	  controller: function() {
	    this.greeting = 'hello';

	    this.toggleGreeting = function() {
	      this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
	    }
	  }
	});

})();*/