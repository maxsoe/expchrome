console.log("Setting variant 1");
var description = "Free, using Expedia+ points";

chrome.runtime.sendMessage({
  fn: "getVariant"
}, function(response) {
  // Get the response from any listeners and play it back
  console.log("var01 got response", response);
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

      var alert = $(myHTML).filter('#alert7')[0].outerHTML;

      console.log("alert:", alert);
      $("#tripDetails").before(alert);

    });
}
