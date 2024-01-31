import { pics } from "./pics.js";
import { renderField, renderInfoGame } from "./index.js";
import { timer } from "./timer.js";

export function createSelectUl(filtredPics) {
  const selectPic = document.createElement('div');
  selectPic.classList = 'select-pic__wrapper';

  const renderList = openList(selectPic, filtredPics);

  selectPic.appendChild(renderList);
  return selectPic;
}

function openList(selectPic, filtredPics) {
  const titleBtn = document.createElement('button');
  titleBtn.className = 'pic__btn';
  titleBtn.textContent = 'Select an image';

  const list = renderList(filtredPics);
  selectPic.appendChild(list);

  titleBtn.addEventListener('click', () => {
    if (!list.classList.contains("visible")) {
      list.classList.add("visible");
      document.addEventListener('click', closeListOnClick);
    } else {
      list.classList.remove("visible");
      document.removeEventListener('click', closeListOnClick);
    }
  })

  function closeListOnClick(event) {
    if (!selectPic.contains(event.target)) {
      list.classList.remove("visible");
      document.removeEventListener('click', closeListOnClick);
    }
  }

  return titleBtn;
}


function renderList(filtredPics) {

  const listUl = document.createElement('ul');
  listUl.classList.add("select-list");

  if (filtredPics == undefined || filtredPics.length == 0) {
    sortList(listUl, pics);
  }
  else {
    sortList(listUl, filtredPics);
    console.log(filtredPics)
  }

  return listUl;
}

function renderTitleList(className, size) {

  const levelUl = document.createElement('ul');
  levelUl.className = className;
  levelUl.textContent = size;

  return levelUl
}

let gameFieds = []
function sortList(listUl, arr) {

  const easyUl = renderTitleList('easy-title title', '5x5')
  const mediumUl = renderTitleList('medium-title title', '10x10')
  const hardUl = renderTitleList('hard-title title', '15x15')

  arr.forEach((pic) => {
    const listLi = document.createElement('li');
    listLi.textContent = pic.name;
    listLi.className = 'name-game';
    // listUl.appendChild(listLi);

    if (pic.size === 5) {
      easyUl.appendChild(listLi);
    } else if (pic.size === 10) {
      mediumUl.appendChild(listLi);
    } else if (pic.size === 15) {
      hardUl.appendChild(listLi);
    }

    listUl.appendChild(easyUl);
    listUl.appendChild(mediumUl);
    listUl.appendChild(hardUl);

    // listUl.removeEventListener('click');

    easyUl.addEventListener('click', handleImageClick);
    mediumUl.addEventListener('click', handleImageClick);
    hardUl.addEventListener('click', handleImageClick);

  })
}

function handleImageClick(event) {
  const selectedImageName = event.target.textContent;
  const selectedImage = pics.find((pic) => pic.name === selectedImageName);
  if (selectedImage) {
    gameFieds = selectedImage.pic.map(item => {
      item.isSelected = false;
      item.isEmpty = false;
      timer.stopTimer();
      timer.seconds = 0;
      timer.counter = 0;
      timer.renderTimer(document.querySelector('.timer'));
      return item;
    });
    renderField(gameFieds, selectedImage.size);
    renderInfoGame(selectedImage.name);
  }
}
