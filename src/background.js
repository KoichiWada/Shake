chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');


  chrome.tabs.executeScript(
    { code: 'console.log("code");toggleFluctuations();' }
  );
});

