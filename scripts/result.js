import { pics } from "./pics.js";
import { timer } from "./timer.js";

export function showResult() {
  const resultWrapper = document.createElement('div');
  resultWrapper.className = 'result-wrapper';

  const resultBtn = document.createElement('button');
  resultBtn.className = 'result__btn';
  resultBtn.textContent = 'Show result';

  resultBtn.addEventListener('click', () => {
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
  

  resultWrapper.appendChild(resultBtn);

  return resultWrapper;
}