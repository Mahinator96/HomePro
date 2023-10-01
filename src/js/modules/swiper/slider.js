// Подключение swiper 
import Swiper from 'swiper';
// Подключение дополнительных модулей
import { Navigation, Pagination } from 'swiper/modules';
/* 
	Основные модули слайдера:
		Navigation, Pagination, Autoplay,
		EffectFade, Lazy, Manipulation
	*/

(function() {
	const classSlider = '.reviews-slider';

	const initSliders = () => { // Инициализация слайдеров
		if (document.querySelector(classSlider)) { // Проверка на наличие слайдера
			
			new Swiper(classSlider, { // Создание слайдера
				modules: [Navigation, Pagination],
				observer: true,
				observerParents: true,
				slidesPerView: 1,
				spaceBetween: 72,
				autoHeight: true,
				speed: 800,
				// spaceBetween: '72px';

				// touchRatio: 0,
				// simulateTouch: false,
				// loop: true,
				// preloadImages: false,
				// lazy: true,

				/* 
				// Еффекты 
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				*/

				
				// Пагинация
				pagination: {
					el: '.reviews__bullets',
					clickable: true,
				},			

				/* 
				// Сколлбар
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				*/

				// Кнопки влево-вправо
				navigation: {
					prevEl: '.reviews__arrow--left',
					nextEl: '.reviews__arrow--right',
				},

				/* 
				// Брейкпоинты
				breakpoints: {
					640: {
						slidesPerView: 1,
						spaceBetween: 0,
						autoHeight: true,
					},
					780: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
				*/
			});
		}
	}

	initSliders();
}())