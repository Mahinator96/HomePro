/*
Рейтинг просто выводится

<div class="rating rating--static">
	<div class="rating__body">
		<div class="rating__active">3</div>
			<div class="rating__items">
				<input class="rating__item" type="radio" name="rating" value="1">
				<input class="rating__item" type="radio" name="rating" value="2">
				<input class="rating__item" type="radio" name="rating" value="3">
				<input class="rating__item" type="radio" name="rating" value="4">
				<input class="rating__item" type="radio" name="rating" value="5">
			</div>
		</div>
</div> 
*/

	const ratings = document.querySelectorAll('.rating'); // Получаем все звёздные рейтинги

	if(ratings.length > 0) { 	// Если звёздные рейтинги есть
		initRatings();  				// Инициализируем рейтинг
	};
	
	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
	
		for(let index = 0; index < ratings.length; index++) { 					// Перебираем все рейтинги
			const rating = ratings[index];
			initRating(rating);																						// Инициализируем каждый рейтинг
		};
	
		// Инициализация конкретного рейтинга
		function initRating(rating) {
			initRatingVars(rating); 																			// Инициализация переменных для каждого рейтинга
	
			setRatingActiveWidth(ratingActive.innerHTML); 																			// Изминение ширины активных звёзд
		};
	
		// Инициализация переменных 
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active'); 			// Получаем .rating__active
		};
	
		function setRatingActiveWidth(index) {	                        // Изминение ширины активных звёзд
			const ratingActiveWidth = index / 0.05;												// Ширина заполняемого рейтинга
			ratingActive.style.width = `${ratingActiveWidth}%`;						// Задаём ширину в css ratingValue
		};
	};