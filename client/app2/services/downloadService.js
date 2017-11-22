(function() {
	'use strict';

	angular
		.module('beatsApp')
		.service('DownloadService', DownloadService);

	DownloadService.$inject = ['$log', '$window', 'genTestActionService', 'TestcasesService', 'TestsuitesService'];

	function DownloadService($log, $window, genTestActionService, TestcasesService, TestsuitesService) {
		var service = {
			downloadTestcase: downloadTestcase,
			downloadTestcaseById: downloadTestcaseById,
			downloadTestsuite: downloadTestsuite,
			downloadTestsuiteById: downloadTestsuiteById,
			getJSONScript: getJSONScript,
			getSeleniumTestcaseScript: getSeleniumTestcaseScript,
		}

		return service;

		function getJSONScript(params) {
			$log.debug('DownloadService getJSONScript', params);

			return "";
		}

		function getSeleniumBase(test_name, global_wait) {
      var base_script = [
        "var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until; \n",
        "var driver = new webdriver.Builder().forBrowser('chrome').build(); \n",
        "var assert = require('selenium-webdriver/testing/assert'); \n",
        "var actions = require('selenium-webdriver/lib/actions'); \n",
        "var log4js = require('log4js'); \n",
        "var windowManager = driver.manage().window(); \n\n",
        "log4js.loadAppender('file'); \n",
        "log4js.addAppender(log4js.appenders.file('logs/runlog.log'), '", test_name, "'); \n\n",
        "var logger = log4js.getLogger('", test_name, "'); \n\n",
        "function selectOption(selector, item){ \n",
        "  var selectList, desiredOption = null; \n",
        "  var trimmedItem = item.toString().trim(); \n",
        "  var temp = null; \n",
        "  selectList = this.findElement(selector); \n",
        "  selectList.click(); \n",
        "  selectList.findElements(webdriver.By.tagName('option')) \n",
        "    .then(function findMatchingOption(options){ \n",
        "      options.some(function(option){ \n",
        "        option.getText().then(function doesOptionMatch(text){ \n",
        "          if (trimmedItem === text.toString().trim()){ \n",
        "            logger.info(text.trim()); \n",
        "            logger.info('THERE IS A MATCH!!!'); \n",
        "            desiredOption = option; \n",
        "            return true; \n",
        "          } \n",
        "        }); \n",
        "      }); \n",
        "    }) \n",
        "    .then(function clickOption(){ \n",
        "      if (desiredOption){ \n",
        "        desiredOption.getText() \n",
        "          .then(function(text) { \n",
        "            logger.info(text.trim()); \n",
        "          }) \n",
        "        desiredOption.click(); \n",
        "        selectList.sendKeys(webdriver.Key.ESCAPE); \n",
        "      } \n",
        "      else { \n",
        "        logger.error('Failed... Option does NOT exist.'); \n",
        "        throw new Error(); \n",
        "      } \n",
        "    }); \n",
        "} \n",
        "driver.selectOption = selectOption.bind(driver); \n\n",
        "function selectOptionRandom(selector){\n",
        "  var selectList, desiredOption;\n",
        "  selectList = this.findElement(selector);\n",
        "  selectList.click();\n",
        "  selectList.findElements(webdriver.By.tagName('option'))\n",
        "    .then(function(options){\n",
        "      var randomPos = Math.floor(Math.random() * options.length);\n",
        "      desiredOption = options[randomPos];\n",
        "      desiredOption.getText()\n",
        "        .then(function(text) {\n",
        "          logger.info('Random Selection: ', text.trim());\n",
        "        })\n",
        "      desiredOption.click();\n",
        "      selectList.sendKeys(webdriver.Key.ESCAPE);\n",
        "    })\n",
        "}\n",
        "driver.selectOptionRandom = selectOptionRandom.bind(driver);\n\n",
        "var globalDelay = ", global_wait, "; \n\n",
      ].join("");

			return base_script;
		}

		function getSeleniumFooter(test_name) {
      var footer_script = [
        ".then( function() {logger.info('", test_name, " Passed!');}) \n",
        ".catch( function() {logger.error('", test_name, " Failed...');}) \n"
      ].join("");

      return footer_script;
		}

		function getSeleniumTestcaseScript(params) {
			$log.debug('DownloadService getSeleniumTestcaseScript', params);
      var base_script = getSeleniumBase(params.tc_name, params.global_wait);
      var footer_script = getSeleniumFooter(params.tc_name);

      var isFirst = true;
      angular.forEach(params.steps, function(data) {
        $log.debug(data.action);
        // var SeAction = generateSeAction(data);
        var SeAction = genTestActionService.genAction(data);
        if (SeAction) {
          if(isFirst) {
            base_script = base_script + SeAction;
            isFirst = !isFirst;
          }
          else {
            var wrappedAction = [
              ".then( function() { \n",
              SeAction,
              "}) \n"
            ].join("");

            base_script = base_script + wrappedAction;
          }
        }
      })

      base_script = base_script + footer_script;
      return base_script;
		}

		// TODO: Generic downloader function used by other download script functions
		function downloadGeneric(data_download, filename) {
			$log.debug('DownloadService downloadGeneric', data_download, filename);

      var blob = new Blob([data_download], { type: 'text/javascript' }),
        url = $window.URL || $window.webkitURL,
        fileUrl = url.createObjectURL(blob);

      var hiddenElement = document.createElement('a');

			// Remove white spaces of the filename and replace with underscore
			var count = (filename.match(/ /g) || []).length;
			for (var i = 0; i < count; i++) {
				filename = filename.replace(' ', '_');
			}

      hiddenElement.href = fileUrl;
      hiddenElement.target = '_blank';
      hiddenElement.download = filename + '.js';
      hiddenElement.click();
		}

		function downloadTestcase(params, test_type) {
			$log.debug('DownloadService downloadTestcase', params, test_type);
			var base_script = "";

			// TODO: compose script based on test_type
			switch(test_type) {
				// case "json":
				// 	base_script = getJSONScript();
				// 	break;
				case "selenium":
				default:
					base_script = getSeleniumTestcaseScript(params);
					break;
			}

			// TODO: pass composed script to download generic for downloading
			downloadGeneric(base_script, params.tc_name);
		}

		function downloadTestcaseById(tc_id, test_type) {
			$log.debug('DownloadService downloadTestcaseById', tc_id, test_type);
			var base_script = "";

			// TODO: get test case data from tc_id
			TestcasesService.getTestcaseDetail(tc_id).then(function(response) {
				var params = response.testcases[0];
				$log.debug('downloadTestcaseById params', params);

				// TODO: compose script based on test_type
				switch(test_type) {
					case "json":
						base_script = getJSONScript();
						break;
					case "selenium":
					default:
						base_script = getSeleniumTestScript(params);
						break;
				}

				// TODO: pass composed script to download generic for downloading
				downloadGeneric(base_script, params.tc_name);
			}, function(response) {
				$log.debug('downloadTestcaseById failed response', response);
			});
		}

		function downloadTestsuite(ts_id, test_type) {
			$log.debug('DownloadService downloadTestsuite', ts_id, test_type);
		}

		function downloadTestsuiteById(ts_id, test_type) {
			$log.debug('DownloadService downloadTestsuiteById', ts_id, test_type);
			// TODO: get test case data from ts_id
			// TODO: compose script based on test_type
			// TODO: pass composed script to download generic for downloading
		}
	}

})();