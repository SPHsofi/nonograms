import { pics } from "./pics.js";
import { createModalWin } from "./modalWin.js";

const pic = pics[11]
const flower = pic.pic;
const flatArray = flower.flat();
let level;

if (pic.level == 'easy') {
  level = "repeat(5, 50px)";
} else if (pic.level == 'medium') {
  level = "repeat(10, 50px)";
} else if (pic.level == 'hard'){
  level = "repeat(15, 50px)";
};

export function createGameSection() {
  const gameSection = document.createElement('section');
  gameSection.className = 'game__section section';

  const gameWrapper = createGameWraper();
  gameSection.appendChild(gameWrapper);
  return gameSection;
}

function createGameWraper() {
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'game-wrapper';

  const gameFill = renderGameField();
  const rowsFill = renderRowHint();
  const columnsFill = renderColumnHint();

  gameWrapper.appendChild(columnsFill);
  gameWrapper.appendChild(rowsFill);
  gameWrapper.appendChild(gameFill);
  return gameWrapper;
}

function renderGameField() {
  const gameFill = document.createElement('div');
  gameFill.style.gridTemplateColumns = level;
  gameFill.style.gridTemplateRows = level;
  gameFill.className = 'game';

  flatArray.forEach(() => {
    const button = document.createElement('button');
    button.classList.add('btn');
    gameFill.appendChild(button);

  })

  game(gameFill);
  return gameFill;
}

function renderRowHint() {
  const rowHints = [];

  for (let i = 0; i < flower.length; i++) {
    let rowIndex = 0;
    for (let j = 0; j < flower[i].length; j++) {
      if (flower[i][j].isShouldClick) {
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

function renderColumnHint() {
  const columHints = [];

  for (let i = 0; i < flower[0].length; i++) {
    let columnIndex = 0;
    for (let j = 0; j < flower.length; j++) {
      if (flower[j][i].isShouldClick) {
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

  columHints.forEach((column, i, array) => {
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

function countTrueClicks() {
  let count = 0;
  for (let i = 0; i < flower.length; i++) {
    for (let j = 0; j < flower[i].length; j++) {
      if (flower[i][j].isShouldClick === true) {
        count++;
      }
    }
  }
  return count;
}

function game(gameFill) {
  let winIndex = 0
  const buttons = gameFill.querySelectorAll('.btn');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (flatArray[index].isShouldClick) {
        if (btn.classList.contains('btn__active')) {
          btn.classList.remove('btn__active')
          --winIndex
        }
        else {
          btn.classList.add('btn__active')
          ++winIndex
        }
      } else {
        if (btn.classList.contains('btn__active')) {
          btn.classList.remove('btn__active')
          ++winIndex
        }
        else {
          btn.classList.add('btn__active')
          --winIndex
        }
      }
      const trueClick = countTrueClicks();
      if (winIndex === trueClick) {
        setTimeout(() => {
          // alert('win')
          const modalSection = createModalWin();
          document.body.appendChild(modalSection);

          const modal = document.querySelector('.modal-win__section');
          modal.classList.replace('modal-win__section', 'modal-visible__section');
        }, 200);
      }
    })
  })
}