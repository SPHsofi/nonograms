import { pics } from "./pics.js";
import { timer } from "./timer.js";
import { renderField, renderInfoGame } from "./index.js";

export function refreshResultWrapper() {
  const refreshResultWrapper = document.createElement('div');
  refreshResultWrapper.className = 'refresh-result-wrapper__btn';


  const randomBtn = randomGameBtn();
  const resultBtn = showResultBtn();
  const refreshBtn = restartGameFillBtn();
  const saveBtn = saveResultBtn();
  const continueBtn = continueGameBtn();

  refreshResultWrapper.appendChild(randomBtn);
  refreshResultWrapper.appendChild(resultBtn);
  refreshResultWrapper.appendChild(refreshBtn);
  refreshResultWrapper.appendChild(saveBtn);
  refreshResultWrapper.appendChild(continueBtn);

  return refreshResultWrapper;
}

// Событие для кнопки рандомная игра
function randomGameBtn() {
  const randomBtn = renderBtn('random__btn', 'Random picture');

  randomBtn.onclick = function () {
    soundPlay();

    window.isGame = true;
    window.winIndex = 0;
    timer.seconds = 0;
    timer.counter = 0;
    timer.renderTimer(document.querySelector('.timer'));

    const randomIndex = Math.floor(Math.random() * pics.length);
    const randomGameFill = pics[randomIndex];
    renderField(randomGameFill.pic, randomGameFill.size);
    renderInfoGame(randomGameFill.name);
  }

  return randomBtn;
}

// Кнопка "Показать результат" 
function showResultBtn() {
  const resultBtn = renderBtn('result__btn', 'Show result');

  resultBtn.addEventListener('click', () => {
    soundPlay();
    showResult();
  });

  return resultBtn;
}

// Функция для отображаения результата
function showResult() {
  const save = document.querySelector('.save__btn');
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
  timer.isStart = false;
}

// Кнопка "Перезапустить игру"
function restartGameFillBtn() {
  const refreshBtn = renderBtn('refresh__btn', 'Restart game');

  refreshBtn.addEventListener('click', () => {
    soundPlay();
    refreshGameFill();
    window.isGame = true;
  });

  return refreshBtn;
}

// Функция для очищения игрового поля
function refreshGameFill() {
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
}

// Кнопка "Сохранить результат"
function saveResultBtn() {
  const saveBtn = renderBtn('save__btn', 'Save game');

  saveBtn.addEventListener('click', () => {
    soundPlay();
    saveResult();
  })

  return saveBtn;
}

// Функция для сохранения результата в localStorage
function saveResult() {
  const gameName = document.querySelector('.label-pic').textContent;
  const timerValue = timer.counter;
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

// Кнопка "Продолжить последнюю игру"
function continueGameBtn() {
  const continueBtn = renderBtn('continue__btn', 'Continue last game');

  continueBtn.addEventListener('click', () => {
    soundPlay();
    continueGame();
    window.isGame = true;
  })

  return continueBtn;
}

// Функция для отображения последней сохраненной игры
function continueGame() {
  const gameName = localStorage.getItem('gameName');
  const picsLs = JSON.parse(localStorage.getItem('gameFields'));
  const timerValue = localStorage.getItem('gameTimer');
  const winIndexLs = localStorage.getItem('winIndex');
  const timerTag = document.querySelector('.timer');
  let foundGame = null;

  if (gameName) {
    foundGame = pics.find((pic) => pic.name == gameName);
    renderField(foundGame.pic, foundGame.size);
    renderInfoGame(gameName);
  }

  const btns = document.querySelectorAll('.btn');

  btns.forEach((btn, index) => {
    btn.className = picsLs[index];
  })

  window.winIndex = +winIndexLs;
  timer.stopTimer();
  timer.counter = +timerValue;
  timer.seconds = calculateSeconds(+timerValue);
  timer.renderTimer(timerTag);
  timer.isStart = false;
}

// Функция для генерации кнопок
function renderBtn(className, text) {
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = text;

  return btn;
}

// Функция для запуска звуковых эффектов
function soundPlay() {
  const tapSound = document.querySelector('.tap__audio');
  tapSound.play();
}

// Функция для расчета секунд
function calculateSeconds(counter) {
  let totalMinutes = Math.floor(counter / 60)
  let totalSeconds = counter - (totalMinutes * 60)

  return totalSeconds
}