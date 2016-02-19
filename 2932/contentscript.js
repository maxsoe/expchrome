//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

console.log("Chrome extension is running");
console.log("Currently favoured variants are guestreviewfilter18.html and guestreviewfilter19.html");

// Change the URL below to try other variants
var guestreviewfilter = chrome.extension.getURL("guestreviewfilter23.html");
$.get( guestreviewfilter, function( myHTML ) {
  var $container = $("#ratingContainer");
  // alert( "Load was performed." );
  $container.after(myHTML);
});

$(document).ready(function(){
  var variantdescription = $('[data-variant]').data('variant');
  console.log("Variant: " +variantdescription);
})
