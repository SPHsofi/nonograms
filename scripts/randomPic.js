import { pics } from "./pics.js";
import { renderField, renderInfoGame } from "./index.js";

export function renderRandomBtn() {
  const randomBtnWrapper = document.createElement('div');
  randomBtnWrapper.className = 'random-wrapper';
  
  const randomBtn = document.createElement('button');
  randomBtn.className = 'random__btn';
  randomBtn.textContent = 'Random picture';

  randomBtn.onclick = function() {
    const tapSound = document.querySelector('.tap__audio');
    tapSound.play();
    
    const randomIndex = Math.floor(Math.random() * pics.length);
    const randomGameFill = pics[randomIndex];
    renderField(randomGameFill.pic, randomGameFill.size);
    renderInfoGame(randomGameFill.name);
  }

  randomBtnWrapper.appendChild(randomBtn);

  return randomBtnWrapper;
}

