export class AudioPlayer {
  #background;
  #songImage;
  #song;
  #songArtist;
  #songTitle;

  #playPauseButton;
  #previousButton;
  #nextButton;

  #currentTime;
  #durationTime;
  #progressBar;

  #songIndex = 0;
  #songs = [
    "./assets/music/beyonce.mp3",
    "./assets/music/dontstartnow.mp3",
    "./assets/music/edible-autopsy.mp3",
    "./assets/music/necromancer.mp3",
  ];
  #songImages = [
    "./assets/images/lemonade.png",
    "./assets/images/dontstartnow.png",
    "./assets/images/edible-autopsy.jpg",
    "./assets/images/necromancer.jpg",
  ];
  #songArtists = ["Beyonce", "Dua Lipa", "Cannibal Corpse", "Sepultura"];
  #songTitles = [
    "Don't Hurt Yourself",
    "Don't Start Now",
    "Edible Autopsy",
    "Necromancer",
  ];

  #playing = true;

  #intervalId;

  constructor({
    backgroundSelector,
    songImageSelector,
    songSelector,
    songArtistSelector,
    songTitleSelector,
    playPauseButtonSelector,
    previousButtonSelector,
    nextButtonSelector,
    currentTimeSelector,
    durationTimeSelector,
    progressBarSelector,
  }) {
    this.#background = document.querySelector(backgroundSelector);
    this.#songImage = document.querySelector(songImageSelector);
    this.#song = document.querySelector(songSelector);
    this.#songArtist = document.querySelector(songArtistSelector);
    this.#songTitle = document.querySelector(songTitleSelector);
    this.#playPauseButton = document.querySelector(playPauseButtonSelector);
    this.#previousButton = document.querySelector(previousButtonSelector);
    this.#nextButton = document.querySelector(nextButtonSelector);

    this.#currentTime = document.querySelector(currentTimeSelector);
    this.#durationTime = document.querySelector(durationTimeSelector);

    this.#progressBar = document.querySelector(progressBarSelector);
  }

  #playPause = () => {
    if (this.#playing) {
      this.#playPauseButton.style.backgroundImage = "url(./assets/icons/pause.png)";
      this.#songImage.classList.add("player__top--active");

      this.#song.play();
      this.#playing = false;
    } else {
      this.#playPauseButton.style.backgroundImage = "url(./assets/icons/play.png)";
      this.#songImage.classList.remove("player__top--active");

      this.#song.pause();
      this.#playing = true;
    }
  };

  #nextSong = () => {
    this.#songIndex++;

    if (this.#songIndex >= this.#songs.length) this.#songIndex = 0;

    this.#song.src = this.#songs[this.#songIndex];
    this.#songImage.src = this.#songImages[this.#songIndex];
    this.#background.src = this.#songImages[this.#songIndex];

    this.#songArtist.innerHTML = this.#songArtists[this.#songIndex];
    this.#songTitle.innerHTML = this.#songTitles[this.#songIndex];

    this.#playing = true;

    this.#playPause();
  };

  #previousSong = () => {
    this.#songIndex--;

    if (this.#songIndex < 0) {
      this.#songIndex = this.#songs.length - 1;
    }

    this.#song.src = this.#songs[this.#songIndex];
    this.#songImage.src = this.#songImages[this.#songIndex];
    this.#background.src = this.#songImages[this.#songIndex];

    this.#songArtist.innerHTML = this.#songArtists[this.#songIndex];
    this.#songTitle.innerHTML = this.#songTitles[this.#songIndex];

    this.#playing = true;
    this.#playPause();
  };

  #updateProgressValue = () => {
    this.#progressBar.max = this.#song.duration;
    this.#progressBar.value = this.#song.currentTime;

    this.#currentTime.innerHTML = this.#formatTime(
      Math.floor(this.#song.currentTime)
    );

    if (this.#durationTime.innerHTML === "NaN:NaN") {
      this.#durationTime.innerHTML = "0:00";
    } else {
      this.#durationTime.innerHTML = this.#formatTime(
        Math.floor(this.#song.duration)
      );
    }
  };

  #formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - min * 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
  }

  #changeProgressBar = () => {
    this.#song.currentTime = this.#progressBar.value;
  };

  #addEventListeners = () => {
    this.#playPauseButton.addEventListener("click", this.#playPause);
    this.#previousButton.addEventListener("click", this.#previousSong);
    this.#nextButton.addEventListener("click", this.#nextSong);

    this.#song.addEventListener("ended", this.#nextSong);
    this.#progressBar.addEventListener("change", this.#changeProgressBar);

    this.#intervalId = setInterval(this.#updateProgressValue, 500);
  };

  #initAudioPlayer = () => {
    if (
      !this.#background ||
      !this.#songImage ||
      !this.#song ||
      !this.#songArtist ||
      !this.#songTitle ||
      !this.#playPauseButton ||
      !this.#previousButton ||
      !this.#nextButton ||
      !this.#currentTime ||
      !this.#durationTime ||
      !this.#progressBar
    ) {
      console.error("No necessary elements in layout for audio player");
      return;
    }

    this.#addEventListeners();
  };

  init() {
    this.#initAudioPlayer();
  }
}
