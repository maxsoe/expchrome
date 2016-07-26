var description = "Description of variant 1. Put whatever you want in here";

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

      var newItem = $(myHTML).filter('.chrome-extension-template')[0].outerHTML;
      $("body").prepend(newItem);

    });
}
