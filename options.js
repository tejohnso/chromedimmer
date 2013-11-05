chrome.storage.local.get(null, function(items){
  chrome.storage.local.set({"opacity": items.opacity || 3});
  chrome.storage.local.set({"status": items.status || 'enabled'});
});

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

function restore_options() {
  chrome.storage.local.get(null, function(items) {
    document.getElementById("opacity").value = items.opacity || 3;
    document.getElementById("enabledBox").checked = 
             (!items.status || items.status === 'enabled') ? true : false;
  });
}

function save_options() {
  var opacity =  document.getElementById("opacity").value;
  var saveMessage = document.getElementById('saveMessage');
  var status = document.getElementById('enabledBox').checked ? "enabled" : "disabled";
  saveMessage.innerHTML = "Options Saved.";
  setTimeout(function() {
    saveMessage.innerHTML = "";
  }, 750);

  chrome.storage.local.set({"opacity": opacity});
  chrome.storage.local.set({"status": status});

  chrome.tabs.query({},function(tabs) {
    tabs.forEach(function(val) {
      chrome.tabs.sendMessage(val.id, {subject: "opacity", opacity: opacity});
      chrome.tabs.sendMessage(val.id, {subject: "status", status: status});
    });
  }); 
}

