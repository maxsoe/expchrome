var description = 'based on v09, without air attach';

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
  // Change the page's title to match the current variant
  $("title").text(variant);

  // Clear things from other variants

  // Insert the content into the page
    $.get( currentVariant, function( myHTML ) {

      var expediaplus = $(myHTML).filter('.expedia-plus')[0].outerHTML;
      $(".room-price-info-wrapper").prepend(expediaplus);

      var avgrate = $(myHTML).filter('.avg-rate-display')[0].outerHTML;
      // console.log("wizard:", wizard);
      $(".price-wrapper").append(avgrate);
      $(".price.link-to-rooms").append(avgrate);
      // $(".mock-book-button-wrapper").prepend(totalrate);

      var totalrate = $(myHTML).filter('.total-rate-display')[0].outerHTML;
      $(".price-wrapper").append(totalrate);

      var resortfee = $(myHTML).filter('.m-resort-fee')[0].outerHTML;
      $(".price-wrapper").append(resortfee);

      // var airattach = $(myHTML).filter('.air-attach')[0].outerHTML;
      // $(".price-wrapper").append(airattach);
    });
}
