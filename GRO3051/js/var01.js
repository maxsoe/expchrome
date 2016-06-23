var description = "Labels before price";

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

  // Insert the content into the page
    $.get( currentVariant, function( myHTML ) {

      var avgrate = $(myHTML).filter('.avg-rate-display')[0].outerHTML;
      // console.log("wizard:", wizard);
      $(".room-price-info-wrapper").before(avgrate);

      var totalrate = $(myHTML).filter('.total-rate-display')[0].outerHTML;
      // $(".cross-out-price").after(totalrate);
      $(".price-wrapper").append(totalrate);
    });
}
