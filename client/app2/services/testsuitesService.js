angular.module('beatsApp').service('TestsuitesService', function($http, $log) {
	var service = {
		getAllTestsuites: getAllTestsuites,
		getTestsuiteDetail: getTestsuiteDetail,
		createTestsuite: createTestsuite,
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

	function createTestsuite(params) {
		// $log.debug("createTestsuite params", params);
		return $http.post('api/testsuite/create.php', { name: params.name, desc: params.desc }).then(function(resp) {
			$log.debug("createTestsuite", resp.data);
			return resp.data;
		});
	}
});