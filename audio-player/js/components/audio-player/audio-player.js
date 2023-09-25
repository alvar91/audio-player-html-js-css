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
    {
      src: "./assets/music/beyonce.mp3",
      artist: "Beyonce",
      title: "Don't Hurt Yourself",
      image: "./assets/images/lemonade.png",
    },
    {
      src: "./assets/music/dontstartnow.mp3",
      artist: "Dua Lipa",
      title: "Don't Start Now",
      image: "./assets/images/dontstartnow.png",
    },
    {
      src: "./assets/music/praise-of-death.mp3",
      artist: "Slayer",
      title: "Praise of Death",
      image: "./assets/images/praise-of-death.jpg",
    },
    {
      src: "./assets/music/edible-autopsy.mp3",
      artist: "Cannibal Corpse",
      title: "Edible Autopsy",
      image: "./assets/images/edible-autopsy.jpg",
    },
    {
      src: "./assets/music/necromancer.mp3",
      artist: "Sepultura",
      title: "Necromancer",
      image: "./assets/images/necromancer.jpg",
    },
    {
      src: "./assets/music/dead-by-dawn.mp3",
      artist: "Deicide",
      title: "Dead by Dawn",
      image: "./assets/images/dead-by-dawn.jpg",
    },
  ];

  #isPlaying = true;

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
    if (this.#isPlaying) {
      this.#playPauseButton.style.backgroundImage =
        "url(./assets/icons/pause.png)";
      this.#songImage.classList.add("player__top--active");

      this.#song.play();
      this.#isPlaying = false;
    } else {
      this.#playPauseButton.style.backgroundImage =
        "url(./assets/icons/play.png)";
      this.#songImage.classList.remove("player__top--active");

      this.#song.pause();
      this.#isPlaying = true;
    }
  };

  #nextSong = () => {
    this.#songIndex++;

    if (this.#songIndex >= this.#songs.length) this.#songIndex = 0;

    this.#song.src = this.#songs[this.#songIndex].src;
    this.#songImage.src = this.#songs[this.#songIndex].image;
    this.#background.src = this.#songs[this.#songIndex].image;

    this.#songArtist.innerHTML = this.#songs[this.#songIndex].artist;
    this.#songTitle.innerHTML = this.#songs[this.#songIndex].title;

    this.#isPlaying = true;

    this.#playPause();
  };

  #previousSong = () => {
    this.#songIndex--;

    if (this.#songIndex < 0) this.#songIndex = this.#songs.length - 1;

    this.#song.src = this.#songs[this.#songIndex].src;
    this.#songImage.src = this.#songs[this.#songIndex].image;
    this.#background.src = this.#songs[this.#songIndex].image;

    this.#songArtist.innerHTML = this.#songs[this.#songIndex].artist;
    this.#songTitle.innerHTML = this.#songs[this.#songIndex].title;

    this.#isPlaying = true;
    this.#playPause();
  };

  #updateProgressValue = () => {
    this.#progressBar.max = this.#song.duration;
    this.#progressBar.value = this.#song.currentTime;

    this.#currentTime.innerHTML = this.#formatTime(
      Math.floor(this.#song.currentTime)
    );

    if (
      isNaN(this.#song.duration) ||
      this.#durationTime.innerHTML === "NaN:NaN"
    )
      this.#durationTime.innerHTML = "0:00";
    else {
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
