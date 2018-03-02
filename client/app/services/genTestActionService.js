(function() {
  'use strict';

  angular
    .module('beatsApp')
    .service('genTestActionService', genTestActionService);

  genTestActionService.$inject = ['$log'];

  function genTestActionService($log) {
    var service = {
      genAction: genAction,
    }

    return service;

    //Generate Selenium Action Test line
    function genAction(param) {
      var actionSe = null;
      var stepName = param.name;

      switch(param.action) {
        case "Add Assertion":
          actionSe = actionAssert(param);
          break;
        case "Clear Text":
          actionSe = actionClearText(param);
          break;
        case "Click":
          actionSe = actionClick(param);
          break;
        case "Go to URL":
          actionSe = actionGoToURL(param);
          break;
        case "Hover":
          actionSe = actionHover(param);
          break;
        case "Maximize Window":
          actionSe = actionMaximizeWindow(param);
          break;
        case "Modify Window Size":
          actionSe = actionModifyWindow(param);
          break;
        case "Press Key":
          actionSe = actionPressKey(param);
          break;
        case "Scroll":
          actionSe = actionScroll(param);
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
        case "Write Text":
          actionSe = actionWriteText(param);
          break;
        default:
          $log.debug("To do test script for ", param.action);
          break;
      }
      var loggerInfo = " logger.info('" + stepName + "') \n";
      actionSe = loggerInfo + actionSe;

      return actionSe;
    }

    // TODO: Remove once getTargetElement() is stable
    function getElementLocator(param) {
      var locateElementBy;

      switch(param.locateElement.by) {
        case "Id":
          locateElementBy = 'id';
          break;
        case "Text Inside":
          // locateElementBy = 'xpath';
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

    function getTargetElement(param) {
      var elementValue = param.element_id.value;
      var targetElement;

      switch(param.locateElement.by) {
        case "Id":
          targetElement = "By.id('" + elementValue + "')";
          break;
        case "Name":
          targetElement = "By.name('" + elementValue + "')";
          break;
        case "Class Name":
          targetElement = "By.className('" + elementValue + "')";
          break;
        case "XPath":
          targetElement = "By.xpath('" + elementValue + "')";
          break;
        case "CSS Selector":
          targetElement = "By.css('" + elementValue + "')";
          break;
        case "Link Text":
          targetElement = "By.linkText('" + elementValue + "')";
          break;
        case "Partial Link Text":
          targetElement = "By.partialLinkText('" + elementValue + "')";
          break;
        case "Text Inside":
          // Finds text inside the html tag
          targetElement = "By.xpath('//*[text()[contains(.,\"" + elementValue + "\")]]')";
          break;
        default:
          break;
      }

      return targetElement;
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
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").sendKeys('", param.op_special_1.value, "'); \n",
        " }) \n"
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionClearText(param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").clear(); \n",
        " }) \n"
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionClick(param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").click();  \n",
        " }) \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionHover(param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.actions() \n",
        "     .mouseMove(driver.findElement(", targetElement, ")) \n",
        "     .perform();  \n",
        " }) \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionPressKey(param) {
      var targetElement = getTargetElement(param);
      var keyEnum;

      switch(param.op_special_1.value) {
        case "Alt":
          keyEnum = 'ALT';
          break;
        case "Arrow down":
          keyEnum = 'ARROW_DOWN';
          break;
        case "Arrow left":
          keyEnum = 'ARROW_LEFT';
          break;
        case "Arrow right":
          keyEnum = 'ARROW_RIGHT';
          break;
        case "Arrow up":
          keyEnum = 'ARROW_UP';
          break;
        case "Backspace":
          keyEnum = 'BACK_SPACE';
          break;
        case "Ctrl":
          keyEnum = 'CONTROL';
          break;
        case "Enter":
          keyEnum = 'ENTER';
          break; 
        case "Escape":
          keyEnum = 'ESCAPE';
          break; 
        case "Space":
          keyEnum = 'SPACE';
          break;
        case "Tab":
          keyEnum = 'TAB';
          break;
        default:
          break;
      }

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").sendKeys(webdriver.Key.", keyEnum, "); \n",
        " }) \n"
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionScroll(param) {
      var scrollType = param.scroll_options.type;
      var actionSe;

      switch(scrollType) {
        case "Scroll vertical":
            actionSe = actionScrollVertical(param);
            break;
        case "Scroll horizontal":
            actionSe = actionScrollHorizontal(param);
            break;
        case "Scroll to bottom":
            actionSe = actionScrollToBottom(param);
            break;
        case "Scroll to top":
            actionSe = actionScrollToTop(param);
            break;
        case "Scroll to element":
            actionSe = actionScrollToElement(param);
            break;
        default:
            break;
      }

      $log.log(actionSe);
      return actionSe;
    }

    function actionScrollVertical(param) {
      var distance = param.op_special_1.value;

      var actionSe = [
        " driver.executeScript('window.scroll(0,", distance ,")') \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionScrollHorizontal(param) {
      var distance = param.op_special_1.value;

      var actionSe = [
        " driver.executeScript('window.scroll(", distance ,", 0)') \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionScrollToBottom(param) {
      var actionSe = [
        " driver.executeScript('window.scroll(0, window.outerHeight)') \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionScrollToTop(param) {
      var actionSe = [
        " driver.executeScript('window.scroll(0, 0)') \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionScrollToElement(param) {
      var elem = getElementFromJS(param);
      var actionSe = null;

      if (elem) {
        var actionSe = [
          " driver.executeScript( 'var elem = ", elem, ";' ) \n",
          " driver.executeScript( 'elem.scrollIntoView();' ) \n",
        ].join("");
      }

      $log.log(actionSe);
      return actionSe;
    }

    function getElementFromJS(param) {
      var elem;
      var elemValue = param.element_id.value;

      switch(param.locateElement.by) {
        case "Id":
          elem = 'document.getElementById(\"' + elemValue + '\")';
          break;
        case "Class Name":
          elem = 'document.getElementsByClassName(\"' + elemValue + '\")';
          break;
        case "CSS Selector":
          elem = 'document.querySelectorAll(\"' + elemValue + '\")';
          break;
        default:
          elem = null;
          break;
      }

      return elem;
    }

    function actionSelect(param) {
      var targetElement = getTargetElement(param);
      var elemValue = param.element_id.value;
      var selectedOption = param.op_special_1.value;

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.selectOption(", targetElement, ", '", selectedOption, "') \n",
        " }) \n",
      ].join("");

      $log.log(actionSe);
      return actionSe;
    }

    function actionSelectRandom(param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, ", globalDelay) \n",
        " .then(function() { \n",
        "   driver.selectOptionRandom(", targetElement, ") \n",
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
        case "Element Exists":
          actionSe = actionAssertElementExists(param);
          break;
        case "Element Does Not Exist":
          actionSe = actionAssertElementDoesNotExist(param);
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

    function actionAssertElementExists (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " var bool = -999; \n",
        " driver.findElement(", targetElement, ") \n",
        " .then(function() { bool = true; }) \n",
        " .catch(function() { bool = false; }) \n",
        " .finally(function() {\n",
        "    assert(bool).isTrue('Assert Failed');\n",
        " })\n",
      ].join("");

      return actionSe;
    }

    function actionAssertElementDoesNotExist (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " var bool = -999; \n",
        " driver.findElement(", targetElement, ") \n",
        " .then(function() { bool = true; }) \n",
        " .catch(function() { bool = false; }) \n",
        " .finally(function() {\n",
        "    assert(bool).isFalse('Assert Failed');\n",
        " })\n",
      ].join("");

      return actionSe;
    }

    function actionAssertElementNotVisible (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").isDisplayed() \n",
        "   .then(function(bool) { \n",
        "     assert(bool).isFalse('Assert Failed'); \n",
        "   }) \n",
        " }) \n"
      ].join("");

      return actionSe;
    }

    function actionAssertElementIsVisible (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ").isDisplayed() \n",
        "   .then(function(bool) { \n",
        "     assert(bool).isTrue('Assert Failed'); \n",
        "   }) \n",
        " }) \n"
      ].join("");

      return actionSe;
    }

    function actionAssertContainsValue (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ") \n",
        "   .getText().then(function(text) { \n",
        "     assert(text).contains('", param.op_special_2.value, "'); \n",
        "   }) \n",
        " }) \n"
      ].join("");

      return actionSe;
    }

    function actionAssertDoesNotContainValue (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ")) \n",
        "   .getText().then(function(text) { \n",
        "     var bool = text.includes('", param.op_special_2.value, "') \n",
        "     assert(bool).isFalse('Assert Failed'); \n",
        "   }) \n",
        " }) \n"
      ].join("");

      return actionSe;
    }

    function actionAssertMatchValue (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ") \n",
        "   .getText().then(function(text) { \n",
        "     var bool = new RegExp('", param.op_special_2.value, "').test(text) \n",
        "     assert(bool).isTrue('Assert Failed'); \n",
        "   }) \n",
        " }) \n"
      ].join("");

      return actionSe;
    }

    function actionAssertDoesNotMatchValue (param) {
      var targetElement = getTargetElement(param);

      var actionSe = [
        " driver.wait(until.elementLocated(", targetElement, "), globalDelay) \n",
        " .then(function() { \n",
        "   driver.findElement(", targetElement, ") \n",
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
