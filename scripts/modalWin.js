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
  levelText.textContent = 'Level passed';

  const buttonPics = document.createElement('button');
  buttonPics.className = 'modal-pics__btn'
  buttonPics.textContent = 'Select a picture';
  
  buttonExit = buttonExit(modalSection);

  btnContainer.appendChild(buttonExit);
  btnContainer.appendChild(buttonPics);

  modalWrapper.appendChild(header);
  modalWrapper.appendChild(levelText);
  modalWrapper.appendChild(btnContainer);

  modalSection.appendChild(modalWrapper);

  return modalSection;
}

function buttonExit(modalSection) {
  const buttonExit = document.createElement('button');
  buttonExit.className = 'modal-exit__btn'
  buttonExit.textContent = 'Exit';

  buttonExit.addEventListener('click', () =>{
    modalSection.classList.replace('modal-visible__section', 'modal-win__section');
  })

  return buttonExit;
}