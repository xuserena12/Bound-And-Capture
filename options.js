const pathButton = document.getElementById('path-finder');
const addClassButton = document.getElementById('add-class-btn');
const classInput = document.getElementById('class-input');
const removeAllClasses = document.getElementById('remove-all-classes');
const classList = document.getElementById('classes-list');
var dirHandle;

pathButton.addEventListener('click', async () => {
    try {
        dirHandle = await window.showDirectoryPicker();
        console.log(dirHandle);
        // run code for dirHandle
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('Directory picker was aborted');
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
});

addClassButton.addEventListener('click', () => {
    const inputValue = classInput.value; // Capture the value before clearing
    console.log(inputValue);
    classList.innerHTML += `<li>${inputValue}</li>`;
    classInput.value = ""; // Clear the input value
    chrome.storage.local.get(['classes'], function(result) {
        let classes = result.classes || []; // Use logical OR to simplify initialization
        classes.push(inputValue); // Use the captured value
        chrome.storage.local.set({classes: classes}, function() {
            console.log('Value is set to ' + classes); // Improved logging
        });
    });
});

removeAllClasses.addEventListener('click', () => {
    chrome.storage.local.remove('classes', function() {
        console.log('Classes removed');
    });
    classList.innerHTML = "";
})
