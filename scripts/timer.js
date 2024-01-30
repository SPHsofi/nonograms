export function createTimer() {
  const timerWrapper = document.createElement('div');
  timerWrapper.className = 'timer-wrapper'

  const timerTag = document.createElement('p');
  timerTag.className = 'timer';
  timerTag.textContent = '00:00';

  timerWrapper.appendChild(timerTag);
  return timerWrapper
}

export const timer = {
  isStart: false,
  seconds: 0,
  counter: 0,
  interval: null,
  startTimer(tag) {
    if (!this.isStart) {
      this.interval = setInterval(() => {
        ++this.counter;
        ++this.seconds;
        if (this.seconds > 59) {
          this.seconds = 0;
        }
        this.renderTimer(tag);
      }, 1000);
    }
  },
  stopTimer() {
    clearInterval(this.interval);
  },
  renderTimer(tag) {
    tag.textContent = `${this.calculate(Math.floor(this.counter / 60))}:${this.calculate(this.seconds)}`;
  },
  calculate(num) {
    if (num > 9) {
      return num;
    } else {
      return `0${num}`;
    }
  }
}