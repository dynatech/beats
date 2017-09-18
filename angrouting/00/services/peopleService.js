angular.module('hellosolarsystem').service('PeopleService', function($http) {
  var service = {
    getAllPeople: getAllPeople,
    getPerson: getPerson
  }

  return service;

  function getAllPeople() {
    return $http.get('data/people.json', { cache: true }).then(function(resp) {
      return resp.data;
    });
  }

  function getPerson(id) {
    function personMatchesParam(person) {
      return person.id === id;
    }

    return service.getAllPeople().then(function (people) {
      return people.find(personMatchesParam)
    });
  }
});