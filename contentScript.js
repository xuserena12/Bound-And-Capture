console.log('contentScript.js loaded');

document.addEventListener('mousedown', function(event) {
    let clickData = {
      event: 'mousedown',
      x: event.clientX,
      y: event.clientY
    };
    chrome.runtime.sendMessage(clickData);
});

document.addEventListener('mouseup', function(event) {
    let clickData = {
      event: 'mouseup',
      x: event.clientX,
      y: event.clientY
    };
    chrome.runtime.sendMessage(clickData);
});
