/* globals chrome */

console.log("This is background.js");

var version = chrome.app.getDetails().name;
console.log(version);

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

    // Insert the javascript/CSS for the current variant
    chrome.tabs.insertCSS({
      file: "css/"+request.value +".css"
    });
    chrome.tabs.executeScript({
      file: "js/"+request.value +".js"
    });

    // Send a message to the content script to change the page's DOM
      // console.log("Send message with function setContent");
      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //   // The content script is set on the active tab (tabs[0].id)
      //   chrome.tabs.sendMessage(tabs[0].id,{fn: "setContent", value: request.value});
      // });
  },

  getVariant: function(request, sender, sendResponse) {
    sendResponse(this.variant);
  }
};

// Start it up
background.init();
