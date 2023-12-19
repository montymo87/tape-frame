import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Initialize simple fade animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * Add .js-fade-el class to element that you want to fade.
 */
const fade = () => {
	const SELECTORS = {
		el: '.js-img-anim',
	};

	const $fadeEl = document.querySelectorAll(SELECTORS.el);
	if ($fadeEl.length) {
		gsap.set($fadeEl, {
			y: 30,
			opacity: 0,
		});

		ScrollTrigger.batch($fadeEl, {
			start: 'top 85%',
			once: true,
			onEnter: (batch) =>
				gsap.to(batch, {
					duration: 0.4,
					opacity: 1,
					y: 0,
					stagger: 0.3,
					ease: 'none',
				}),
		});
	}
};

export default fade;
