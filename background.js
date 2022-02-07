// platform agnostic shenanigans
if (typeof browser === "undefined") {
    var browser = chrome;
}

// modified from mozilla docs:
// see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/sendMessage
function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {message: 'bypass'}
    ).then(response => {
      console.log("Message from the content script:");
      console.log(response.response);
    }).catch(onError);
  }
}

browser.browserAction.onClicked.addListener(function(){
  console.log('Triggering extension');
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});
