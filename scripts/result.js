import { pics } from "./pics.js";
import { timer } from "./timer.js";
import { renderField, renderInfoGame } from "./index.js";

export function refreshResultWrapper() {
  const refreshResultWrapper = document.createElement('div');
  refreshResultWrapper.className = 'refresh-result-wrapper__btn';


  const randomBtn = renderRandomBtn();
  const resultBtn = showResult();
  const refreshBtn = refreshGameFill();
  const saveBtn = saveResult();
  const continueBtn = continueGame();

  refreshResultWrapper.appendChild(randomBtn);
  refreshResultWrapper.appendChild(resultBtn);
  refreshResultWrapper.appendChild(refreshBtn);
  refreshResultWrapper.appendChild(saveBtn);
  refreshResultWrapper.appendChild(continueBtn);

  return refreshResultWrapper;
}

function renderRandomBtn() {

  const randomBtn = document.createElement('button');
  randomBtn.className = 'random__btn';
  randomBtn.textContent = 'Random picture';

  randomBtn.onclick = function () {
    const tapSound = document.querySelector('.tap__audio');
    tapSound.play();

    const randomIndex = Math.floor(Math.random() * pics.length);
    const randomGameFill = pics[randomIndex];
    renderField(randomGameFill.pic, randomGameFill.size);
    renderInfoGame(randomGameFill.name);
  }

  return randomBtn;
}


function showResult() {
  const resultBtn = document.createElement('button');
  resultBtn.className = 'result__btn';
  resultBtn.textContent = 'Show result';

  resultBtn.addEventListener('click', () => {
    soundPlay();

    const save = document.querySelector('.save__btn');
    console.log(save)
    save.classList.add('save__btn-disabled');
    save.disabled = true;

    const name = document.querySelector('.label-pic');
    const selectPic = pics.find((pic) => pic.name == name.textContent);
    const gamebtn = document.querySelectorAll('.btn');

    gamebtn.forEach((btn) => {
      if (btn.classList.contains('btn__active')) {
        btn.classList.remove('btn__active');
      }
      if (btn.classList.contains('btn__cross')) {
        btn.classList.remove('btn__cross');
      }

      btn.disabled = true;
    })

    selectPic.pic.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item.isShouldClick) {
          const index = rowIndex * selectPic.size + colIndex;
          gamebtn[index].classList.add('btn__active');
        }
      });
    });
    timer.stopTimer();
  });

  return resultBtn;
}

function refreshGameFill() {
  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'refresh__btn';
  refreshBtn.textContent = 'Restart game';

  refreshBtn.addEventListener('click', () => {
    soundPlay();

    const save = document.querySelector('.save__btn');
    save.classList.remove('save__btn-disabled');
    save.disabled = false;

    const gamebtn = document.querySelectorAll('.btn');

    gamebtn.forEach((btn) => {
      if (btn.classList.contains('btn__active')) {
        btn.classList.remove('btn__active');
      }

      if (btn.classList.contains('btn__cross')) {
        btn.classList.remove('btn__cross');
      }

      btn.disabled = false;
    })
    window.winIndex = 0;
    timer.stopTimer();
    timer.seconds = 0;
    timer.counter = 0;
    timer.renderTimer(document.querySelector('.timer'));
  });

  return refreshBtn;
}

function saveResult() {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('save__btn');
  saveBtn.textContent = 'Save game';

  saveBtn.addEventListener('click', ()=> {
    soundPlay();
    saveLs();
  })

  return saveBtn;
}

function saveLs() {
  const gameName = document.querySelector('.label-pic').textContent;
  const timerValue = timer.counter ;
  const btns = document.querySelectorAll('.btn');

  const saveBtn = []

  btns.forEach(btn => {
    saveBtn.push(btn.className)
  })

  localStorage.setItem('gameFields', JSON.stringify(saveBtn));
  localStorage.setItem('gameName', gameName);
  localStorage.setItem('gameTimer', timerValue);
  localStorage.setItem('winIndex', winIndex);
}

function continueGame() {
  const continueBtn = document.createElement('button');
  continueBtn.className = 'continue__btn';
  continueBtn.textContent = 'Continue last game';

  return continueBtn;
}

function soundPlay() {
  const tapSound = document.querySelector('.tap__audio');
  tapSound.play();
}