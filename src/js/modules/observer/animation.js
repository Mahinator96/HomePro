/* 
  Для работы анимации при появлении блока при скролле

	ОБЯЗАТЕЛЬНЫЙ параметр в HTML - 'data-anim'
		'data-anim' принимает в себя название анимации
*/

const threshHoldAnim = [0.3];
const rootMarginAnim = '0px 0px -150px 0px';	

const animBlocks = document.querySelectorAll('[data-anim]');

const animationCollback = (entries, observer) => {
	entries.forEach(entry => {
		const animBlock = entry.target;
		const nameAnim = animBlock.dataset.anim;
		
		if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
			entry.target.classList.add(nameAnim);
		}
	})
}

const animationOption = {
	threshold: threshHoldAnim,
	rootMargin: rootMarginAnim,
}


const animationObserver = new IntersectionObserver(animationCollback, animationOption);		// Создание наблюдателя
	
animBlocks.forEach(block => animationObserver.observe(block));														// Навешивание Observer на перебираемые элементы
