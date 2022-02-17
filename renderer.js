console.log('hello!!');

window.electron.getCurrentWallpaper();

// on click event handler for #set-as-wallpaper
document.getElementById('set-as-wallpaper').addEventListener('click', () => {
  console.log('clicked!');
  window.electron.setCurrentWallpaper(
    './assets/2022_Feb_Hem_HQ_Erik_Lefvander_2718.jpg',
  );
});
