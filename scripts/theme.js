export function changeTheme() {
  window.theme = 'light';

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

  if (stylesheet.href.includes('light')) {
    window.theme = 'dark';
    stylesheet.href = 'styles/index-dark.css';
    setTimeout(() => {
      svgImg.src = 'images/sun.svg';
      starBtn.forEach((el) => {
        el.src = 'images/dark-star.svg';
      })
    })
  } else {
    window.theme = 'light';
    stylesheet.href = 'styles/index-light.css';
    setTimeout(() => {
      svgImg.src = 'images/moon.svg';
      starBtn.forEach((el) => {
        el.src = 'images/light-star.svg';
      })
    })
  }
}