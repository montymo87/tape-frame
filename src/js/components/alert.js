import succes from './succes';
import failed from './failed';

const alert = () => {
	const wpcf7Elms = document.querySelectorAll('.wpcf7');
	const getPopup = document.querySelector('.js-popup-contact');
	const body = document.querySelector('.body');
	// eslint-disable-next-line
	Array.from(wpcf7Elms, (wpcf7Elm) => {
		wpcf7Elm.addEventListener(
			'wpcf7mailsent',
			// eslint-disable-next-line
			function (event) {
				succes('.success');
				const popupForm = document.querySelector('.popup.popup--open_state');
				if (popupForm) {
					popupForm.classList.remove('active');
					getPopup.classList.remove('popup--open_state');
					body.classList.remove('body--popup_open');
				}
			},
			false,
		);

		wpcf7Elm.addEventListener(
			'wpcf7invalid',
			// eslint-disable-next-line
			function (event) {
				failed('.failed');
				const popupForm = document.querySelector('.popup.popup--open_state');
				if (popupForm) {
					popupForm.classList.remove('active');
				}
			},
			false,
		);
	});
};

export default alert;
