console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.bounding-box-btn');
    
    button.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { event: 'toggleBoundingBoxMode' });
        });
    });
});


