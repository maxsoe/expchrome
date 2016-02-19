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

    // Clear things from variants
      $(".numberOfNights").empty();
      $("body").removeClass("var01 var02");
        // $(".hotelWrapper .expediaPoints").remove();
        // $(".hotelWrapper .actualPrice").empty();
        // $(".hotelWrapper .priceType").empty();

    // Insert the content into the page
    var currentVariant = chrome.extension.getURL("html/"+request.value +".html");
    $.get( currentVariant, function( myHTML ) {
      // Set variant for CSS
      $("body").addClass(request.value);

      // Things in <head>
      var headContent = $(myHTML)[1];
      console.log("headContent: ", headContent);
      $("head").append(headContent);

      var t8425 = $(myHTML).filter('.t8425')[0].outerHTML;
      var variantName = $(myHTML).filter('.variantName')[0].innerHTML;

      // console.log("numberOfNights:", numberOfNights);
      console.log("Variant :", variantName);

      // Var 1
      $(".var01 .segmented-list.filter article:nth-of-type(3)").after(t8425);

    });
  }

};

content.init();
