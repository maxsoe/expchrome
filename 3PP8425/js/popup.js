/* globals chrome, document */

var console = chrome.extension.getBackgroundPage().console;

console.log("Popup activated");

var app = {
  init: function() {

    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      console.log("message received by contentscript");

      if (request.fn in app) {
        app[request.fn](request, sender, sendResponse);
      }
    });

    // Set up display in popup
    var title = chrome.runtime.getManifest().name;
    var description = chrome.runtime.getManifest().description;
    var $setVariants = chrome.runtime.getManifest().web_accessible_resources;

    console.log("Variants are ", $setVariants);

    function webAccessibleResource(element, index, array){
      // Remove unwanted parts of the string
      element = element.replace("html/", "");
      element = element.replace(".html", "");

      // Show the array
      console.log('a[' + index + '] = ' + element);

      // Add variants into popup
      $("form").append('<br><input type="radio" name="variant" class="variant" value="' +element +'">' +element);
    };

    console.log("Popup initiated");

    $("body h1").text(title);
    $("body h2").text(description);

    $setVariants.forEach(webAccessibleResource);

    var $getVariants = document.getElementsByClassName("variant");

    // go get a variant if it's in the background page
    chrome.runtime.sendMessage({
      fn: "getVariant"
    }, function(response) {
      // Get the response from any listeners and play it back
      console.log("popup got response", response);
      // Set value of checked to current variant
      console.log('this.response is ' + response);

      if (response != 0) {
        $("input[value=" + response + "]").prop('checked', true);
      }
    });

    // loop through variants
    for (i = 0; i < $getVariants.length; i++) {
      // look at the current variant defined by the index
      var $currentVariant = $getVariants[i];
      // Listen for any click events from any of the variants
      $currentVariant.addEventListener('click', (function(valueCopy) {
        return function() {
          // do something to this variant
          console.log("Popup.js: clicked on " + valueCopy);

          // Send a message to the background page as an object
          chrome.runtime.sendMessage({
            fn: "setVariant",
            value: valueCopy
          });
        };
      })($currentVariant.value));
    };

  }
};

// app start
document.addEventListener("DOMContentLoaded", function() {
  app.init();
});
