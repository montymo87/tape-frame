import gridPreview from 'components/grid-preview';
import reviewSlider from 'components/review-slider';
import initPopup from 'components/init-popup';
// import fade from 'components/fade';
// import fade2 from 'components/fade2';
// import heroAnimation from 'components/hero-animation';
import formMask from 'components/form-mask';
import alert from 'components/alert';
import selectInit from 'components/select-init';
// import imageColor from 'components/image-color';

import layout from 'layout/layout';
import { pageLoad } from './utils';

export default class App {
	constructor() {
		this.$htmlTag = document.querySelector('html');
		this.pageName =
			this.$htmlTag.dataset.templateName && this.$htmlTag.dataset.templateName.length > 0
				? this.$htmlTag.dataset.templateName
				: null;

		this.init = this.init.bind(this);
		this.init();
	}

	importPage() {
		if (this.pageName && this.pageName !== null) {
			import(`./pages/${this.pageName}`)
				.then(({ default: pageFunc }) => {
					const newPage = pageFunc();
				})

				.catch((error) => {
					console.error('Failed to load page, check data-template-name at root if correct');

					console.dir(error, error.stack);
				});
		}
	}

	init() {
		const initLayout = layout();
		pageLoad(() => {
			document.body.classList.add('body--loaded');
			selectInit();
			gridPreview();
			reviewSlider();
			initPopup('.js-popup-contact-trigger', '.js-popup-contact');
			// fade();
			// fade2();
			// heroAnimation();
			formMask();
			alert();
			// imageColor();
		});
		setTimeout(() => {
			this.importPage();
		}, 0);
	}
}
