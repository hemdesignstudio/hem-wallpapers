const path = require('path');
const { menubar } = require('menubar');
const { app, ipcMain, nativeTheme } = require('electron');
const AutoLaunch = require('auto-launch');

const hemWallpapersAutoLauncher = new AutoLaunch({ name: 'Hem Wallpapers' });

hemWallpapersAutoLauncher.enable();
hemWallpapersAutoLauncher.isEnabled().then((isEnabled) => {
  if (isEnabled) {
    return;
  }
  hemWallpapersAutoLauncher.enable();
});

const isDev = process.env.NODE_ENV === 'development';

function getTrayIcon(isDark = nativeTheme.shouldUseDarkColors) {
  return path.join(__dirname, `assets/icon${isDark ? '-dark' : ''}.png`);
}

const mb = menubar({
  icon: getTrayIcon(),
  tooltip: 'Hem Wallpapers',
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

ipcMain.handle('quit-app', () => {
  app.quit();
});

mb.on('ready', () => {
  console.log('app is ready');

  // change color of menubar icon based on system appearance
  nativeTheme.on('updated', () => mb.tray.setImage(getTrayIcon()));
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
