(function() {
    'use strict';

    angular
        .module('app.cases')
        .component('testCase', testCase());

    function testCase() {
        var component = {
            transclude: true,
            templateUrl: "client/app/cases/testCase.html",
            controller: testCaseController,
            controllerAs: 'vm'
        }
        return component;
    }

    testCaseController.$inject = ['$log', '$scope', '$http', '$window', 'generateTestActions'];

    function testCaseController ($log, $scope, $http, $window, generateTestActions) {
        $log.log("testCaseController: start");
        var vm = this;
        vm.test_case = null;
        vm.case_steps = null;
        vm.global_wait = null;
        vm.selected = null;

        $http.get('temp/casesteps3.json')
            .then(function(response) {
                vm.test_case = response.data.test_case;
                vm.case_steps = response.data.case_steps;
                vm.global_wait = response.data.global_wait;
                $log.log('successfully loaded file');
            })
            .catch(function(response) {
                $log.error('JSON was not loaded');
            })
            .finally(function() {
                //todo
            });

        vm.showData = function() {
            $log.log("showData: ", vm.case_steps);
        }

        vm.addStep = function() {
            $log.log("addStep: start");

            var step_blank = 
                {name:'', 
                action:'Choose action', 
                locateElement:{},
                element_id:{},
                op_special_1:{},
                op_special_2:{},
                assert_options:{}};

            vm.case_steps.push(step_blank);
            $log.log(vm.case_steps);
            $log.log("addStep: end");
        }

        vm.removeStep = function(index) {
            $log.log("removeStep: start ");
            $log.log(index);

            vm.case_steps.splice(index, 1);
            $log.log("removeStep: end");
        }

        vm.selectedAction = function(param) {
            $log.log("selectedAction: start");
            var height_dft = 600;
            var width_dft = 720;
            
            switch(param.action) {
                case "Choose action":
                case "Import Test Case":
                case "Close Alert Box":
                case "Maximize Window":
                    param.locateElement = {};
                    param.assert_options = {};
                    param.op_special_1 = {};
                    param.op_special_2 = {};
                    break;
                case "Modify Window Size":
                    param.locateElement = {};
                    param.assert_options = {};
                    param.op_special_1.label = 'Width';
                    param.op_special_1.show = true;
                    param.op_special_1.value = width_dft;
                    param.op_special_2.label = 'Height';
                    param.op_special_2.show = true;
                    param.op_special_2.value = height_dft;
                    break;
                case "Go to URL":
                    param.locateElement = {};
                    param.op_special_1.label = 'Full URL';
                    param.op_special_1.show = true;
                    param.op_special_2 = {};
                    param.assert_options = {};
                    break;
                case "Wait":
                    param.locateElement = {};
                    param.op_special_1.label = 'Delay (ms)';
                    param.op_special_1.show = true;
                    param.op_special_1.value = 1000;
                    param.op_special_2 = {};
                    param.assert_options = {};
                    break;
                case "Add Assertion":
                    param.locateElement = {};
                    param.op_special_1 = {};
                    param.op_special_2 = {};
                    param.assert_options.show = true;
                    param.assert_options.type = 'Choose Type';
                    break;
                default:
                    param.locateElement.show = true;
                    param.locateElement.by = 'Choose locator';
                    param.op_special_1 = {};
                    param.op_special_2 = {};
                    param.assert_options = {};
                    break;
            }

            //Reset showing the element id label
            param.element_id.show = false;

            $log.log(param);
            $log.log("selectedAction: end");
        }

        vm.selectedAssertion = function(param) {
            $log.log("selectedAssertion: start");
            var delay_dft = 100;

            switch(param.assert_options.type) {
                case "Choose Type":
                    param.locateElement = {};
                    param.assert_options.delay = null;
                    break;
                case "Title Contains Value":
                    param.locateElement = {};
                    param.op_special_2 = {};
                    param.op_special_1.label = "Expected Title";
                    param.op_special_1.show = true;
                    param.assert_options.delay = delay_dft;
                    break;
                case "URL Contains Value":
                    param.locateElement = {};
                    param.op_special_1 = {};
                    param.op_special_2.label = 'Value to check for';
                    param.op_special_2.show = true;
                    param.assert_options.delay = delay_dft;
                    break;
                case "Element is Visible":
                case "Element is Not Visible":
                    param.op_special_1 = {};
                    param.op_special_2 = {};
                    param.locateElement.show = true;
                    param.locateElement.by = 'Choose locator';
                    param.assert_options.delay = delay_dft;
                    break;
                default:
                    param.op_special_1 = {};
                    param.op_special_2.show = false;
                    param.op_special_2.label = 'Value to check for';
                    param.locateElement.show = true;
                    param.locateElement.by = 'Choose locator';
                    param.assert_options.delay = delay_dft;
                    break;
            }

            //Reset showing the element id label
            param.element_id.show = false;

            $log.log(param);
            $log.log("selectedAssertion: end");
        }

        vm.selectedLocator = function(param) {
            $log.log("selectedLocator: start");

            switch(param.action) {
                case "Write Text":
                    param.op_special_1.label = "Text to write";
                    param.op_special_1.show = true;
                    break;
                case "Select Option":
                    param.op_special_1.label = "Option to pick";
                    param.op_special_1.show = true;
                    param.element_id.value = null;
                default:
                    break;
            }

            switch(param.locateElement.by) {
                case "Choose locator":
                    param.element_id.show = false;
                    param.element_id.value = null;
                    param.op_special_1 = {};
                    break;
                default:
                    param.element_id.show = true;
                    if (param.op_special_2.label == 'Value to check for') {
                        param.op_special_2.show = true;
                    }
                    break;
            }

            $log.log("selectedLocator: end");
        }

        vm.downloadTestCase = function() {
            $log.log("downloadTestCase: start");

            var base_script = [
                "var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until; \n",
                "var driver = new webdriver.Builder().forBrowser('chrome').build(); \n",
                "var assert = require('selenium-webdriver/testing/assert'); \n",
                "var actions = require('selenium-webdriver/lib/actions'); \n",
                "var log4js = require('log4js'); \n",
                "var windowManager = driver.manage().window(); \n\n",
                "log4js.loadAppender('file'); \n",
                "log4js.addAppender(log4js.appenders.file('logs/runlog.log'), 'sampleTestCase'); \n\n",
                "var logger = log4js.getLogger('sampleTestCase'); \n\n",
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
                "var globalDelay = ", vm.global_wait, "; \n\n",
            ].join("");
            
            var footer_script = [
                ".then( function() {logger.info('Test Case Passed!');}) \n",
                ".catch( function() {logger.error('Test Case Failed...');}) \n"
            ].join("");

            var isFirst = true;
            angular.forEach(vm.case_steps, function(data) {
                //$log.log(data.action);
                // var SeAction = generateSeAction(data);
                var SeAction = generateTestActions.genAction(data);
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

            $log.log(base_script);
            $log.log("downloadTestCase: end");

            var blob = new Blob([base_script], { type: 'text/javascript' }),
                url = $window.URL || $window.webkitURL,
                fileUrl = url.createObjectURL(blob);

            var hiddenElement = document.createElement('a');

            hiddenElement.href = fileUrl;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'seleniumScript.js';
            hiddenElement.click();
        }

    }

})();
