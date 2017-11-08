angular.module('beatsApp').service('TestsuitesService', function($http, $log) {
	var service = {
		getAllTestsuites: getAllTestsuites,
		getTestsuiteDetail: getTestsuiteDetail,
		createTestsuite: createTestsuite,
	}

	return service;

	function getAllTestsuites() {
		return $http.get('api/testsuite/read.php').then(function(resp) {
			$log.debug("TestsuitesService getAllTestsuites", resp.data);
			return resp.data;
		});
	}

	function getTestsuiteDetail(ts_id) {
		return $http.post('api/testsuite/read.php', { id: ts_id }).then(function(resp) {
			$log.debug("TestsuitesService getTestsuiteDetail", resp.data);
			return resp.data;
		});
	}

	function createTestsuite(params) {
		return $http.post('api/testsuite/create.php', { name: params.ts_name, desc: params.ts_desc }).then(function(resp) {
			$log.debug("TestsuitesService createTestsuite", resp.data);
			return resp.data;
		});
	}
});