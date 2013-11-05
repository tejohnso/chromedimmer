(function() {
  function insertOverlay(){ 
  var newDiv;
  if (document.getElementById('dimmerChromeExtension')) {return;}
  newDiv = window.document.createElement('div');
  newDiv.id="dimmerChromeExtension"; 
  if (!window.document.body) {return;}
  window.document.body.appendChild(newDiv);
  chrome.storage.local.get("opacity", function(items) {
    newDiv.style.opacity = items.opacity * 0.1;
  });
  }

  chrome.storage.local.get("status", function(items) {
    if (items.status === 'enabled') {insertOverlay();}
  });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.subject === 'status') {
      if (message.status === 'enabled') {
        insertOverlay();
      } else {
        window.document.body.removeChild(window.document.getElementById('dimmerChromeExtension'));
      }
    }
    if (message.subject === 'opacity') {
      if (window.document.getElementById('dimmerChromeExtension')) {
        window.document.getElementById('dimmerChromeExtension').style.opacity = message.opacity * 0.1;
      }
    }
  });
}())
