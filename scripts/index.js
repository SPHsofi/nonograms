import { createGameSection } from "./game.js";
import { createSelectUl } from "./list.js";
import { createCheckbox } from "./level.js";

const main = document.createElement('main');
main.className = 'main';

const headSection = document.createElement('section');
headSection.className = 'head__section section';

const levelDiv = createCheckbox();
const gameSection = createGameSection();
const optionSection = createSelectUl();
// const optionalFell = createOptionFell();

headSection.appendChild(levelDiv)
headSection.appendChild(optionSection);

main.appendChild(headSection);
main.appendChild(gameSection);

document.body.appendChild(main);
