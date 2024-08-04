const pathButton = document.getElementById('path-finder');
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
