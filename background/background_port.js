chrome.extension.onConnect.addListener((port) => {
  // Checks the connection source
  if (port.name === "option") {
    popup_port = port;

    // Begins to listen messages from popup
    popup_port.onMessage.addListener((request) => {
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
    });

    popup_port.onDisconnect.addListener(() => (popup_port = null));
  }
});
