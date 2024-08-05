console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.bounding-box-btn');
    const undoButton = document.querySelector('.undo-btn');
    const captureButton = document.querySelector('.capture-btn');
    const classPicker = document.getElementById('class-picker');

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

    chrome.storage.local.get(['classes'], function(result) {
        // TODO: make this display the current class on select
        let classes = result.classes || [];
        for (let i = 0;i < classes.length;i++) {
            let option = document.createElement('option');
            option.text = classes[i];
            option.value = i;
            classPicker.add(option);
        }
    });

    classPicker.addEventListener('change', function() {
        let classIndex = classPicker.value;
        chrome.storage.local.set({currentClass: classIndex});
    });
});


