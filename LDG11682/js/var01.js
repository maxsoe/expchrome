var description = "Copying booking.com";

chrome.runtime.sendMessage({
  fn: "getVariant"
}, function(response) {
  // Get the response from any listeners and play it back

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

  // Insert the content into the page
    $.get( currentVariant, function( myHTML ) {

      var moreOfBrand = $(myHTML).filter('.more-of-brand')[0].outerHTML;
      $(".whole-listing").append(moreOfBrand);

    });
}
