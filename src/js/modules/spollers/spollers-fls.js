'use strict';
/* 
	Для родителя спойлеров пишем оттрибут data-spollers
	Для заголовков спойлеров пишем оттрибут data-spoller
	Если нужно включать\выключать работу спойлеров на разных размерах экранов пишем параметры ширины и типа брейкпоинта.
	Например: 
	data-spollers="992,max"
	data-spollers="768,min"

	Если нужно, чтобы в блоке открывался только один спойлер добавляем атриьут data-one-spoller

	Структура: 
		<div data-spollers data-one-spoller">
      <div class="block__item">
        <button tabindex="-1" type="button" class="block__title" data-spoller>Загловок спойлера</button>
        <div class="block__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, sed? Porro expedita deserunt, omnis tenetur, quaerat quae adipisci numquam consequatur quod a dolore quam animi molestias facere, tempora quibusdam provident eligendi voluptatum harum libero necessitatibus? Accusamus consectetur deserunt maiores inventore.</div>
      </div>
    </div>

*/

const spollersArray = document.querySelectorAll('[data-spollers]');
const spollerDuration = 500; // Скорость анимации

if (spollersArray.length > 0) {
  // Получение обычных спойлеров
  // Получаем массив обычных спойлеров, т.к. изначально у нас коллекция
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    // Возвращет элемент без 'dataset', или элемент у которого в 'dataset' первый элемент отсутствует
    return !item.dataset.spollers.split(',')[0]; 
  });
  // Инициализация обычных спойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Получение спойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0];
  });
  // Инициализация спойлеров с медиа запросами

  if (spollersMedia.length > 0) {
    // Массив  объектов которые будут содержать информацию о самом объекте, его brekpoint и min-mox
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      // Получает строку с параметрами для каждого объекта
      const params = item.dataset.spollers;
      const breakpoint = {};
      // Преобразуем массив в строку
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные breakpoint (Если повторяются условия в разных блоках)
    let mediaQueries = breakpointsArray.map(function(item) {
      // Возвращаем: win-width: 650px, 650, min
      // return `(${item.type}-width: ${item.value}px, ${item.value}, ${item.type}`;
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    // Присваиваем уникальный индекс
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работа с каждым breakpoint
    mediaQueries.forEach(breakpoint => {
      // Создаём из строки - массив
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      // Метод, который "слушает ширину экрана" и отрабатывает в случае если сработал тот или иной breakpoint
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с каждым breakpoint
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });

      // Событие 
      matchMedia.addListener(function() {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }

  // Инициализация 
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      // Если matchMedia есть - присваиваем имя объкта 
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      // Если breakpoint сработал ИЛИ нет указаний по media запросу (обычные спойлеры)
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }

  // Работа с контентом 
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false; 
        }
      });
    }
  }

  // При клике на заголовок
  function setSpollerAction(e) {
    const el = e.target;
		let spollerItem;

		if (el.parentNode.classList.contains('spollers__item')) {
			spollerItem = el.parentNode;
		}
    // Если у самого элемента есть дата-атрибут или у ближайшего родителя (Если в кнопке есть какой-либо элемент)
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      // Кнопка
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      // Родительский блок
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      // Если должен должен открываться только один спойлер
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
      // Если нет внутри элементов с классом slide
      if (!spollersBlock.querySelectorAll('._slide').length) {
        // Если есть дата-атрибут и нет класса active
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          // Все остальные спойлеры скрыть
          hideSpollerBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
				spollerItem.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, spollerDuration);
      }
      e.preventDefault();
    }
  }
  function hideSpollerBody(spollersBlock) {
		
		let spollerItem;

		if (spollersBlock.querySelector('.spollers__item._active')) {
			spollerItem = spollersBlock.querySelector('.spollers__item._active');
		}

    // Активный открытый спойлер
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      // Убираем класс 
      spollerActiveTitle.classList.remove('_active');
      spollerItem.classList.remove('_active');

			console.log(spollerItem);
      // Скрываем все элементы
      _slideUp(spollerActiveTitle.nextElementSibling, spollerDuration);
    }
  }
} 

let _slideUp = (target, duration = spollerDuration) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
let _slideDown = (target, duration = spollerDuration) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
let _slideToggle = (target, duration = spollerDuration) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};