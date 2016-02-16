/* globals chrome, document */

var console = chrome.extension.getBackgroundPage().console;

console.log("Popup activated");

// Set up display in popup
var title = chrome.runtime.getManifest().name;
var description = chrome.runtime.getManifest().description;

var $setVariants = chrome.runtime.getManifest().web_accessible_resources;

console.log("Variants are ", $setVariants);



function logArrayElements(element, index, array){
  // Remove unwanted parts of the string
  element = element.replace("html/", "");
  element = element.replace(".html", "");

  // Show the array
  console.log('a[' + index + '] = ' + element);

  // Add variants into popup
  $("form").append('<br><input type="radio" name="variant" class="variant" value="' +element +'">' +element);
}

var app = {
  init: function() {
    // cache some element references
    // var $sku = document.getElementById("sku");
    // var $skuInput = document.getElementById("useSku");

    console.log("Popup initiated");

    $("body h1").text(title);
    $("body h2").text(description);

    $setVariants.forEach(logArrayElements);

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
