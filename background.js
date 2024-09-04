console.log('background.js loaded');
const filename = "pokemon";

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
                    filename: `${filename}.png`,
                    // saveAs: true
                })
                const text = message.labels.join('\n');
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        function: function(params) {
                            const blob = new Blob([params.text], {type: 'text/plain'});
                            const url = URL.createObjectURL(blob);
                            chrome.runtime.sendMessage({event: 'downloadLabels', url});
                        },
                        args: [{text}]
                    });
                });
            }
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {event: 'finishedScreenCapture'}, function(response) {});  
            });
        });
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.event === 'downloadLabels') {
        chrome.downloads.download({
            url: message.url,
            filename: `${filename}.txt`
        });
    }
});
