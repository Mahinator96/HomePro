/* 
	Автовоспроизведение и постановка на паузу видео происходит если viewport достиг ${topThreshold} или ${bottomThreshold} высоты видео

	ОБЯЗАТЕЛЬНЫЙ АТТРИБУТЫ:
		muted -чтобы видео автовоспроизводилось без пользователя
		data-load='true' - не даёт воспроизводить видео если страница была обнавлена ниже видео

	Структура: 
			<video
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
				muted
        controls
				data-load="true"
      ></video>
*/
(function() {
	const topThreshold = 0.2;
	const bottomThreshold = 0.8
	
	const videoObserverCallback = (entries) => { 												// Callback при достижении элемента
		entries.forEach(entry => { 																				// Если элемент становится видимым
			
		/* Расскоментировать если видео должно останавливаться на тригерах только если пользователь включал видео */
			// if (entry.target.currentTime === 0) return 											// Если пользователь не запускал видео - ничего не делать
			
			// if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) { 	// Если элемент не виден ИЛИ элемент виден на 20% своей высоты
			// 	entry.target.play();																						// Поставить на паузу
			// } else {
			// 	entry.target.pause();																						// Иначе воспроизводим видео
			// }
	
		/* Автовоспроизвадить и ставить на паузу видео на триггерах высоты элемента 20% и 80%  */
			
			if ((entry.isIntersecting || entry.intersectionRatio >= 0.2 || (entry.target.currentTime === 0))) { 	// Если элемент не виден ИЛИ элемент виден на 20% своей высоты
				entry.target.play();																																							// Поставить на паузу
			} else {
				entry.target.pause();																																							// Иначе воспроизводим видео
			}
	
			if ((!entry.isIntersecting || entry.intersectionRatio <= 0.2) && !entry.target.getAttribute.load) {
				entry.target.pause();			
			}
		})
	};
	
	const videoObserverOption = { // Настройки 
		threshold: [topThreshold, bottomThreshold], 			// С учётом rootMargin запустить Callback при достижении 20% и 80% высоты элемента
	};
	
	
	const videoObserver = new IntersectionObserver(videoObserverCallback, videoObserverOption); // Создание наблюдателя
	
	document.querySelectorAll('video').forEach(video => videoObserver.observe(video)); // Навешивание Observer на перебираемые элементы
}())