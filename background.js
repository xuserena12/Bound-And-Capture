console.log('background.js loaded');
let isListening = false;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.event === 'toggleBoundingBoxMode') {
        isListening = !isListening;
        console.log('bounding box:', isListening ? 'started' : 'stopped');
    } else if (message.event === 'mousedown') {
        if (isListening) {
            console.log('Mouse down at: ', message.x, message.y);
        }
    } else if (message.event === 'mouseup') {
        if (isListening) {
            console.log('Mouse up at: ', message.x, message.y);
        }
    }
});
