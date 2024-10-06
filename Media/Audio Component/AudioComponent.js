const audio = document.getElementById("audio");
const playPauseAudioButton = document.getElementById("playPauseAudio");
const audioPlayPauseIcon = document.getElementById("audioPlayPauseIcon");
const audioVolumeSlider = document.getElementById("audioVolume");
const audioPlaybackRate = document.getElementById("audioPlaybackRate");
const audioProgressSlider = document.getElementById("audioProgress");
const beatBars = document.querySelectorAll(".beat-bar");

// Play/Pause functionality
playPauseAudioButton.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    audio.play();
    audioPlayPauseIcon.classList.remove("fa-play");
    audioPlayPauseIcon.classList.add("fa-pause");
    startBeatAnimation();
  } else {
    audio.pause();
    audioPlayPauseIcon.classList.remove("fa-pause");
    audioPlayPauseIcon.classList.add("fa-play");
    stopBeatAnimation();
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

// Playback speed control
audioPlaybackRate.addEventListener("change", (e) => {
  audio.playbackRate = e.target.value;
});

// Beat animation control
function startBeatAnimation() {
  beatBars.forEach((bar) => {
    bar.classList.add("beat-bar");
  });
}

function stopBeatAnimation() {
  beatBars.forEach((bar) => {
    bar.classList.remove("beat-bar");
  });
}
