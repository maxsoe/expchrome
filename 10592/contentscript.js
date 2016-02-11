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

    // Insert the content into the page
    $(".hotelWrapper .expediaPoints").remove();
    var currentVariant = chrome.extension.getURL("html/"+request.value +".html");
    $.get( currentVariant, function( myHTML ) {
      var headContent = $(myHTML)[1];
      console.log("headContent: ", headContent);
      $("head").append(headContent);

      var expediaPoints = $(myHTML).filter('.expediaPoints')[0].outerHTML;
      var actualPrice = $(myHTML).filter('.actualPrice')[0].innerHTML;
      var priceType = $(myHTML).filter('.priceType')[0].innerHTML;

      console.log("Expedia:", expediaPoints);
      console.log("actualPrice: ", actualPrice);
      console.log("priceType: ", priceType);

      $(".hotelWrapper .ratingContainer").after(expediaPoints);
      $(".hotelWrapper .actualPrice").html(actualPrice);
      $(".hotelWrapper .priceType").html(priceType);

      // Remove points earning
      $(".hotelWrapper .earnPointsText").empty();

    });
  }

};

content.init();
