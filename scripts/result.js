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

  refreshResultWrapper.appendChild(randomBtn);
  refreshResultWrapper.appendChild(resultBtn);
  refreshResultWrapper.appendChild(refreshBtn);
  refreshResultWrapper.appendChild(saveBtn);

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
    const tapSound = document.querySelector('.tap__audio');
    tapSound.play();

    const name = document.querySelector('.label-pic');
    const selectPic = pics.find((pic) => pic.name == name.textContent);
    const gamebtn = document.querySelectorAll('.btn');

    gamebtn.forEach((btn) => {
      if (btn.classList.contains('btn__active')) {
        btn.classList.remove('btn__active');
      }

      if (btn.textContent = 'X') {
        btn.textContent = '';
        btn.classList.remove('btn__cross');
      }
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
    const tapSound = document.querySelector('.tap__audio');
    tapSound.play();

    const gamebtn = document.querySelectorAll('.btn');

    gamebtn.forEach((btn) => {
      if (btn.classList.contains('btn__active')) {
        btn.classList.remove('btn__active');
      }

      if (btn.textContent = 'X') {
        btn.textContent = '';
        btn.classList.remove('btn__cross');
      }
    })
    timer.stopTimer();
    timer.seconds = 0;
    timer.counter = 0;
    timer.renderTimer(document.querySelector('.timer'));
  });

  return refreshBtn;
}

function saveResult() {
  const saveBtn = document.createElement('button');
  saveBtn.className = 'save__btn';
  saveBtn.textContent = 'Save game';

  return saveBtn;
}