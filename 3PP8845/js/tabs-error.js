var description = "Error message when tabs can't be called";

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
  // Remove items from page
    $("#filterForm").empty(); // Filters

  // Insert content into the page
    $.get( currentVariant, function( myHTML ) {
      var sortbarDE = $(myHTML).filter('#sortbarDE')[0].outerHTML;
      console.log("sortbarDE:", sortbarDE);
      $('#sortbarDE').replaceWith(sortbarDE);

      var divRegionList = $(myHTML).filter('#divRegionList')[0].outerHTML;
      console.log("divRegionList:", divRegionList);
      $('section.six .flex-1up').replaceWith(divRegionList);



      var paybackMessage = $(myHTML).filter('.payback-message')[0].outerHTML;
      console.log("paybackMessage:", paybackMessage);
      $('#sortbarDE').before(paybackMessage);

    });
}
