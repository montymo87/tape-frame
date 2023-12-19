import IMask from 'imask';
import { exist } from '../utils';

const formMask = () => {
	const SELECTORS = {
		phone: '.js-mask-phone',
	};

	const CLASSNAMES = {};

	const $phone = document.querySelectorAll(SELECTORS.phone);

	if (!exist($phone)) return;

	const maskOptions = {
		mask: '+{7}(000)000-00-00',
	};

	$phone.forEach((item) => {
		let mask = IMask(item, maskOptions);
	});
};

export default formMask;
