import { pic } from "./pic.js";

// функция для создания секции с игрой
export function createGameSection() {
  const gameSection = document.createElement('section');
  gameSection.className = 'game__section section';

  const gameFill = createGameWraper();
  gameSection.appendChild(gameFill);

  createGameFill();
  return gameSection;
}

// функция для добавления игрового поля
function createGameWraper() {
  const gameFill = document.createElement('div');
  gameFill.className = 'game-wraper';
  
  return gameFill;
}

function createGameFill() {
  function picName() {
    pic.forEach((image) => {
      console.log(image.name);
    });
  }
  
  picName();
}