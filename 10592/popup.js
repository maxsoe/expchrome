/* globals chrome, document */

var console = chrome.extension.getBackgroundPage().console;

console.log("Popup activated");

var app = {
  init: function() {
    // cache some element references
    // var $sku = document.getElementById("sku");
    // var $skuInput = document.getElementById("useSku");

    var $variants = document.getElementsByClassName("variant");

    // go get a variant if it's in the background page
    chrome.runtime.sendMessage({
      fn: "getVariant"
    }, function(response) {
      console.log("popup got response", response);
      // TODO set value to checked for current variant
      console.log('this.response is ' + response);

      $("input[value=" + response + "]").prop('checked', true);
    });

    // loop through variants
    for (i = 0; i < $variants.length; i++) {
      // look at the current variant defined by the index
      var $currentVariant = $variants[i];
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
