import { timer } from "./timer.js";

export function createModalWin() {
  const modalSection = document.createElement('dialog');
  modalSection.classList.add('modal-win__section');

  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'modal-win__wrapper';

  const btnContainer = document.createElement('div');
  btnContainer.className = 'btn-container'

  const header = document.createElement('h1');
  header.className = 'modal-title';
  header.textContent = 'Congratulations!';

  const levelText = document.createElement('p');
  levelText.className = 'modal-text';
  levelText.textContent = `Your time ${timer.counter} sec`;

  const buttonExit = document.createElement('button');
  buttonExit.className = 'modal-exit__btn'
  buttonExit.textContent = 'Exit';

  buttonExit.addEventListener('click', () => {
    window.isGame = false;

    const gameBtn = document.querySelectorAll('.btn');
    gameBtn.forEach((btn) => {
      btn.disabled = true;
    })

    const save = document.querySelector('.save__btn');
    save.classList.add('save__btn-disabled');
    save.disabled = true;

    const exitSound = document.querySelector('.exit__audio');
    exitSound.play();

    document.body.removeChild(modalSection);
    timer.isStart = false;
    timer.seconds = 0;
    timer.counter = 0;
    timer.renderTimer(document.querySelector('.timer'));
  })

  btnContainer.appendChild(buttonExit);

  const rating = ratingTable();

  modalWrapper.appendChild(header);
  modalWrapper.appendChild(levelText);
  modalWrapper.appendChild(rating);
  modalWrapper.appendChild(btnContainer);

  modalSection.appendChild(modalWrapper);

  return modalSection;
}

function ratingTable() {
  const ratingWrapper = document.createElement('div');
  ratingWrapper.className = 'rating-wrapper';

  const ratingTableLs = JSON.parse(localStorage.getItem('winGame'));
  const ratingTable = ratingTableLs.slice(0, 5);

  const ratingText = document.createElement('p');
  ratingText.className = 'modal-rating';
  ratingText.textContent = 'Rating table';

  ratingWrapper.appendChild(ratingText);
  
  ratingTable.forEach((el, ind) => {
    const ratingIndex = document.createElement('p');
    ratingIndex.className = 'rating-index';
    ratingIndex.textContent = ind + 1;

    const ratingName = document.createElement('p');
    ratingName.className = 'rating-name';
    ratingName.textContent = el.name;

    const ratingTime = document.createElement('p');
    ratingTime.className = 'rating-time';
    ratingTime.textContent = `${el.time} sec`;

    ratingWrapper.append(ratingIndex);
    ratingWrapper.append(ratingName);
    ratingWrapper.append(ratingTime);
  });

  return ratingWrapper;
}


export function updateRatingTable() {
  const ratingWrapperT = document.querySelector('.rating-wrapper');
  const newRating = ratingTable();
  ratingWrapperT.replaceWith(newRating); 
}