import { pic } from "./pic.js"; 

// функция для создания секции с игрой
export function createGameSection() {
  const gameSection = document.createElement('section');
  gameSection.className = 'game__section section';
  
  const gameFill = createGameFill();
  gameSection.appendChild(gameFill);

  return gameSection; 
}

// функция для добавления игрового поля
function createGameFill() {
  const gameFill = document.createElement('div');
  gameFill.className = 'game-wraper';

  return gameFill; 
}