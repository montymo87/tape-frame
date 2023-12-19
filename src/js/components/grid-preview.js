import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const gridPreview = () => {
	Fancybox.bind('.js-grid-gallery', {});

	Fancybox.bind('[data-fancybox="single"]', {
		groupAttr: false,
	});
};

export default gridPreview;
