import { createGameSection } from "./game.js";
import { createSelectUl } from "./list.js";
import { createCheckbox, toggleSortArray } from "./level.js";
import { pics } from "./pics.js";

const main = document.createElement('main');
main.className = 'main';

const headSection = document.createElement('section');
headSection.className = 'head__section section';

const levelDiv = createCheckbox();
const gameSection = createGameSection();
let optionSection = createSelectUl();
// const modalSection = createModalSection();

headSection.appendChild(levelDiv)
headSection.appendChild(optionSection);

// main.appendChild(modalSection);
main.appendChild(headSection);
main.appendChild(gameSection);


function renderLevel(levels) {
  let filtredPics = pics.filter(pic => levels.includes(pic.level))
  headSection.removeChild(optionSection)
  optionSection = createSelectUl(filtredPics)
  headSection.appendChild(optionSection)
}

toggleSortArray(levelDiv, renderLevel);

// selectLevel()
document.body.appendChild(main);
