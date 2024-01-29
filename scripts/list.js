import { pics } from "./pics.js";
import { renderField, renderInfoGame } from "./index.js";

export function createSelectUl(filtredPics) {
  const selectPic = document.createElement('div');
  selectPic.classList = 'select-pic__wrapper'

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
    } else {
      list.classList.remove("visible");
    }
  })

  return titleBtn
}

function renderList(filtredPics) {

  const listUl = document.createElement('ul');
  listUl.classList.add("select-list");

  if (filtredPics == undefined || filtredPics.length == 0) {
    sortList(listUl,pics);
    // console.log(pics)
  }
  else {
    sortList(listUl, filtredPics);
    console.log(filtredPics)
  }

  return listUl;
}

let gameFieds = []
function sortList(listUl, arr) {

  arr.forEach((pic) => {
    const listLi = document.createElement('li');
    listLi.textContent = pic.name;
    listLi.className = 'name-game';
    listUl.appendChild(listLi);
  })

  listUl.addEventListener('click', function(event) {
    const selectedImageName = event.target.textContent;
    const selectedImage = pics.find((pic) => pic.name === selectedImageName);
    if (selectedImage) {
      gameFieds = selectedImage.pic.map(item => {
        item.isSelected = false;
        item.isEmpty = false;
        return item;
      })
      renderField(gameFieds, selectedImage.size);
      renderInfoGame(selectedImage.name, selectedImage.size);
      // console.log(selectedImage.name);
    }
  });
}
