import { onWindowScroll, exist, getWindowSize } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.header',
		menuTrigger: '.js-header-menu-trigger',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		headerScrollPos: 'header--pos_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);

	let isMenuOpen = false;
	let prevScrollPos = window.scrollY;
	let posDiff = 0;
	let saveZone;

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (windowScrollTop) => {
		if (windowScrollTop > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (windowScrollTop <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		if (prevScrollPos < window.scrollY) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
		} else {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		}

		if (getWindowSize().windowWidth > 1024) {
			saveZone = 50;
		} else {
			saveZone = 10;
		}

		if (window.scrollY === 0) {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		} else if (prevScrollPos < window.scrollY) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
		} else if (prevScrollPos > window.scrollY) {
			posDiff = prevScrollPos - window.scrollY > saveZone;
			setTimeout(() => {
				if (posDiff) $header.classList.remove(CLASSNAMES.headerScrollPos);
			}, 10);
		}

		prevScrollPos = window.scrollY;
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);

	if (!exist($menuTriggers)) return;

	$menuTriggers.forEach(($trigger) => {
		$trigger.addEventListener('click', () => {
			handleTriggerClick();
		});
	});
};

export default header;
