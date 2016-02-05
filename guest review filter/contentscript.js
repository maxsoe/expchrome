//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

console.log("Chrome extension is running");

// Change the URL below to try other variants
var guestreviewfilter = chrome.extension.getURL("guestreviewfilter09outof5.html");
$.get( guestreviewfilter, function( myHTML ) {
  var $container = $("#ratingContainer");
  // alert( "Load was performed." );
  $container.after(myHTML);
});

$(document).ready(function(){
  var variantdescription = $('[data-variant]').data('variant');
  console.log("Variant: " +variantdescription);
})
