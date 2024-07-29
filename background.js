console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.event === 'mousedown') {
        console.log('Mouse down at: ', message.x, message.y);
    } else if (message.event === 'mouseup') {
        console.log('Mouse up at: ', message.x, message.y);
    }
});
