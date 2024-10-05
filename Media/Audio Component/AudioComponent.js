const audio = document.getElementById("audio");
const playPauseAudioButton = document.getElementById("playPauseAudio");
const audioPlayPauseIcon = document.getElementById("audioPlayPauseIcon");
const audioVolumeSlider = document.getElementById("audioVolume");
const audioProgressSlider = document.getElementById("audioProgress");

// Play/Pause functionality
playPauseAudioButton.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    audio.play();
    audioPlayPauseIcon.classList.remove("fa-play");
    audioPlayPauseIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    audioPlayPauseIcon.classList.remove("fa-pause");
    audioPlayPauseIcon.classList.add("fa-play");
  }
});

// Update progress bar as the audio plays
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  audioProgressSlider.value = progress;
});

// Seek functionality: Update audio time based on slider
audioProgressSlider.addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Volume control
audioVolumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});
