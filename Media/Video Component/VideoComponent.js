// VideoComponent.js

const video = document.getElementById("video");
const playPauseButton = document.getElementById("playPause");
const playPauseIcon = document.getElementById("playPauseIcon");
const fullscreenButton = document.getElementById("fullscreen");
const volumeSlider = document.getElementById("volume");
const progressSlider = document.getElementById("progress");

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    video.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
});

// Update progress bar as the video plays
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressSlider.value = progress;
});

// Seek functionality: Update video time based on slider
progressSlider.addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * video.duration;
  video.currentTime = seekTime;
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
});

// Fullscreen functionality
fullscreenButton.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    // IE/Edge
    video.msRequestFullscreen();
  }
});
