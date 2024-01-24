export function createCheckbox() {
  const btnDiv = document.createElement('div');
  btnDiv.className = 'level__btn';

  const labelEasy = createLabelWithCheckbox("Easy", "easy-level__chbox input", "checkbox");
  const labelMedium = createLabelWithCheckbox("Medium", "medium-level__chbox input", "checkbox");
  const labelHard = createLabelWithCheckbox("Hard", "hard-level__chbox input", "checkbox");

  btnDiv.appendChild(labelEasy);
  btnDiv.appendChild(labelMedium);
  btnDiv.appendChild(labelHard);

  return btnDiv;
}

function createLabelWithCheckbox(labelText, checkboxClass, checkboxType) {
  const label = document.createElement('label');
  label.innerHTML = labelText;
  label.className = 'level__label';

  const checkbox = document.createElement('input');
  checkbox.type = checkboxType;
  checkbox.className = checkboxClass;

  label.appendChild(checkbox);

  return label;
}


// function createLabel() {
//   const labelEasy = document.createElement('label');
//   labelEasy.innerHTML = "Easy";

//   const labelMedium = document.createElement('label');
//   labelMedium.innerHTML = "Medium";

//   const labelHard = document.createElement('label');
//   labelHard.innerHTML = "Hard";
// }

// function createBtn() {
//   const easy = document.createElement('input');
//   const medium = document.createElement('input');
//   const hard = document.createElement('input');

//   easy.className = 'easy-level__chbox input';
//   medium.className = 'medium-level__chbox input';
//   hard.className = 'hard-level__chbox input';

//   easy.type = 'checkbox';
//   medium.type = 'checkbox';
//   hard.type = 'checkbox';

//   labelEasy.appendChild(easy);
//   labelMedium.appendChild(medium);
//   labelHard.appendChild(hard);

//   btnDiv.appendChild(labelEasy);
//   btnDiv.appendChild(labelMedium);
//   btnDiv.appendChild(labelHard);

//   return btnDiv;
// }