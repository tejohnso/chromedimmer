chrome.storage.local.get(null, function(items){
  chrome.storage.local.set({"opacity": items.opacity || 3});
  chrome.storage.local.set({"status": items.status || 'enabled'});
});

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('change', save_options);

function restore_options() {
  chrome.storage.local.get(null, function(items) {
    document.getElementById("opacity").value = items.opacity || 3;
    document.getElementById("status").checked = 
             (!items.status || items.status === 'enabled') ? true : false;
  });
}

function save_options(event) {
  var message = 
        {subject: event.target.id
        ,opacity: document.getElementById("opacity").value
        ,status: document.getElementById("status").checked ? "enabled" : "disabled"};

  chrome.storage.local.set({"opacity": message.opacity});
  chrome.storage.local.set({"status": message.status});

  chrome.tabs.query({},function(tabs) {
    tabs.forEach(function(val) {
      chrome.tabs.sendMessage(val.id, message);
    });
  }); 
}
