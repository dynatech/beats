var myApp = angular.module('hellosolarsystem', ['ui.router']);

myApp.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    component: 'hello'
  };

  var aboutState = {
    name: 'about',
    url: '/about',
    component: 'about'
  };

  var peopleState = {
    name: 'people',
    url: '/people',
    component: 'people',
    // this state defines a 'people' resolve
    // it delegates to the PeopleService to HTTP fetch (async)
    // The people component receives this via its 'bindings:'
    resolve: {
      people: function(PeopleService) {
        return PeopleService.getAllPeople();
      }
    }
  };

  var personState = {
    name: 'person',
    url: '/people/{personId}',
    component: 'person',
    // This state defines a 'person' resolve
    // ite delegates to the PeopleService, passing the personId parameter
    resolve: {
      person: function(PeopleService, $transition$) {
        return PeopleService.getPerson($transition$.params().personId);
      }
    }
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(peopleState);
  $stateProvider.state(personState);
});

// To account for plunker embeds timing out, preload the async data
myApp.run(function($http) {
  $http.get('data/people.json', { cache: true });
});

// Show state tree
myApp.run(function($uiRouter) {
  var StateTree = window['ui-router-visualizer'].StateTree;
  var el = StateTree.create($uiRouter, null, { height: 100, width: 300 });
  el.className = 'statevis';
});