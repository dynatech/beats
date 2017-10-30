angular.module('beatsApp').service('TestsuitesService', function($http, $log) {
	var service = {
		getAllTestsuites: getAllTestsuites,
		getTestsuiteDetail: getTestsuiteDetail,
	}

	return service;

	function getAllTestsuites() {
		return $http.get('api/testsuite/read.php', { cache: true }).then(function(resp) {
			return resp.data;
		});
	}

	function getTestsuiteDetail(ts_id) {
		return $http.post('api/testsuite/read.php', { id: ts_id }).then(function(resp) {
			$log.debug("getTestsuiteDetail", resp.data);
			return resp.data;
		});
	}
});