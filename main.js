const path = require('path');
const { menubar } = require('menubar');

const isDev = process.env.NODE_ENV === 'development';

const mb = menubar({
  browserWindow: {
    alwaysOnTop: isDev,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  },
});

mb.on('ready', () => console.log('app is ready'));
