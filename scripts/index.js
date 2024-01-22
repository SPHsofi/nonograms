const main = document.createElement('main');
main.className = 'main';

const headSection = document.createElement('section');
headSection.className = 'head__section section';

const gameSection = document.createElement('section');
gameSection.className = 'game__section section';

const canvas = document.createElement('canvas');
canvas.className = 'canvas';

gameSection.appendChild(canvas);

main.appendChild(headSection);
main.appendChild(gameSection);

document.body.appendChild(main);
