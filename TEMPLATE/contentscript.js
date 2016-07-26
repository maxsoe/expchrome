/* globals chrome */

var content = {
  variant: "",

  init: function() {
    console.log("contentscript initiated");

    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      console.log("message received by contentscript");

      if (request.fn in content) {
        content[request.fn](request, sender, sendResponse);
      }
    });
  },

  setContent: function(request, sender, sendResponse) {
    console.log("Content script: setting variant", request);
  }

};

content.init();
