export function changeTheme() {
  const themeChangeWrapper = document.createElement('div');
  themeChangeWrapper.className = 'theme-wrapper';

  const changeThemeBtn = document.createElement('button');
  changeThemeBtn.className = 'theme__btn';

  const svgImg = document.createElement('img');
  svgImg.src = 'images/moon.svg';
  svgImg.className = 'moon__svg';

  changeThemeBtn.addEventListener('click', () => {
    const stylesheet = document.getElementById('stylesheet');
    const starBtn = document.querySelectorAll('.star__btn');

    if (stylesheet.href.includes('light')) {
      stylesheet.href = 'styles/index-dark.css';
      setTimeout(() => {
        svgImg.src = 'images/sun.svg';
        starBtn.forEach((el) => {
          el.src = 'images/dark-star.svg';
        })
      })
    } else {
      stylesheet.href = 'styles/index-light.css';
      setTimeout(() => {
        svgImg.src = 'images/moon.svg';
        starBtn.forEach((el) => {
          el.src = 'images/light-star.svg';
        })
      })
    }
  })

  changeThemeBtn.appendChild(svgImg);

  themeChangeWrapper.appendChild(changeThemeBtn);

  return themeChangeWrapper;
}