/* globals chrome */

var contentScript = {
  init: function() {
    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
    });
  },

  setVariant: function(request, sender, sendResponse) {
    console.log("Content script: setting variant", request);
    // Manipulate DOM with request.value
    // TODO
  }
};

// Start it up
contentScript.init();
