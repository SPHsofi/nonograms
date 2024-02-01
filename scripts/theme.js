export function changeTheme() {
  const themeChangeWrapper = document.createElement('div');
  themeChangeWrapper.className = 'theme-wrapper';

  const changeThemeBtn = document.createElement('button');
  changeThemeBtn.className = 'theme__btn';

  const svgImg = document.createElement('img');
  svgImg.src = 'images/moon.svg';
  svgImg.className = 'moon__svg';

  changeThemeBtn.appendChild(svgImg);

  themeChangeWrapper.appendChild(changeThemeBtn);

  return themeChangeWrapper;
}