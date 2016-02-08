//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

// console.log("Chrome extension is running");
//
// // Change the URL below to try other variants
// var variant = chrome.extension.getURL("guestreviewfilter09outof5.html");
// $.get( guestreviewfilter, function( myHTML ) {
//   var $container = $("#ratingContainer");
//   // alert( "Load was performed." );
//   $container.after(myHTML);
// });
//
// $(document).ready(function(){
//   var variantdescription = $('[data-variant]').data('variant');
//   console.log("Variant: " +variantdescription);
// })
//

/* globals chrome */

var content = {
  variant: "",

  init: function() {
    console.log("contentscript initiated");
    //TODO run setVariant based on background.js

    // listen for any messages, and route them to functions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      console.log("message received by contentscript");

      // if (request.fn in content) {
      //   content[request.fn](request, sender, sendResponse);
      // }
    });
  },

  setContent: function(request, sender, sendResponse) {
    console.log("Content script: setting variant", request);
    // set the current object(background)'s variant to be the same as popup's
    // this.variant = request.value;

  }

};

content.init();
