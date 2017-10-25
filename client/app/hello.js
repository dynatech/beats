angular.module('beatsApp').component('hello', {
  templateUrl: '/client/app/hello.htm',

  controller: function() {
    this.greeting = 'hello';

    this.toggleGreeting = function() {
      this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
  }
});