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
	window.scrollTo({
		left: 0,
		top: position - 100,
		behavior: 'smooth'
	})
}

for(let anchor of anchors) {
  anchor.addEventListener("click", (e) => {
    if( anchor.getAttribute("href")) {

      const blockID = anchor.getAttribute("href");
			const blockToScroll = document.querySelector(blockID);
			const positionBlockID = blockToScroll.offsetTop;
			
			anchor.addEventListener('click', clickAnchor(e, positionBlockID))
    }
  });
};


/* --------------------------------------------------- */
const breakPointNav = [];
const heightContent = [];

for (let i = 0; i < anchors.length - 1; i++) {

	if( anchors[i].getAttribute("href")) {

		const blockIDWheel = anchors[i].getAttribute("href");
		const blockToScrollWheel = document.querySelector(blockIDWheel);
		const positionBlockIDWheel = blockToScrollWheel.offsetTop;

		const posBottom = blockToScrollWheel.offsetHeight;

		breakPointNav.push(positionBlockIDWheel);
		heightContent.push(posBottom);
	}
}

console.log(heightContent);


document.addEventListener('scroll', () => {
	const scrollTopValue = document.documentElement.scrollTop;
	const scrollTopInt = scrollTopValue + 100;

	// console.log(scrollTopValue);

	for (let i = 0; i < breakPointNav.length; i++) {
		if (scrollTopInt >= +breakPointNav[i] - 5) {
			anchors[i].classList.add('menu__link--active');
		}
		if (scrollTopInt > +breakPointNav[i] + +heightContent[i] - 20) {
			anchors[i].classList.remove('menu__link--active');
		}
		if (scrollTopInt < +breakPointNav[i] - 20) {
			anchors[i].classList.remove('menu__link--active');
		}
	}
})


