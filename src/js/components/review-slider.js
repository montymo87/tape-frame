import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { buildSwiper, removeSwiper } from './build-swiper';

const CLASS_NAMES = {
	slider: '.js-preview-slider',
	wrapper: '.js-preview-slider-w',
	arrowNext: '.js-slider-navigation-next',
	arrowPrev: '.js-slider-navigation-prev',
	pagination: '.js-slider-dots',
};

const reviewSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);

	if (!$sliderWrappers.length) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);
		const $pagination = $wrapper.querySelector(CLASS_NAMES.pagination);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			modules: [Navigation, FreeMode, Pagination, EffectFade],
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 800,
			navigation: {
				prevEl: $prevArrow,
				nextEl: $nextArrow,
			},
			pagination: {
				el: $pagination,
				type: 'bullets',
				clickable: true,
			},
		});
	});
};

export default reviewSlider;
