angular.module('beatsApp').component('hello', {
	templateUrl: 'client/app/components/hello.htm',

	controller: function() {
		this.greeting = 'Hora!';

		this.toggleGreeting = function() {
			this.greeting = (this.greeting == 'Hora!') ? 'Yoh!' : 'Hora!' 
		}
	}
});