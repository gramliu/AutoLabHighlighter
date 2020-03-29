chrome.runtime.onMessage.addListener((message, sender, response) => {
    console.log(sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );
    console.log(message.errors);
  });