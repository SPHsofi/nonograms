export function createCheckbox() {
  const btnDiv = document.createElement('div');
  btnDiv.className = 'level-wrapper__btn';

  const labelEasy = levelButtons('Easy');
  const labelMedium = levelButtons('Medium');
  const labelHard = levelButtons('Hard');

  btnDiv.appendChild(labelEasy);
  btnDiv.appendChild(labelMedium);
  btnDiv.appendChild(labelHard);

  return btnDiv;
}

function levelButtons(text) {
  const button = document.createElement('button');
  button.className = 'level__btn';
  button.textContent = text;

  button.addEventListener('click', () => {
    button.className = 'select-level';
  })

  return button;
}

let levelSort = [];
export function toggleSortArray(levelDiv, render) {
  const buttons = levelDiv.querySelectorAll('.level__btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let index = levelSort.indexOf(button.textContent.toLowerCase());
      if (index !== -1) {
        levelSort.splice(index, 1);
        button.className = 'level__btn';
      } else {
        levelSort.push(button.textContent.toLowerCase());
        button.className = 'select-level';
      }

      render(levelSort)
      console.log(levelSort);
    })
  })
}