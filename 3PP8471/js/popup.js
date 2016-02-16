/* globals chrome, document */

var console = chrome.extension.getBackgroundPage().console;

console.log("Popup activated");

// Set up display in popup
var title = chrome.runtime.getManifest().name;
var description = chrome.runtime.getManifest().description;
$("body h1").text(title);
$("body h2").text(description);

var $testVariants = chrome.runtime.getManifest().web_accessible_resources;

console.log("Variants are ", $testVariants);

$testVariants.forEach(logArrayElements);

function logArrayElements(element, index, array){
  console.log('a[' + index + '] = ' + element);
}

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

      if (response != 0) {
        $("input[value=" + response + "]").prop('checked', true);
      }
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
