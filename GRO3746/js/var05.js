var description = "Don't miss out on low prices!"+
"Book now and choose to pay later at the property (excludes pre-paid, non-refundable rooms).";

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

      var paylater = $(myHTML).filter('#paylater')[0].outerHTML;

      // console.log("wizard:", wizard);
      $("#availability-wizard-container").after(paylater);

    });
}