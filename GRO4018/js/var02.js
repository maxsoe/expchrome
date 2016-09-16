var description = "Change button only";

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

      // var leftChevron = $(myHTML).filter('.icon-toggle270')[0].outerHTML;
      // $("#hsrMap .map-heading").prepend(leftChevron);

      var mapClose = $(myHTML).filter('.btn-label')[0].outerHTML;

      $(".map-close .btn-label").replaceWith(mapClose);

    });
}
