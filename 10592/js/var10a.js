console.log("Setting variant 10");
var description = "Free. Use Tooltip with word 'value'. Second popup";

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
    $(".resultsContainer div:nth-of-type(4n+3) .actualPrice").empty();
    $(".hotelWrapper .priceType").empty();

  // Insert the content into the page

    $.get( currentVariant, function( myHTML ) {

      var expediaPoints = $(myHTML).filter('.expediaPoints')[0].outerHTML;
      var actualPrice = $(myHTML).filter('.actualPrice')[0].outerHTML;
      var priceType = $(myHTML).filter('.priceType')[0].innerHTML;
      var toolTip2 = $(myHTML).filter('#tooltip2')[0].outerHTML;
      // var toolTip2 = $(myHTML).filter('#tooltip2');

      // console.log("Expedia:", expediaPoints);
      $(".hotelWrapper .ratingContainer").after(expediaPoints);

      // console.log("actualPrice: ", actualPrice);
      // $(".hotelWrapper .actualPrice").after(actualPrice);
      $(".resultsContainer div:nth-of-type(4n+3) .actualPrice").after(actualPrice);

      // console.log("priceType: ", priceType);
      // $(".hotelWrapper .priceType").html(priceType);

      // console.log(toolTip2);
      $("body").append(toolTip2);

      // Remove points earning
      // $(".hotelWrapper .earnPointsText").empty();

    });
}
