export function changeTheme() {
  const themeChangeWrapper = document.createElement('div');
  themeChangeWrapper.className = 'theme-wrapper';

  const changeThemeBtn = document.createElement('button');
  changeThemeBtn.className = 'theme__btn';

  const svgImg = document.createElement('img');
  svgImg.src = 'images/moon.svg';
  svgImg.className = 'moon__svg';

  changeThemeBtn.addEventListener('click', () => {
    changeThemeEvent(svgImg);
  })

  changeThemeBtn.appendChild(svgImg);
  themeChangeWrapper.appendChild(changeThemeBtn);

  return themeChangeWrapper;
}

function changeThemeEvent(svgImg) {
  const stylesheet = document.getElementById('stylesheet');
  const starBtn = document.querySelectorAll('.star__btn');
  const svgSound = document.querySelector('.sound__img');

  console.log(svgSound);
  if (stylesheet.href.includes('light')) {
    stylesheet.href = 'styles/index-dark.css';
    svgSound.src = svgSound.src.replace('light', 'dark');
    setTimeout(() => {
      svgImg.src = 'images/sun.svg';
      starBtn.forEach((el) => {
        el.src = 'images/dark-star.svg';
      })
    })
  } else {
    stylesheet.href = 'styles/index-light.css';
    svgSound.src = svgSound.src.replace('dark', 'light');
    setTimeout(() => {
      svgImg.src = 'images/moon.svg';
      starBtn.forEach((el) => {
        el.src = 'images/light-star.svg';
      })
    })
  }
}