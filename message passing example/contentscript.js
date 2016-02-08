if (window == top) {
  var feeds = findFeeds();

  // notify the extension of the feed URLs we found.
  chrome.extension.sendRequest(feeds);
}

function findFeeds() {
  var result = document.evaluate( document,null, 0, null);

  var feeds = [];
  var item;
  while (item = result.iterateNext()) {
    feeds.push(item.href);
  }
  return feeds;
}
