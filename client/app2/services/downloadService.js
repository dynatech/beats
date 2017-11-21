(function() {
	'use strict';

	angular
		.module('beatsApp')
		.service('downloadService', downloadService);

	downloadService.$inject = ['$log', 'genTestActionService'];

	function downloadService($log, genTestActionService) {
		var service = {
			downloadTestcase: downloadTestcase,
			downloadTestsuite: downloadTestsuite,
			getJSONScript: getJSONScript,
			getSeleniumTestScript: getSeleniumTestScript,
		}

		return service;

		function getJSONScript(params) {
			$log.debug('downloadService getJSONScript', params);
		}

		function getSeleniumTestScript(params) {
			$log.debug('downloadService getSeleniumTestScript', params);
		}

		// TODO: Generic downloader function used by other download script functions
		function downloadGeneric(data_download, filename) {
			$log.debug('downloadService downloadGeneric', data_download, filename);
		}

		function downloadTestcase(tc_id, test_type) {
			$log.debug('downloadService downloadTestcase', tc_id, test_type);

			// TODO: get test case data from tc_id

			// TODO: compose script based on test_type

			// TODO: pass composed script to download generic for download
			downloadGeneric();
		}

		function downloadTestsuite(ts_id, test_type) {
			$log.debug('downloadService downloadTestsuite', ts_id, test_type);
		}
	}

})();