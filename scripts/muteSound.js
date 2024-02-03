import { changeTheme } from "./theme.js";

export function muteAudioWrapper() {
  const muteAudioWrapper = document.createElement('div');
  muteAudioWrapper.className = 'mute-wrapper__audio';

  const muteAudio = document.createElement('button');
  muteAudio.className = 'mute__audio';

  const muteButton = createMuteButton();
  muteAudioWrapper.appendChild(muteButton);

  return muteAudioWrapper;
}

function createMuteButton() {
  let isMuted = false;
  let svgSound = createSoundSvg();

  const muteBtn = document.createElement('button');
  muteBtn.classList.add('mute__btn');

  muteBtn.appendChild(svgSound);

  muteBtn.addEventListener('click', () => {
    if (isMuted) {
      svgSound.src = `images/sound-on-${window.theme}.svg`;
      unMuteSound();
      isMuted = false;
    } else {
      svgSound.src = `images/sound-off-${window.theme}.svg`;
      muteSound();
      isMuted = true;
    }
  })
  return muteBtn;
}

function createSoundSvg() {
  const svgSound = document.createElement('img');
  svgSound.className = 'sound__img';
    svgSound.src = `images/sound-on-${window.theme}.svg`;
  return svgSound;
}

function muteSound() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach((audio) => audio.muted = true);
}

function unMuteSound() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach((audio) => audio.muted = false);
}
