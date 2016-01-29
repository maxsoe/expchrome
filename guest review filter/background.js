//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

console.log("Chrome extension is running");


var guestreviewfilter = chrome.extension.getURL("guestreviewfilter01.html");
var mystuff = '<div>Testing my stuff</div><div>2nd set of stuff</div>';

$.get( guestreviewfilter, function( data ) {
  $("#lodgingTypecontainer").after(data);
  // alert( "Load was performed." );
  // var variantdescription = $("div.uxvariant").text;
  // console.log(variantdescription);
});
