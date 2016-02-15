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

      var numberOfNights = $(myHTML).filter('.numberOfNights')[0].outerHTML;
        // var actualPrice = $(myHTML).filter('.actualPrice')[0].innerHTML;
        // var priceType = $(myHTML).filter('.priceType')[0].innerHTML;

      console.log("numberOfNights:", numberOfNights);
      $(".var01 .hotel-primary .flex-content .flex-area-primary>div:nth-of-type(2)").after(numberOfNights);
      $(".var01 .hotel-secondary .flex-area-primary table").before(numberOfNights);

      // $(".var02 .hotel-primary .hotel-primary .flex-area-primary div[class=secondary]:nth-child(1)").before(numberOfNights);
      $(".var02 .hotel-primary .flex-content .flex-area-primary>div:nth-of-type(2)").prepend(numberOfNights);
      $(".var02 .hotel-secondary .flex-area-primary .room>a:nth-of-type(1)").prepend(numberOfNights);

        // console.log("actualPrice: ", actualPrice);
        // $(".hotelWrapper .actualPrice").html(actualPrice);
        //
        // console.log("priceType: ", priceType);
        // $(".hotelWrapper .priceType").html(priceType);
        //
        // // Remove points earning
        // $(".hotelWrapper .earnPointsText").empty();

    });
  }

};

content.init();