console.log("Setting variant 4");
var description = "Add point language to burn message and associate to price (above)";

chrome.runtime.sendMessage({
  fn: "getVariant"
}, function(response) {
  // Get the response from any listeners and play it back
    // console.log("var02 got response", response);
  // Set value of checked to current variant
    // console.log('this.response is ' + response);

  if (response != 0) {
    // console.log("set currentVariant to response");
    setVariant(response);
  }
});

function setVariant(variant) {
  var currentVariant = chrome.extension.getURL("/html/"+variant +".html");

  console.log("currentVariant: ", currentVariant);
  // Clear things from other variants
    $(".hotelWrapper .expediaPoints").remove();
    $(".hotelWrapper .actualPrice").empty();
    $(".hotelWrapper .priceType").empty();

  // Insert the content into the page
    $.get( currentVariant, function( myHTML ) {
      var headContent = $(myHTML)[1];
      console.log("headContent: ", headContent);
      $("head").append(headContent);

      var expediaPoints = $(myHTML).filter('.expediaPoints')[0].outerHTML;
      var actualPrice = $(myHTML).filter('.actualPrice')[0].innerHTML;
      var priceType = $(myHTML).filter('.priceType')[0].innerHTML;

      console.log("Expedia:", expediaPoints);
      $(".hotelWrapper .ratingContainer").after(expediaPoints);

      console.log("actualPrice: ", actualPrice);
      $(".hotelWrapper .actualPrice").html(actualPrice);

      console.log("priceType: ", priceType);
      $(".hotelWrapper .priceType").html(priceType);

      // Remove points earning
      $(".hotelWrapper .earnPointsText").empty();

    });
}
