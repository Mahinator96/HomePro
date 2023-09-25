/* 
Структура:
	
*/

const burger = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');


burger.addEventListener('click', () => {
	burger.classList.toggle('menu-open');
	menuBody.classList.toggle('menu-open');
})