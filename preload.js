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
const contentful = require('contentful');
const os = require('os');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const contentfulClient = contentful.createClient({
  space: '63ifdrmbhu32',
  accessToken: 'Ny-t2TIWpKZfsntKbEZv7dvLZmTCOEFpnweIfyPR8t0',
});

const getBase64Image = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  await new Promise((resolve, reject) => {
    reader.onload = resolve;
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return reader.result.replace(/^data:.+;base64,/, '');
};

contextBridge.exposeInMainWorld('electron', {
  getCurrentWallpaper: async () => {
    const currentWallpaper = await wallpaper.get();
    console.log('current wallpaper', currentWallpaper);
  },
  setCurrentWallpaper: async (url) => {
    try {
      const base64Image = await getBase64Image(url);
      const picturePath = path.join(
        os.homedir(),
        '/Pictures',
        'hem-wallpaper.jpg',
      );

      await fsPromises.writeFile(
        path.normalize(picturePath),
        base64Image,
        'base64',
      );
      await wallpaper.set(picturePath);
    } catch (err) {
      console.error(err);
    }
  },
  getRandomImage: async () => {
    try {
      const response = await contentfulClient.getAssets();
      const itemsLength = response.items.length;
      const randomIndex = Math.floor(Math.random() * itemsLength);
      return response.items[randomIndex].fields.file.url;
    } catch (err) {
      console.error(err);
    }
  },
});
