/* 
	Бесконечный скролл при достижении thresholdLastItem высоты последнего элемента

	!!!!----ДАННЫЙ ПРИМЕР РАБОТАЕТ НА ФЕЙКОВУЮ БАЗУ ДАННЫХ 'jsonplaceholder'----!!!!
*/

(function() {
	const thresholdLastItem = 0.5; 																					// При достижении 0.5 высоты последнего элемента подгружается контент
	const fetchUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=5'; // **Запрос на сервер
	const createElement = 'div';																						// Создать корточку 
	const createElementClass = 'card'; 																			// Присвоить карточке класс
	const selectorAppend = document.querySelector('body'); 									// Куда закинуть карточку

	let nextPage = 2;																												// **Переменная для работы с jsonplaceholder

	const infinityScrollCallback = ([entry], observer) => {	// Callback при достижении ${thresholdLastItem}

		if (entry.isIntersecting) { 													// Если последняя карточка стала видимой
			observer.unobserve(entry.target); 									// Снять наблюдатель

			loadPosts(nextPage++); 															// **Прибавить +1 к отображаемой странице в запросе к серверу jsonplaceholder
		}
	}

	const infinityScrollOtions = {	// Настройки для IntersectionObserver
		threshold: thresholdLastItem,
	}

	const infinityScrollObserver = new IntersectionObserver(infinityScrollCallback, infinityScrollOtions); // Создание наблюдателя

	const loadPosts = (page = 1) => { 																			// Загрузка постов 1 страницы запроса к серверу jsonplaseholder
		fetch(`${fetchUrl}&_page=${page}`) 																		// Зопрос
			.then(res => res.json())
			.then(posts => {
				posts.forEach(post => {																						// Перебор постов которые пришли от сервера
					const card = document.createElement(createElement);							// Создание обёртки карточки
					card.className = createElementClass;														// Присваение класса карточки

					// Заполнение карточки данными
					card.innerHTML = `	
						<h3>${post.id} ${post.title}</h3>
						<p>${post.body}</p>
					`;

					selectorAppend.append(card); 																		// Добавление карточки в родителя
				})

				const lastCard = document.querySelector('.card:last-child'); 			// Последняя карточка в списке

				if (lastCard) { 																									// Если есть lastCard
					infinityScrollObserver.observe(lastCard); 											// Подключить наблюдатель за ней
				}
			})
			.catch(console.error) 																							// Если есть ошибка - выводим в консоль
	} 

	loadPosts(); // Запуск
}())