/* 
	Динамический адаптив - перемещение элементов при адаптиве в другой блок (с сохранением порядка перемещения) и возврата его в первоначальное положение;
	Для динамического адаптива перемещаемому элементу неообходимо задать атрибут data-da
	Атрибут data-da принимает в себя:
		3 аргумента "${selector}, ${order}, ${breakpoint}"
		6 аргументов (дублируются) - для двух перемещений  "${selector}, ${order}, ${breakpoint}, ${selector}, ${order}, ${breakpoint}"
			${selector} 	- элемент в который нужно переместь (.content__column_garden) (!Записывается с указанием селектора: . ,или # ,...)
			${order} 			- перед каким дочерним элементом у ${selector} вставить перемещаемый элемент
			${breakpoint} - медиа-запрос когда сработает перемещение
	
	Например: data-da=".content__column_garden, 2, 980"
	Например: data-da=".content__column_garden, 2, 980, .content__column_river, 2, 500"
*/

let arrayDataDa = document.querySelectorAll('[data-da]'); 											// коллекция объектов с data-da

arrayDataDa.forEach(function (e) {
	const media = 'max'; 																															// изменить на min если MobileFirst

  const dataItem = e.dataset.da.split(','); 																				// массив data-da параметров
  const addressMove = document.querySelector(dataItem[0]);  												// объект куда перемещать, первый breakpoint
  const addressMoveDuble = document.querySelector(dataItem[3]);  										// объект куда перемещать, второй breakpoint
  const numberOrder = dataItem[1]; 																									// порядковый номер на новом месте относительно дочерних элементов, первый breakpoint
  const numberOrderDuble = dataItem[4]; 																						// порядковый номер на новом месте относительно дочерних элементов, второй breakpoint
  const addressParent = e.parentElement; 																						// родитель где находился перемещаемый объект, до breakpoint
  const addressParentArray = addressParent.children; 																// коллекция дочерних элементов родителя начального положения, до breakpoint
	const mediaQuery = window.matchMedia(`(${media}-width: ${dataItem[2]}px)`); 			// данные медиа-запроса ( breakpoint 1 ) 
	const mediaQueryDuble = window.matchMedia(`(${media}-width: ${dataItem[5]}px)`); 	// данные медиа-запроса  ( breakpoint 2)

	// присвоение атрибута с порядковым номером для контроля последовательности первоначального положения
	for (let i = 0; i < addressParentArray.length; i++) {						
		if (!addressParentArray[i].dataset.n) { 									// если нет data-n у коллекции (что бы не было багов с повторным присвоением при наличии более одного перемещаемого объекта)
				addressParentArray[i].setAttribute('data-n', `${i}`)	// задаём data-n исходя из перебора 
		}
	};

	const eDataNumber = e.dataset.n;	// data-n перемещаемого объекта

    /* ---------------- перемещение объекта -------------------------*/
    /* !!!!!!!!!!!!!!!!!!!! ПЕРВЫЙ  breakpoint !!!!!!!!!!!!!!!!!!!!!*/

    const startСhange = () => {
      if (mediaQuery.matches) {																							// проверка на соответсвие @media
							
				if (numberOrder.trim() === 'last') {
					addressMove.insertBefore(e, addressMove.children[addressMove.children.length]);
				}	else if (numberOrder.trim() === 'first') {
					addressMove.insertBefore(e, addressMove.children[0]);
				}	else {
					addressMove.insertBefore(e, addressMove.children[numberOrder]);		// перемещаемый элемент (e) вставляем в addressMove перед его дочерним элементом под индексом numberOrder
				}
			} else if (addressParentArray.length > 0) { 													// если у родителя перемещаемого элемента были ещё дочерние элементы (кроме перемещаемого)
         for (let z = 0; z < addressParentArray.length; z++)  { 						// перебираем дочерние элементы коллекции
					
            if (addressParentArray[z].dataset.n > eDataNumber) {						// если у перебираемого элемента коллекции data-n больше чем у перемещаемого элемента  
                addressParent.insertBefore(e, addressParentArray[z]);				// вставить перебираемый элемент перед его же индексом (перед собой) в addressParent
								break;		
            } else {
							addressParent.append(e);  																		// иначе в addressParent вернуть перемещамый элемент
						}
          }
      } else {
        addressParent.append(e);  																					// иначе в addressParent вернуть перемещамый элемент
			};
		};
		startСhange();	// вызов функции для инициализации перемещений при запуске ( breakpoint 1)


   	/* вызов функции при срабатывании 1 медиа-запроса */
    mediaQuery.addEventListener('change', function (u) {
      startСhange();
    })

		/* !!!!!!!!!!!!!!!!!!!! ВТОРОЙ  breakpoint !!!!!!!!!!!!!!!!!!!!!*/

    const startСhangeDuble = () => {																											
      if (mediaQueryDuble.matches) {																											// проверка на соответсвие @media	
				if (numberOrderDuble.trim() === 'last') {
					addressMoveDuble.insertBefore(e, addressMoveDuble.children[addressMoveDuble.children.length]);
				}	else if (numberOrderDuble.trim() === 'first') {
					addressMoveDuble.insertBefore(e, addressMoveDuble.children[0]);
				}	else {
					addressMoveDuble.insertBefore(e, addressMoveDuble.children[numberOrderDuble]);	// перемещаемый элемент (e) вставляем в addressMoveDuble перед его дочерним элементом под индексом numberOrderDuble
				}
			} else {
          startСhange();
      }
    }
		startСhangeDuble();	// вызов функции для инициализации перемещений при запуске ( breakpoint 2)


		/* вызов функции при срабатывании 2 медиа-запроса */
		mediaQueryDuble.addEventListener('change', function (u) {
			startСhangeDuble();
		})
});