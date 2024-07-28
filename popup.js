console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.bounding-box-btn');
    
    button.addEventListener('click', function () {
        chrome.runtime.sendMessage({ event: 'toggleBoundingBoxMode' });
    });
});


