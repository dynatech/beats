angular.module('beatsApp').component('hello', {
	templateUrl: 'components/hello.htm',

	controller: function() {
		this.greeting = 'Hora!';

		this.toggleGreeting = function() {
			this.greeting = (this.greeting == 'Hora!') ? 'Yoh!' : 'Hora!' 
		}
	}
});