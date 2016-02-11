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

    // Clear things from other variants
    $(".hotelWrapper .expediaPoints").remove();
    $(".hotelWrapper .actualPrice").empty();
    $(".hotelWrapper .priceType").empty();
    $(".expediaPoints").css();

    // Insert the content into the page
    var currentVariant = chrome.extension.getURL("html/"+request.value +".html");
    $.get( currentVariant, function( myHTML ) {
      var headContent = $(myHTML)[1];
      console.log("headContent: ", headContent);
      $("head").append(headContent);

      var expediaPoints = $(myHTML).filter('.expediaPoints')[0].outerHTML;
      var actualPrice = $(myHTML).filter('.actualPrice')[0].innerHTML;
      var priceType = $(myHTML).filter('.priceType')[0].innerHTML;

      console.log("Expedia:", expediaPoints);
      $(".hotelWrapper .ratingContainer").after(expediaPoints);

      console.log("actualPrice: ", actualPrice);
      $(".hotelWrapper .actualPrice").html(actualPrice);

      console.log("priceType: ", priceType);
      $(".hotelWrapper .priceType").html(priceType);

      // Remove points earning
      $(".hotelWrapper .earnPointsText").empty();

    });
  }

};

content.init();
