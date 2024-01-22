import { createGameSection } from "./game.js";

const main = document.createElement('main');
main.className = 'main';

const headSection = document.createElement('section');
headSection.className = 'head__section section';

const gameSection = createGameSection();

main.appendChild(headSection);
main.appendChild(gameSection);

document.body.appendChild(main);
