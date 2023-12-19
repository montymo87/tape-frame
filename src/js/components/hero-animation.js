import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../vendors/SplitText';
import { exist } from '../utils';

const heroAnimation = () => {
	gsap.registerPlugin(SplitText);
	gsap.registerPlugin(ScrollTrigger);

	const SELECTORS = {
		wrapper: '.js-hero-animation',
		title: '.js-hero-animation-title',
		titleImg: '.js-hero-animation-decor',
		descr: '.js-hero-animation-descr',
		btn: '.js-hero-animation-btn',
		img: '.js-hero-animation-img',
	};

	let mod;

	const $wrapper = document.querySelectorAll(SELECTORS.wrapper);
	// if (!exist($wrapper)) return null;

	$wrapper.forEach(($item) => {
		const $title = $item.querySelector(SELECTORS.title);
		const $titleImg = $item.querySelector(SELECTORS.titleImg);
		const $descr = $item.querySelector(SELECTORS.descr);
		const $btn = $item.querySelector(SELECTORS.btn);
		const $img = $item.querySelector(SELECTORS.img);

		const matchMedia = gsap.matchMedia();

		matchMedia.add([`(min-width: ${1024}px)`], () => {
			const tl = gsap.timeline({ ease: 'power3.out', paused: false });
			tl.pause();

			const baseLabel = '-=.1';

			tl.set($item, {
				duration: 1,
				opacity: 1,
			});

			if ($title) {
				const splitText = new SplitText($title, { type: 'words,chars' });
				// eslint-disable-next-line
				const chars = splitText.chars;

				tl.from(chars, {
					duration: 0.3,
					opacity: 0,
					y: 20,
					ease: 'power3.out',
					stagger: 0.05,
				});
			}

			if ($descr) {
				tl.from(
					$descr,
					{
						duration: 0.3,
						opacity: 0,
						y: 20,
					},
					baseLabel,
				);
			}

			if ($btn) {
				tl.from(
					$btn,
					{
						duration: 0.3,
						opacity: 0,
						y: 20,
					},
					baseLabel,
				);
			}

			if ($img) {
				tl.from(
					$img,
					{
						duration: 1,
						opacity: 0,
						x: 50,
					},
					baseLabel,
				);
			}

			tl.play();
		});
		matchMedia.add([`(max-width: ${1023}px)`], () => {});
	});

	return null;
};

export default heroAnimation;
