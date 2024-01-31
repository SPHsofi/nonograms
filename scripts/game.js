import { createModalWin } from "./modalWin.js";
import { timer } from "./timer.js";
import { timerTag } from "./index.js";
import { refreshResultWrapper } from "./result.js";

export function createGameSection(array, level) {
  const gameSection = document.createElement('section');
  gameSection.className = 'game__section section';

  const gameWrapper = createGameWraper(array, level);
  const BtnWrapper = gameBtnWrapper();

  gameSection.appendChild(gameWrapper);
  gameSection.appendChild(BtnWrapper);

  return gameSection;
}

export function createInfoWrapper(name) {
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'info-wrapper';

  const labelPic = document.createElement('h1');
  labelPic.className = 'label-pic'
  labelPic.textContent = `${name}`;

  infoWrapper.appendChild(labelPic);

  return infoWrapper;
}

function gameBtnWrapper() {
  const gameBtnWrapper = document.createElement('div');
  gameBtnWrapper.className = 'game-wrapper__btn';

  const refresh = refreshResultWrapper();

  gameBtnWrapper.appendChild(refresh);

  return gameBtnWrapper;
}

function createGameWraper(array, level) {
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'game-wrapper';

  const gameFill = renderGameField(array, level);
  const rowsFill = renderRowHint(array, level);
  const columnsFill = renderColumnHint(array, level);

  gameWrapper.appendChild(columnsFill);
  gameWrapper.appendChild(rowsFill);
  gameWrapper.appendChild(gameFill);

  return gameWrapper;
}

function renderGameField(array, level) {
  const gameFill = document.createElement('div');
  gameFill.style.gridTemplateColumns = level;
  gameFill.style.gridTemplateRows = level;
  gameFill.className = 'game';

  array.flat().forEach(() => {
    const button = document.createElement('button');
    button.classList.add('btn');
    gameFill.appendChild(button);

  })

  game(gameFill, array);
  return gameFill;
}

function renderRowHint(array, level) {
  const rowHints = [];

  for (let i = 0; i < array.length; i++) {
    let rowIndex = 0;
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j].isShouldClick) {
        ++rowIndex;
      } else {
        rowHints[i] = rowHints[i] || [];
        rowHints[i].push(rowIndex);
        rowIndex = 0;
      }
    }
    rowHints[i] = rowHints[i] || [];
    rowHints[i].push(rowIndex);
  }

  const rowsFill = document.createElement('div');
  rowsFill.style.gridTemplateRows = level;
  rowsFill.className = 'rows';

  rowHints.forEach((rows) => {
    const div = document.createElement('div');
    div.classList.add('row-hints');

    rows.forEach(row => {
      if (row) {
        const span = document.createElement('span');
        span.textContent = row;
        span.className = 'hints__span';
        div.appendChild(span);
      }
    })
    rowsFill.appendChild(div);
  })

  return rowsFill;
}

function renderColumnHint(array, level) {
  const columHints = [];

  for (let i = 0; i < array[0].length; i++) {
    let columnIndex = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[j][i].isShouldClick) {
        ++columnIndex;
      } else {
        columHints[i] = columHints[i] || [];
        columHints[i].push(columnIndex);
        columnIndex = 0;
      }
    }
    columHints[i] = columHints[i] || [];
    columHints[i].push(columnIndex);
  }

  const columnsFill = document.createElement('div');
  columnsFill.style.gridTemplateColumns = level;
  columnsFill.className = 'columns';

  columHints.forEach((column) => {
    const div = document.createElement('div')
    div.classList.add('column-hints')
    column.forEach(column => {
      if (column) {
        const span = document.createElement('span')
        span.textContent = column
        span.className = 'hints__span';
        div.appendChild(span)
      }
    })
    columnsFill.appendChild(div)
  })

  return columnsFill;
}

function countTrueClicks(array) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j].isShouldClick === true) {
        count++;
      }
    }
  }
  return count;
}

function game(gameFill, array) {
  let winIndex = 0
  const buttons = gameFill.querySelectorAll('.btn');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const selectSound = document.querySelector('.select__audio');
      selectSound.play();
      // true
      if (array.flat()[index].isShouldClick) {
        if (!btn.classList.contains('btn__active') && !btn.classList.contains('btn__cross')) {
          btn.classList.add('btn__active');
          ++winIndex;
        }
        else if (btn.classList.contains('btn__active')) {
          btn.classList.remove('btn__active');
          --winIndex;
        }
      } else {
        if (!btn.classList.contains('btn__active') && !btn.classList.contains('btn__cross')) {
          btn.classList.add('btn__active');
          --winIndex;
        }
        else if (btn.classList.contains('btn__cross')) {
          return;
        }
        else {
          btn.classList.remove('btn__active');
          ++winIndex;
        }
      }

      const trueClick = countTrueClicks(array);
      console.log(`Для выйгрыша надо набрать - ${winIndex}/${trueClick}`)
      if (winIndex === trueClick) {
        setTimeout(() => {
          const winSound = document.querySelector('.win__audio');
          winSound.play();

          timer.stopTimer();
          timer.isStart = false;

          const modalSection = createModalWin();
          document.body.appendChild(modalSection);

          const modal = document.querySelector('.modal-win__section');
          modal.classList.replace('modal-win__section', 'modal-visible__section');
        }, 200);
      }
      timer.startTimer(timerTag);
      timer.isStart = true;
    })
  })

  buttons.forEach((btn, index) => {
    btn.addEventListener('contextmenu', (e) => {
      const crossSound = document.querySelector('.cross__audio');
      crossSound.play();
      e.preventDefault();
      if (!btn.classList.contains('btn__cross') && !btn.classList.contains('btn__active')) {
        btn.classList.add('btn__cross');
        btn.textContent = 'X';
      }
      else {
        btn.classList.remove('btn__cross');
        btn.textContent = '';
      }
    })
  })
}