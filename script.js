function getDoms() {
  var title = $('title').text();
  var description = $('meta[name="description"]').attr('content');
  var h1 = $('.ttl-main-page').text();
  var subtitle = $('.description').text();
  var h2tags = $('h2').length;
  var h2Text = [];

  for (var i = 0; i < h2tags; i++) {
    var text = $('.content-h2').eq(i).text();
    h2Text.push(text);
  }

  data = {
    title: title,
    description: description,
    h1: h1,
    h2: h2Text,
    subtitle: subtitle
  }
  return data;
}

chrome.runtime.onMessage.addListener (
  function(request, sender, sendResponse) {
    if (request == 'callContentScript') {
      data = getDoms();
      sendResponse({ data });
    }
  }
);

chrome.runtime.sendMessage ('',
  function(data) {
    //console.log("message sent");
  }
);
