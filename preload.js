window.addEventListener('DOMContentLoaded', () => {
    // You can use Node.js APIs here
    const { ipcRenderer } = require('electron');
  
    // Example: Send a message to the main process
    ipcRenderer.send('message', 'Hello from preload');
  });