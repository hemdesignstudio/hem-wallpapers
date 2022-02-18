// icons used https://materialui.co/icons

const currentImage = document.getElementById('current-image');
const swapCurrentImage = document.getElementById('swap-current-image');
const setAsWallpaper = document.getElementById('set-as-wallpaper');
const icon = document.querySelector('.image__icon');

const imageFormatParams = '?w=400&fm=avif';

function getRandomImageUrl() {
  return new Promise((resolve) => {
    window.electron.getRandomImage().then((url) => {
      resolve('https:' + url);
    });
  });
}

function updatePreviewImage(url) {
  currentImage.src = url + imageFormatParams;
}

swapCurrentImage.addEventListener('click', async () => {
  icon.classList.add('rotate');
  const url = await getRandomImageUrl();
  updatePreviewImage(url);
});

currentImage.onload = () => {
  icon.classList.remove('rotate');
  console.group('loaded!');
};

const successMessages = [
  'Great choice! ✨',
  'Nice! 🤩',
  'High fives!',
  'You got it! 🎉',
  'Hooray! You did it!',
  'Looking crisp!',
];

setAsWallpaper.addEventListener('click', async () => {
  setAsWallpaper.innerText = 'Setting wallpaper…';
  setAsWallpaper.disabled = true;

  const url = currentImage.src.replace(imageFormatParams, '');
  await window.electron.setCurrentWallpaper(url);

  // get random successMessage
  const randomIndex = Math.floor(Math.random() * successMessages.length);
  setAsWallpaper.innerText = successMessages[randomIndex];
  confetti({ colors: ['#2326DE', '#D2DFEF'] });

  setTimeout(() => {
    setAsWallpaper.innerText = 'Set as wallpaper';
    setAsWallpaper.disabled = false;
  }, 2000);
});

// on app load
(async () => {
  const url = await getRandomImageUrl();
  updatePreviewImage(url);
})();
