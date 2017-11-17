(function() {
	'use strict';

	angular
		.module('beatsApp')
		.service('TestcasesService', function($http, $log) {
			var service = {
				getAllTestcases: getAllTestcases,
				getTestcaseDetail: getTestcaseDetail,
				createTestcase: createTestcase,
				updateTestcase: updateTestcase,
				deleteTestcase: deleteTestcase,
			}

			return service;

			function getAllTestcases() {
				return $http.get('api/testcase/read.php').then(function(resp) {
					$log.debug("TestcasesService getAllTestcases", resp.data);
					return resp.data;
				})
			}

			function getTestcaseDetail(tc_id) {
				return $http.post('api/testcase/read.php', { id: tc_id }).then(function(resp) {
					// Change format of "global_wait" to int for "number" display on frontend
					resp.data.testcases[0].global_wait = parseInt(resp.data.testcases[0].global_wait);
					$log.debug("TestcasesService getTestcaseDetail", resp.data);
					return resp.data;
				});
			}

			function createTestcase(params) {
				return $http.post('api/testcase/create.php', 
								{ ts_id: params.ts_id, 
									name: params.tc_name, 
									desc: params.tc_desc })
				.then(function(resp) {
					$log.debug("TestcasesService createTestcase", resp.data);
					return resp.data;
				});
			}

			function updateTestcase(params) {
				$log.debug("TestcasesService | updateTestcase");
				return $http.post('api/testcase/update.php', 
								{ id: params.tc_id, 
									name: params.tc_name, 
									desc: params.tc_desc,
									global_wait: params.global_wait,
									// steps: params.steps })
									steps: JSON.stringify(params.steps) })
				.then(function(resp) {
					$log.debug("TestcasesService updateTestcase", resp.data);
					return resp.data;
				});
			}

			function deleteTestcase(params) {
				// $log.debug("TestcasesService deleteTestcase", params);
				return $http.post('api/testcase/delete.php', { id: params.tc_id }).then(function(resp) {
					$log.debug("TestcasesService deleteTestcase", resp.data);
					return resp.data;
				});
			}
		});

})();


