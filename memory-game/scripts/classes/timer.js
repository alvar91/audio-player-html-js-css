export default class Timer {
  constructor(timeoutHandler) {
    this.initialtTime = 60;
    this.startTime;
    this.timerId;
    this.timeoutHandler = timeoutHandler;
  }

  start() {
    this.startTime = performance.now();
  }

  printTime($el) {
    this.timerId = setInterval(() => {
      const currentTime =
        this.initialtTime -
        Math.round((performance.now() - this.startTime) / 1000);
      if (currentTime === 0) this.timeoutHandler();
      $el.innerText = currentTime;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.timerId);
  }
}
