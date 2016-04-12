var description = "For .com - 'Avg rate per room, per night' after price, and in header";

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

      var headerrate = $(myHTML).filter('#avg-rate-header')[0].innerHTML;
      console.log("header rate:", headerrate);
      $("#avg-rate-header").html(headerrate);

      var avgrateperroom = $(myHTML).filter('.avg-rate-per-room')[0].outerHTML;
      // var avgrateperroom = $(myHTML).filter('.avg-rate-per-room');
      console.log("avg rate per room:", avgrateperroom);
      $(".room-price").after(avgrateperroom);

    });
}
