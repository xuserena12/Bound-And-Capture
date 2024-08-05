console.log('contentScript.js loaded');

let isDrawingEnabled = false;
let isDrawing = false;
let startX, startY;
let box;
let boxes = [];
let labels = [];
let currentClass = 0;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.event === 'toggleBoundingBoxMode') {
        isDrawingEnabled = !isDrawingEnabled;
        if (isDrawingEnabled) {
            document.addEventListener('mousemove', handleMouseMove);
            alert('Bounding box drawing enabled');
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            alert('Bounding box drawing disabled');
        }
    } else if (message.event === 'undoLastBox') {
        undoLastBox();
    } else if (message.event === 'captureScreen') {
        for (let box of boxes) {
            box.style.visibility = 'hidden';
        }
        chrome.runtime.sendMessage({event: 'captureRequest', labels: labels});
    } else if (message.event === 'finishedScreenCapture') {
        for (let box of boxes) {
            box.style.visibility = 'visible';
        }
    }
});

document.addEventListener('mousedown', function(event) {
    if (isDrawingEnabled) {
        isDrawing = true;
        startX = event.pageX;
        startY = event.pageY;

        box = document.createElement('div');
        box.style.position = 'absolute';
        box.style.border = '2px solid blue';
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        document.body.appendChild(box);
    }

    let clickData = {
      event: 'mousedown',
      x: event.clientX,
      y: event.clientY
    };
    chrome.runtime.sendMessage(clickData);
});

document.addEventListener('mouseup', function(event) {
    if (isDrawingEnabled && isDrawing) {
        isDrawing = false;
        boxes.push(box);
        chrome.storage.local.get(['currentClass'], function(result) {
            currentClass = result.currentClass || 0;
        });
        labels.push(`${currentClass} ${startX} ${startY} ${event.clientX} ${event.clientY}`);
    }

    let clickData = {
      event: 'mouseup',
      x: event.clientX,
      y: event.clientY
    };
    chrome.runtime.sendMessage(clickData);
});

function handleMouseMove(event) {
    if (!isDrawing) return;
    box.style.width = `${event.pageX - startX}px`;
    box.style.height = `${event.pageY - startY}px`;
}

function undoLastBox() {
    if (boxes.length > 0) {
        const lastBox = boxes.pop();
        lastBox.remove();
        // labels should also be removed
        labels.pop();
    }
}
