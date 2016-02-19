console.log("Setting variant 6");
var currentVariant = chrome.extension.getURL("/html/var06.html");
console.log("currentVariant: ", currentVariant);
// Clear things from other variants
  $(".hotelWrapper .expediaPoints").remove();
  $(".hotelWrapper .actualPrice").empty();
  $(".hotelWrapper .priceType").empty();

// Insert the content into the page

  $.get( currentVariant, function( myHTML ) {

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
