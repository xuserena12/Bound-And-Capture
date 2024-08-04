console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.event === 'mousedown') {
        console.log('Mouse down at: ', message.x, message.y);
    } else if (message.event === 'mouseup') {
        console.log('Mouse up at: ', message.x, message.y);
    } else if (message.event === 'captureRequest') {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, function (dataUrl) {
            if (chrome.runtime.lastError) {
                console.error('Error capturing screen:', chrome.runtime.lastError.message);
            } else {
                console.log('Screenshot is taken at:', dataUrl);
                chrome.downloads.download({
                    url: dataUrl,
                    filename: 'screenshot.png',
                    saveAs: true
                })
            }
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {event: 'finishedScreenCapture'}, function(response) {});  
            });
        });
    }
});
