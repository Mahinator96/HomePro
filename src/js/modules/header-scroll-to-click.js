/* 
  Структура: активный класс menu__link--active

		<nav class="menu__body">
			<ul class="menu__list">
				<li class="menu__item"><a class="menu__link" href="#about">About Us</a></li>
				<li class="menu__item"><a class="menu__link" href="#services">Services</a></li>
				<li class="menu__item"><a class="menu__link" href="">Our Blog</a></li>
				<li class="menu__item"><a class="menu__link" href="">Contact </a></li> 
			</ul>
		</nav>
*/

const headerNav = document.querySelector('.menu__list'),
anchors = headerNav.querySelectorAll("a");

const clickAnchor = (e, position) => {

	for(let anchor of anchors) {
		if (anchor.classList.contain = 'menu__link--active') {
      anchor.classList.remove('menu__link--active')
		}
	}

	e.target.classList.add('menu__link--active')
	window.scrollTo({
		left: 0,
		top: position - 100,
		behavior: 'smooth'
	})
}

for(let anchor of anchors) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

		anchor.classList.remove('menu__link--active');

    if( anchor.getAttribute("href")) {

      const blockID = anchor.getAttribute("href");
			const blockToScroll = document.querySelector(blockID);
			const positionBlockID = blockToScroll.offsetTop;
			
			anchor.addEventListener('click', clickAnchor(e, positionBlockID))
    }
  });
};