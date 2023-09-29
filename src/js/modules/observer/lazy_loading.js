/* 
	Автозагрузка (lazy-loading) происходит при достижения viewport + ${topRootMargin} до элемета

	ОБЯЗАТЕЛЬНЫЙ АТТРИБУТ: 
		data-srcimage='' - здесь храниться путь до картинки и по нему идёт перебор элементов;

	Структура:
		<img
			data-srcimage='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png'
			width=''
			height=''
			alt=''
		/>
*/
(function() {
	const topRootMargin = '50px';

	const lazyLoadingObserverCallback = (entries, observer) => { // То что нужно делать при достижении элемента
		entries.forEach(entry => {
			if (entry.isIntersecting) { 														// Если элемент достигает своего триггера
				entry.target.src = entry.target.dataset.srcimage; 		// Подставить data в src (entry.target - элемент)
	
				observer.unobserve(entry.target); 										// Отключить отслеживание элемента
			}
		})
	}
	
	const lazyLoadingObserverOption = { 					// Настройки 
		rootMargin: `${topRootMargin} 0px 0px 0px`,	// Задать триггеры (заданы в px и работают как margin) на которых будет срабатыывать callback
	}
	
	const imageObserver = new IntersectionObserver(lazyLoadingObserverCallback, lazyLoadingObserverOption); // Создание наблюдателя
	
	document.querySelectorAll('[data-srcimage]').forEach(image => imageObserver.observe(image)); 						// Навешивание Observer на перебираемые элементы
}())
