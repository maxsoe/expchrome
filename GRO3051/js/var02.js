var description = "Stay inline with GRO2172 and GRO3489";

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
      $(".price-wrapper").append(avgrate);

      var totalrate = $(myHTML).filter('.total-rate-display')[0].outerHTML;
      $(".price-wrapper").append(totalrate);
    });
}
