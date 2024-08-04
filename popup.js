console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.bounding-box-btn');
    const undoButton = document.querySelector('.undo-btn');
    const captureButton = document.querySelector('.capture-btn');

    button.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { event: 'toggleBoundingBoxMode' });
        });
    });

    undoButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0 && tabs[0].id !== undefined) {
                chrome.tabs.sendMessage(tabs[0].id, { event: 'undoLastBox' });
            } else {
                console.error('No active tab found.');
            }
        });
        console.log("Undo button clicked");
    });

    captureButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { event: 'captureScreen' });
        });
    });
});


