angular.module('beatsApp').service('TestcasesService', function($http, $log) {
	var service = {
		getAllTestcases: getAllTestcases,
		getTestcaseDetail: getTestcaseDetail,
	}

	return service;

	function getAllTestcases() {
		return $http.get('api/testcase/read.php').then(function(resp) {
			$log.debug("getAllTestcases", resp.data);
			return resp.data;
		})
	}

	function getTestcaseDetail(tc_id) {
		return $http.post('api/testcase/read.php', { id: tc_id }).then(function(resp) {
			// Change format of "global_wait" to int for "number" display on frontend
			resp.data.testcases[0].global_wait = parseInt(resp.data.testcases[0].global_wait);
			$log.debug("getTestcaseDetail", resp.data);
			return resp.data;
		});
	}
});