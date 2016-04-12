var description = "(UK) 2 rooms, 2 nights - shown after price";

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
      var headContent = $(myHTML)[1];
      console.log("headContent: ", headContent);
      $("head").append(headContent);

      var multiroom = $(myHTML).filter('.multi-room')[0].outerHTML;

      console.log("multi-room:", multiroom);
      $(".avg-rate .breakfastSurCharge").before(multiroom);

    });
}
