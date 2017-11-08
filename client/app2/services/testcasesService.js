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
			$log.debug("getTestcaseDetail", resp.data);
			return resp.data;
		});
	}
});