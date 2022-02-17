const path = require('path');
const { menubar } = require('menubar');

const isDev = process.env.NODE_ENV === 'development';

const mb = menubar({
  tooltip: 'Hem Wallpapers',
  icon: path.join(__dirname, 'assets/icon.png'),
  showDockIcon: false,
  preloadWindow: true,
  skipTaskbar: true,
  browserWindow: {
    movable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: isDev,
    showDockIcon: false,
    preloadWindow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    height: 360,
  },
});

mb.on('ready', () => {
  console.log('app is ready');
});

mb.on('after-create-window', () => {
  // hide dock icon
  if (process.platform === 'darwin') {
    mb.app.dock.hide();
  }
});

// disable backgrounding the app to avoid a flash when opening your menubar app
mb.app.commandLine.appendSwitch(
  'disable-backgrounding-occluded-windows',
  'true',
);
