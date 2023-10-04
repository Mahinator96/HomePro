/*  
  Функция вызывается с аргументами:
		items - коллекция элементов которые нужно обрезать (записывается как ".item-blog__text p")
		num - по какой символ обрезать (включая пробелы)
*/

const textSubstring = (items, num) => {
  const blogTexts = document.querySelectorAll(items);

	for (let i = 0; i < blogTexts.length; i++) {
		const textContent = blogTexts[i].textContent;
		const textContentSubstring = textContent.substring(0, num);

		blogTexts[i].textContent = textContentSubstring + '...';
	} 
}

/* Пример */
if (document.querySelectorAll('.item-blog__text p')) {
	textSubstring('.item-blog__text p', 146);
}