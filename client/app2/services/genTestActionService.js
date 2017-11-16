(function() {
    'use strict';

    angular
        .module('beatsApp')
        .service('generateTestActions', generateTestActions);

    generateTestActions.$inject = ['$log'];

    function generateTestActions($log) {
        var vm = this;

        //Generate Selenium Action Test line
        vm.genAction = function(param) {
            var actionSe = null;
            var stepName = param.name;

            switch(param.action) {
                case "Go to URL":
                    actionSe = actionGoToURL(param);
                    break;
                case "Write Text":
                    actionSe = actionWriteText(param);
                    break;
                case "Click":
                    actionSe = actionClick(param);
                    break;
                case "Hover":
                    actionSe = actionHover(param);
                    break;
                case "Select Option":
                    actionSe = actionSelect(param);
                    break;
                case "Select Random Option":
                    actionSe = actionSelectRandom(param);
                    break;
                case "Wait":
                    actionSe = actionWait(param);
                    break;
                case "Add Assertion":
                    actionSe = actionAssert(param);
                    break;
                case "Maximize Window":
                    actionSe = actionMaximizeWindow(param);
                    break;
                case "Modify Window Size":
                    actionSe = actionModifyWindow(param);
                    break;
                default:
                    $log.log("To do test script for ", param.action);
                    break;
            }
            var loggerInfo = " logger.info('" + stepName + "') \n";
            actionSe = loggerInfo + actionSe;

            return actionSe;
        }

        function getElementLocator(param) {
            var locateElementBy;

            switch(param.locateElement.by) {
                case "Id":
                    locateElementBy = 'id';
                    break;
                case "Name":
                    locateElementBy = 'name';
                    break;
                case "Class Name":
                    locateElementBy = 'className';
                    break;
                case "XPath":
                    locateElementBy = 'xpath';
                    break;
                case "CSS Selector":
                    locateElementBy = 'css';
                    break;
                case "Link Text":
                    locateElementBy = 'linkText';
                    break;
                case "Partial Link Text":
                    locateElementBy = 'partialLinkText';
                    break;
                case "Text Inside":
                default:
                    break;
            }

            return locateElementBy;
        }

        function actionGoToURL(param) {
            var targetURL = param.op_special_1.value;
            var actionSe = [
                " driver.get('", targetURL,"') \n"
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionModifyWindow(param) {
            var width = param.op_special_1.value;
            var height = param.op_special_2.value;
            var actionSe = [
                " windowManager.setSize(", width, ", ", height, ") \n"
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionMaximizeWindow(param) {
            var actionSe = " windowManager.maximize() \n";

            $log.log(actionSe);
            return actionSe;
        }

        function actionWriteText(param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')).sendKeys('", param.op_special_1.value, "'); \n",
                " }) \n"
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionClick(param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')).click();  \n",
                " }) \n",
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionHover(param) {
            var locateElementBy = getElementLocator(param);
            var elemValue = param.element_id.value;

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", elemValue, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.actions() \n",
                "     .mouseMove(driver.findElement(By.", locateElementBy, "('", elemValue, "'))) \n",
                "     .perform();  \n",
                " }) \n",
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionSelect(param) {
            var locateElementBy = getElementLocator(param);
            var elemValue = param.element_id.value;
            var selectedOption = param.op_special_1.value;

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", elemValue, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.selectOption(By.", locateElementBy, "('", elemValue, "'), '", selectedOption, "') \n",
                " }) \n",
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionSelectRandom(param) {
            var locateElementBy = getElementLocator(param);
            var elemValue = param.element_id.value;

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", elemValue, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.selectOptionRandom(By.", locateElementBy, "('", elemValue, "')) \n",
                " }) \n",
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionWait(param) {
            var delay = param.op_special_1.value;

            var actionSe = [
                " var waitTill = new Date(new Date().getTime() + ", delay, "); \n",
                " while(waitTill > new Date()) {} \n"
            ].join("");

            $log.log(actionSe);
            return actionSe;
        }

        function actionAssert(param) {
            var assertType = param.assert_options.type;
            var actionSe;

            switch(assertType) {
                case "Title Contains Value":
                    actionSe = actionAssertTitleContainsValue(param);
                    break;
                case "URL Contains Value":
                    actionSe = actionAssertURLContainsValue(param);
                    break;
                case "Element is Not Visible":
                    actionSe = actionAssertElementNotVisible(param);
                    break;
                case "Element is Visible":
                    actionSe = actionAssertElementIsVisible(param);
                    break;
                case "Contains Value":
                    actionSe = actionAssertContainsValue(param);
                    break;
                case "Does Not Contain Value":
                    actionSe = actionAssertDoesNotContainValue(param);
                    break;
                case "Matches Value / RegEx":
                    actionSe = actionAssertMatchValue(param);
                    break;
                case "Does Not Match Value / RegEx":
                    actionSe = actionAssertDoesNotMatchValue(param);
                    break;
                default:
                    break;
            }

            $log.log(actionSe);
            return actionSe;
        }

        function actionAssertTitleContainsValue (param) {
            var targetTitle = param.op_special_1.value;

            var actionSe = [
                " var targetTitle = '", targetTitle, "'; \n",
                " driver.getTitle() \n",
                " .then(function(title) { \n",
                "   assert(title).contains(targetTitle, 'Assert Failed'); \n",
                " }); \n",
            ].join("");

            return actionSe;
        }

        function actionAssertURLContainsValue (param) {
            var targetURL = param.op_special_2.value;

            var actionSe = [
                " var targetURL = '", targetURL, "'; \n",
                " driver.getCurrentUrl() \n",
                " .then(function(url) { \n",
                "   assert(url).contains(targetURL, 'Assert Failed'); \n",
                " }); \n",
            ].join("");

            return actionSe;
        }

        function actionAssertElementNotVisible (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')).isDisplayed() \n",
                "   .then(function(bool) { \n",
                "     assert(bool).isFalse('Assert Failed'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }

        function actionAssertElementIsVisible (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')).isDisplayed() \n",
                "   .then(function(bool) { \n",
                "     assert(bool).isTrue('Assert Failed'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }

        function actionAssertContainsValue (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')) \n",
                "   .getText().then(function(text) { \n",
                "     assert(text).contains('", param.op_special_2.value, "'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }

        function actionAssertDoesNotContainValue (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')) \n",
                "   .getText().then(function(text) { \n",
                "     var bool = text.includes('", param.op_special_2.value, "') \n",
                "     assert(bool).isFalse('Assert Failed'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }

        function actionAssertMatchValue (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')) \n",
                "   .getText().then(function(text) { \n",
                "     var bool = new RegExp('", param.op_special_2.value, "').test(text) \n",
                "     assert(bool).isTrue('Assert Failed'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }

        function actionAssertDoesNotMatchValue (param) {
            var locateElementBy = getElementLocator(param);

            var actionSe = [
                " driver.wait(until.elementLocated(By.", locateElementBy, "('", param.element_id.value, "')), globalDelay) \n",
                " .then(function() { \n",
                "   driver.findElement(By.", locateElementBy, "('", param.element_id.value, "')) \n",
                "   .getText().then(function(text) { \n",
                "     var bool = new RegExp('", param.op_special_2.value, "').test(text) \n",
                "     assert(bool).isFalse('Assert Failed'); \n",
                "   }) \n",
                " }) \n"
            ].join("");

            return actionSe;
        }
    }

})();
