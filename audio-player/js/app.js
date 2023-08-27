import { AudioPlayer } from "./components/audio-player/index.js";

export default class App {
  init() {
    const audioPlayer = new AudioPlayer({
      backgroundSelector: ".js-background",
      songImageSelector: ".js-song-image",
      songSelector: ".js-audio",
      songArtistSelector: ".js-song-artist",
      songTitleSelector: ".js-song-title",

      playPauseButtonSelector: ".js-play-pause",
      previousButtonSelector: ".js-previous-song",
      nextButtonSelector: ".js-next-song",

      currentTimeSelector: ".js-current-time",
      durationTimeSelector: ".js-duration-time",

      progressBarSelector: ".js-progress-bar",
    });
    audioPlayer.init();
  }
}
