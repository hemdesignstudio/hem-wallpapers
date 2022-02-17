const path = require('path');
const { menubar } = require('menubar');

const isDev = process.env.NODE_ENV === 'development';

const mb = menubar({
  tooltip: 'Hem Wallpapers',
  icon: path.join(__dirname, 'assets/icon.png'),
  browserWindow: {
    alwaysOnTop: isDev,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    height: 360,
  },
});

mb.on('ready', () => console.log('app is ready'));
