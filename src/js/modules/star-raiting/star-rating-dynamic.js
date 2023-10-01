/* 
сниппет: star

<div class="rating rating_set">
	<div class="rating__body">
		<div class="rating__active"></div>
		<div class="rating__items">
			<input class="rating__item" type="radio" name="rating" value="1">
			<input class="rating__item" type="radio" name="rating" value="2">
			<input class="rating__item" type="radio" name="rating" value="3">
			<input class="rating__item" type="radio" name="rating" value="4">
			<input class="rating__item" type="radio" name="rating" value="5">
		</div>
	</div>
	<div class="rating__value">3.6</div>
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
    initRatingVars(rating); 																			// Инициализация переменных 

    setRatingActiveWidth(); 																			// Изминение ширины активных звёзд
    
    if (rating.classList.contains('rating_set')) { 								// Если есть .rating__set
      setRating(rating);
    };
  };

  // Инициализация переменных 
  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active'); 			// Получаем .rating__active

		if (rating.querySelector('.rating__value')) {									// Если есть .rating__value
			ratingValue = rating.querySelector('.rating__value'); 			// Присваиваем переменной 
		};
  };

  function setRatingActiveWidth(index = ratingValue.innerHTML) {	// Изминение ширины активных звёзд
    const ratingActiveWidth = index / 0.05;												// Ширина заполняемого рейтинга
    ratingActive.style.width = `${ratingActiveWidth}%`;						// Задаём ширину в css ratingValue
  };
  
  // Возможность указывать оценку
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item'); // Находим все звёзды
    for ( let index = 0; index < ratingItems.length; index++) {		// Перебираем их
      const ratingItem = ratingItems[index];											// Перебираемая звезда

      // При наведении
      ratingItem.addEventListener("mouseenter", function(e) { 		// Вешаем обработчик 'mouseenter' на перебираемую звезду
        initRatingVars(rating);																		// Обновление переменных для перебираемого рейтинга
        setRatingActiveWidth(ratingItem.value);										// Обновление активных звёзд
      });

      ratingItem.addEventListener("mouseleave", function(e) {			// При уходе мышки
        setRatingActiveWidth();																		// Обновление активных звёзд
      });

      ratingItem.addEventListener('click', function(e) {					// При клике на перебираемую звезду
        initRatingVars(rating);																		// Обновление переменных

        if (rating.dataset.ajax) {																// Если есть data-ajax
          setRatingValue(ratingItem.value, rating);								// "Отправить" на сервер
        } else {
          ratingValue.innerHTML = index + 1;											// Иначе отобразить указанную оценку
          setRatingActiveWidth();																	// Обновление активных звёзд
        }
      });
    };
  };  

  async function setRatingValue(value, rating) {				// Отправка рейтинга на сервер
    if (!rating.classList.contains('rating_sending')) { // Если нет класса .rating_sending (проверка на отправление (чтобы пользователь не тыкал много раз на отправку если интернет слабый))
      rating.classList.add('rating_sending');						// Добавить класс .rating_sending

      let response = await fetch('rating.json', {				// Отправка данных (value) на сервер
        method: 'GET',

        // Отправка на реальный сервер
        // body: JSON.stringify({
          // userRating: value
        // }),
        // headers: {
          // 'content-type: 'application/json' 
        // }
      });
      if (response.ok) {																// Если запрос успешный
        const result = await response.json();
        const newRating = result.newRating;							// Получаем новый рейтинг
        
				ratingValue.innerHTML = newRating;							// Вывод нового среднего результата 

        setRatingActiveWidth();													// Обновление активных звёзд

        rating.classList.remove('rating_sending');			// Удаляем класс .rating_sending
      } else {
        alert("Ошибка");																// Иначе выводим alert

        rating.classList.remove('rating__sending');     // Удаляем класс .rating_sending
      }
    }
  }
};