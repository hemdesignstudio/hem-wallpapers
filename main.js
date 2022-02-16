const path = require('path')
const { menubar } = require('menubar');

const mb = menubar({
  browserWindow: {
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  }
});

mb.on('ready', () => console.log('app is ready'));

