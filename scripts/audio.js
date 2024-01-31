export function createAudioSection() {
  const audioWrapper = document.createElement('section');
  audioWrapper.className = 'audio__section';

  const winSoundAudio = winSound();
  const tapSoundAudio = tapSound();
  const selectSoundAudio = selectBtnSound();
  const crossSoundAudio = crossBtnSound();
  const exitSoundAudio = exitSound();

  audioWrapper.appendChild(winSoundAudio);
  audioWrapper.appendChild(tapSoundAudio);
  audioWrapper.appendChild(selectSoundAudio);
  audioWrapper.appendChild(crossSoundAudio);
  audioWrapper.appendChild(exitSoundAudio);

  return audioWrapper;
}

function winSound() {
  const winSound = document.createElement('audio');
  winSound.src = 'sounds/win.mp3';
  winSound.className = 'win__audio';


  return winSound;
}

function tapSound() {
  const tapSound = document.createElement('audio');
  tapSound.src = 'sounds/boop.mp3';
  tapSound.className = 'tap__audio';

  return tapSound;
}

function selectBtnSound() {
  const selectSound = document.createElement('audio');
  selectSound.src = 'sounds/select.mp3';
  selectSound.className = 'select__audio';

  return selectSound;
}

function crossBtnSound() {
  const crossSound = document.createElement('audio');
  crossSound.src = 'sounds/cross.mp3';
  crossSound.className = 'cross__audio';

  return crossSound;
}

function exitSound() {
  const exitSound = document.createElement('audio');
  exitSound.src = 'sounds/exit.mp3';
  exitSound.className = 'exit__audio';

  return exitSound;
}