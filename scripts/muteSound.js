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

  const muteBtn = document.createElement('button');
  muteBtn.classList.add('mute__btn');

  const svgSound = document.createElement('img');
  svgSound.className = 'sound__btn';
  svgSound.src = 'images/sound-on-light.svg';

  muteBtn.appendChild(svgSound);
  
  muteBtn.addEventListener('click', () => {
    if (isMuted) {
      svgSound.src = 'images/sound-on-light.svg';
      unMuteSound();
      isMuted = false;
    } else {
      svgSound.src = 'images/sound-off-light.svg';
      muteSound();
      isMuted = true;
    }
  })
  return muteBtn;
}

function muteSound() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach((audio) => audio.muted = true);
}

function unMuteSound() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach((audio) => audio.muted = false);
}