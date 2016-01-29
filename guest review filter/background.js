//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

console.log("Chrome extension is running");

// Change the URL below to try other variants
var guestreviewfilter = chrome.extension.getURL("guestreviewfilter01.html");

$.get( guestreviewfilter, function( data ) {
  $("#lodgingTypecontainer").after(data);
  // alert( "Load was performed." );
  // var variantdescription = $("div.uxvariant").text;
  // console.log(variantdescription);
});
