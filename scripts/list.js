import { pic } from "./pic.js";

export function createSelectUl() {
  const titleUl = document.createElement('ul');
  titleUl.className = 'pic__ul list';

  const picUl = document.createElement('ul');
  picUl.className = 'sub__ul list'

  const titleLi = createSelectLi(picUl);
  // const picUl = takePic();

  titleUl.appendChild(titleLi);
  titleLi.appendChild(picUl);
  // titleUl.appendChild(picUl);
  takePic(picUl); 
  return titleUl;
}

function createSelectLi(picUl) {
  const titleLi = document.createElement('li');
  titleLi.value = '';
  titleLi.textContent = 'Select an image';
  titleLi.disabled = true;
  titleLi.selected = true;


  picUl.style.display = 'none';
  titleLi.addEventListener('click', function() {
      if (picUl.style.display === 'none') {
        picUl.style.display = 'block';
      } else {
        picUl.style.display = 'none';
      }
    });

  return titleLi;
}

function takePic(picUl) {

  pic.forEach((image) => {
    const option = document.createElement('li');
    option.textContent = image.name;
    option.className = 'name-game';
    picUl.appendChild(option);
  });

  picUl.addEventListener('click', function(event) {
    const selectedImageName = event.target.textContent;
    const selectedImage = pic.find((image) => image.name === selectedImageName);
    if (selectedImage) {
      console.log(selectedImage);
    }
  });
}
