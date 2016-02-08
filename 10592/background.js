/* globals chrome */

console.log("Multiple options. This is background.js");

var background = {
  // set sku to an empty string
  variant: "",

  init: function() {

    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      // console.log("message received", request);

      if (request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
    });
  },

  setVariant: function(request, sender, sendResponse) {
    console.log("Background script: setting variant", request.value);
    // set the current object(background)'s variant to be the same as popup's
    this.variant = request.value;

    // TODO send a message to the content script to change the page's DOM
    // chrome.runtime.sendMessage({fn: "setVariant", value: request.value});
  },

  getVariant: function(request, sender, sendResponse) {
    sendResponse(this.variant);
  }
};

// Start it up
background.init();
