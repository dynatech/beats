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

    function getSeleniumBody(steps) {
      var isFirst = true;
      var body_script;

      angular.forEach(steps, function(data) {
        $log.debug(data.action);
        var SeAction = genTestActionService.genAction(data);
        if (SeAction) {
          if(isFirst) {
            body_script = SeAction;
            isFirst = !isFirst;
          }
          else {
            var wrappedAction = [
              ".then( function() { \n",
              SeAction,
              "}) \n"
            ].join("");

            body_script = body_script + wrappedAction;
          }
        }
      })

      return body_script;
    }

		function getSeleniumFooter(test_name) {
      var footer_script = [
        ".then( function() {logger.info('", test_name, " PASSED!');}) \n",
        ".catch( function() {logger.error('", test_name, " FAILED...');}) \n"
      ].join("");

      return footer_script;
		}

		function getSeleniumTestcaseScript(params, isTConly=true) {
			$log.debug('DownloadService getSeleniumTestcaseScript', params, isTConly);
      var base_script = "";

      if (isTConly) {
        base_script = getSeleniumBase(params.tc_name, params.global_wait);
      } 

      var body_script = getSeleniumBody(params.steps);
      var footer_script = getSeleniumFooter(params.tc_name);

      var full_test_script = base_script + body_script + footer_script;
      return full_test_script;
		}

    function getSeleniumTestsuiteScript(params) {
      $log.debug('DownloadService getSeleniumTestsuiteScript', params);

      // Get Selenium base script from test suite name
      var base_script = getSeleniumBase('Test Suite: ' + params.ts_name, 5000);

      // TODO: Iterate the test cases and get their Selenium scripts
      var tc_scripts = "";
      angular.forEach(params.testcases, function(data) {
        // $log.debug(data.tc_name);
        tc_scripts = tc_scripts + getSeleniumTestcaseScript(data, false);
      })

      // Full Test Suite script
      var full_test_script = base_script + tc_scripts;

      $log.debug('test suite script sample', full_test_script);
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
			var full_test_script = "";

			// compose script based on test_type
			switch(test_type) {
				// case "json":
				// 	full_test_script = getJSONScript();
				// 	break;
				case "selenium":
				default:
					full_test_script = getSeleniumTestcaseScript(params);
					break;
			}

			// pass composed script to download generic for downloading
			downloadGeneric(full_test_script, params.tc_name);
		}

		function downloadTestcaseById(tc_id, test_type) {
			$log.debug('DownloadService downloadTestcaseById', tc_id, test_type);
			var full_test_script = "";

			// Get test case data from tc_id
			TestcasesService.getTestcaseDetail(tc_id).then(function(response) {
				var params = response.testcases[0];
				$log.debug('downloadTestcaseById params', params);

				// compose script based on test_type
				switch(test_type) {
					case "json":
            // TODO: JSON Script generator not yet working
						full_test_script = getJSONScript();
						break;
					case "selenium":
					default:
						full_test_script = getSeleniumTestcaseScript(params);
						break;
				}

				// pass composed script to download generic for downloading
				downloadGeneric(full_test_script, params.tc_name);
			}, function(response) {
				$log.debug('downloadTestcaseById failed response', response);
			});
		}

		function downloadTestsuite(params, test_type) {
			$log.debug('DownloadService downloadTestsuite', params, test_type);
      var test_suite_script;
      var temp_testcases = [];

      // Get testcase details for the TestSuite
      angular.forEach(params.testcases, function(value, idx, array) {
        var isLastElement = array.length - 1;

        TestcasesService.getTestcaseDetail(value.tc_id).then(function(data) {
          var tcdata = data.testcases[0];
          temp_testcases.push(tcdata);

          if (idx === isLastElement) {
            $log.debug('collected test cases ', temp_testcases, isLastElement);
            params.testcases = temp_testcases;
            // Wait for the data collection to finish before composing test suite
            //    Selenium script
            test_suite_script = getSeleniumTestsuiteScript(params);
          }
          
        }, function(data) {
          $log.debug('downloadTestsuite failed data', data);
        });
      })
		}

		function downloadTestsuiteById(ts_id, test_type) {
			$log.debug('DownloadService downloadTestsuiteById', ts_id, test_type);
			// TODO: get test case data from ts_id
			// TODO: compose script based on test_type
			// TODO: pass composed script to download generic for downloading
		}
	}

})();