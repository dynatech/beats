angular.module('hellosolarsystem').component('hello', {
  templateUrl: 'components/hello.htm',

  controller: function() {
    this.greeting = 'hello';

    this.toggleGreeting = function() {
      this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
  }
});