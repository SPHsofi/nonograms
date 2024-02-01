import { createGameSection, createInfoWrapper } from "./game.js";
import { createSelectUl } from "./list.js";
import { createCheckbox, toggleSortArray } from "./level.js";
import { pics } from "./pics.js";
// import { createTimer } from "./timer.js";
import { createAudioSection } from "./audio.js";
import { changeTheme } from "./theme.js";

const main = document.createElement('main');
main.className = 'main';

const headSection = document.createElement('section');
headSection.className = 'head__section section';

// function renderFirstPic() {
//   const filterPics = pics.filter((pic) => pic.size == 5)
//   const randomIndex = Math.floor(Math.random() * filterPics.length);
//   const randomGameFill = pics[randomIndex];

//   return randomGameFill;
// }

// const randomGameFill = renderFirstPic();

// const timerSection = createTimer();
// export const timerTag = timerSection.querySelector('.timer');

const levelDiv = createCheckbox();
let gameSection = createGameSection(pics[0].pic, "repeat(5, 3vw)");
let optionSection = createSelectUl();
let infoWrapper = createInfoWrapper(pics[0].name);
const audioSection = createAudioSection();
const themeWrapper = changeTheme();

gameSection.appendChild(infoWrapper);


headSection.appendChild(themeWrapper);
// headSection.appendChild(timerSection);
headSection.appendChild(levelDiv);
headSection.appendChild(optionSection);

main.appendChild(headSection);
main.appendChild(gameSection);
main.appendChild(audioSection);

export function renderInfoGame(name) {
  infoWrapper = createInfoWrapper(name);
  gameSection.appendChild(infoWrapper);
}

export function renderField(array, number) {
  main.removeChild(gameSection)
  if (number == 5) {
    gameSection = createGameSection(array, "repeat(5, 2.5vw)");
  } else if (number == 10) {
    gameSection = createGameSection(array, "repeat(10, 2.5vw)");
  } else {
    gameSection = createGameSection(array, "repeat(15, 2.5vw)");
  }
  main.appendChild(gameSection)
}

function renderLevel(levels) {
  let filtredPics = pics.filter(pic => levels.includes(pic.level))
  headSection.removeChild(optionSection)
  optionSection = createSelectUl(filtredPics)
  headSection.appendChild(optionSection)

}

toggleSortArray(levelDiv, renderLevel);

document.body.appendChild(main);