var description = "Book, rather than the close button";

chrome.runtime.sendMessage({
  fn: "getVariant"
}, function(response) {
  // Get the response from any listeners and play it back
    // console.log("var01 got response", response);
  // Set value of checked to current variant
  console.log('this.response is ' + response);

  if (response != 0) {
    console.log("set currentVariant to response");
    setVariant(response);
  }
});

function setVariant(variant) {
  var currentVariant = chrome.extension.getURL("/html/"+variant +".html");

  console.log("currentVariant: ", currentVariant);
  // Clear things from other variants
    // $(".hotelWrapper .expediaPoints").remove();
    // $(".hotelWrapper .actualPrice").empty();
    // $(".hotelWrapper .priceType").empty();

  // Insert the content into the page
    $.get( currentVariant, function( myHTML ) {
      // var headContent = $(myHTML)[1];
      // console.log("headContent: ", headContent);
      // $("head").append(headContent);

      var buttonReplaceClose = $(myHTML).filter('.btn-book')[0].outerHTML;

      console.log("button:", buttonReplaceClose);
      // $(".map-header .star-rating-wrapper").after(buttonReplaceClose);
      $(".map-header .map-close").remove();
      $(".map-header h2:first-of-type").before(buttonReplaceClose);

    });
}
