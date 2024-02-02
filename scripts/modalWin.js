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
    const exitSound = document.querySelector('.exit__audio');
    exitSound.play();

    modalSection.classList.replace('modal-visible__section', 'modal-win__section');
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