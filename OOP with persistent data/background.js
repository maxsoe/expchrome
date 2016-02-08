/* globals chrome */

console.log("Hello for OOP with persistent data. This is background.js");

var background = {
  // set sku to an empty string
  sku: "",

  init: function() {

    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      // console.log("message received", request);

      if (request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
    });
  },

  setSku: function(request, sender, sendResponse) {
    console.log("setting sku", request.sku);
    // set the current object(background)'s sku to be the same as request's
    this.sku = request.sku;
  },

  getSku: function(request, sender, sendResponse) {
    sendResponse(this.sku);
  }
};

// Start it up
background.init();
