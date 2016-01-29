console.log("Hello from your Chrome extension!");

// The page to be embedded in the lightbox needs to be accessible from the extension
var virtualtour = chrome.extension.getURL("max-virtualtour.html");

var runtimeID = chrome.runtime.id;
console.log("chrome extension ID is " +runtimeID);

// Get the HTML from the live page so we know which part to replace
var wantedHTML = $(".room-thumbnail").html();

// Overwrite DOM
$("head").append('<script src="chrome-extension://' +runtimeID +'/krpano/p_6036723_67515472VFML.js"></script>');
$(".room-thumbnail").html('<a data-control="modal" data-chromeid="' +runtimeID +'" href="' + virtualtour + '" data-ajax="true" id="ajaxModal" class="custom-link-class" data-footer="true" data-modal-id="jspModalAjaxContent" data-js-theme="default" data-classes=" custom-modal-class " data-background="false">' + wantedHTML + '<a/>');
