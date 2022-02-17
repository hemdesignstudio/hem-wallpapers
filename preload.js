window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const { contextBridge } = require('electron');
const wallpaper = require('wallpaper');

contextBridge.exposeInMainWorld('electron', {
  getCurrentWallpaper: async () => {
    const currentWallpaper = await wallpaper.get();
    console.log('current wallpaper', currentWallpaper);
  },
  setCurrentWallpaper: async (path) => {
    await wallpaper.set(path);
    console.log('current wallpaper', path);
  },
});
