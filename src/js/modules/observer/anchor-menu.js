/* 
	Пеерключене активного элемента навигации меню происходит при достижения ${sectionThrashold} видимости элемента

	Структура:
		Ссылки-якоря - <a href="#top" class="menu-item" data-anchor-link>Top</a>
		Секции-якоря - <div id="top" class="section" data-anchor></div>
*/

(function() {

	const anchorSection = '[data-anchor]'; 							        // Секции-якоря
	const anchorLink = '[data-anchor-link]';										// Ссылки-якоря
	
	const activeClass = 'active';																// Активный класс ссылки-якоря
	const classMenuItem = '.menu__link'; 												// Класс ссылки-якоря
	
	const sectionThrashold = [0.4, 0.8]; 									      // Видимость элемента при которой срабатывает anchorMenuCollback
	const rootSectionMargin = '';
	
	const sections = document.querySelectorAll(anchorSection); 	// Все секции-якоря
	const links = document.querySelectorAll(anchorLink);				// Все ссылки-якоря
	
	const anchorMenuCollback = (entries) => { 																							 // Callback при триггере
		entries.forEach(entry => {																														 // Перебор секций
			const activeId = entry.target.id;																										 // id текущего блока
			const activeLink = document.querySelector(`a${classMenuItem}[href="#${activeId}"`);	 // ссылка-якорь текущего id блока

			if (entry.isIntersecting && (entry.intersectionRatio >= sectionThrashold[0] || entry.intersectionRatio <= sectionThrashold[1]) ) { 												// Если секция видна и она видна больше чем на 50%
				// links.forEach(link => link.classList.remove(activeClass));  												// Убрать у всех ссылок-якорей
				const linksActive = document.querySelectorAll(`${classMenuItem}.${activeClass}`);

				if (linksActive.length > 0) {
					linksActive[0].classList.remove(`${activeClass}`)
				}
	
	
				if (activeLink) { 																																	// Если activeLink существует
					activeLink.classList.add(activeClass); 																						// Добавить ей ${activeClass}
				}
			} else {
				if (activeLink) { 																																	// Если activeLink существует
					activeLink.classList.remove(activeClass); 																				// Убрать у неё ${activeClass}
				}
			};
		})
	}
	
	const anchorMenuOption = { 						// Настройки 
		threshold: sectionThrashold,				// Срабатывает anchorMenuCollback при 20%, 50%, 80% видимости элемента
		rootMargin: rootSectionMargin,
	}
	
	const sectionObserver = new IntersectionObserver(anchorMenuCollback, anchorMenuOption);		// Создание наблюдателя
	
	sections.forEach(section => sectionObserver.observe(section));														// Навешивание Observer на перебираемые элементы
}());