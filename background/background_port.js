var options_port;


chrome.extension.onConnect.addListener((port) => {
  // Checks the connection source
  if (port.name === "option") 
  {
    options_port = port;

    // Begins to listen messages from popup
    options_port.onMessage.addListener((request) => 
    {
      if (
        request.type === "from_option" &&
        request.command === "copy_to_clipboard"
      ) {
        var input = document.createElement("textarea");
        document.body.appendChild(input);
        input.value = request.text;
        input.focus();
        input.select();
        document.execCommand("Copy");
        input.remove();
      }




      if(request.type === 'open_chrome_settings') 
      {
        chrome.tabs.create({ url: 'chrome://settings/content/javascript', active: false }, function (tab) {

        });

        chrome.tabs.create({ url: 'chrome://settings/content/images', active: false }, function (tab) {

        });

      }

    });

    options_port.onDisconnect.addListener(() => (options_port = null));
  }
});
