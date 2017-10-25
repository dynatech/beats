angular.module('beatsApp').service('TestsuitesService', function($http) {
	var service = {
		getAllTestsuites: getAllTestsuites,
	}

	return service;

	function getAllTestsuites() {
		return $http.get('api/testsuite/read.php', { cache: true }).then(function(resp) {
			return resp.data;
		});
	}
});