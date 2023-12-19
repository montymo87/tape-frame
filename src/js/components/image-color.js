import { exist } from '../utils/index';

const imageColor = (canvasEl, url, color) => {
	const SELECTORS = {
		wrapper: '.construct',
		canvas: canvasEl,
	};

	const CLASSNAMES = {};

	const $wrapper = document.querySelector(SELECTORS.wrapper);

	if (!exist($wrapper)) return;

	const canvas = document.querySelector(SELECTORS.canvas);
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
	ctx.getContextAttributes().willReadFrequently = true;

	function replaceBlackPixelsWithColor(imageUrl, hexColor) {
		// eslint-disable-next-line
		const img = new Image();

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const data = imageData.data;
			// eslint-disable-next-line
			const rgbColor = hexToRgb(hexColor);

			for (let i = 0; i < data.length; i += 4) {
				const red = data[i];
				const green = data[i + 1];
				const blue = data[i + 2];

				// Проверяем, является ли текущий пиксель черным (R, G, B - все равны 0)
				if (red === 0 && green === 0 && blue === 0) {
					// Если пиксель черный, меняем его на указанный цвет
					data[i] = rgbColor.r; // Красный
					data[i + 1] = rgbColor.g; // Зеленый
					data[i + 2] = rgbColor.b; // Синий
					// data[i + 3] не изменяется (альфа-канал)
				}
			}

			ctx.putImageData(imageData, 0, 0);
		};

		img.src = imageUrl; // Указываем URL изображения
	}

	// Функция для преобразования HEX цвета в RGB
	function hexToRgb(hex) {
		const bigint = parseInt(hex.slice(1), 16);
		// eslint-disable-next-line
		const r = (bigint >> 16) & 255;
		// eslint-disable-next-line
		const g = (bigint >> 8) & 255;
		// eslint-disable-next-line
		const b = bigint & 255;
		return { r, g, b };
	}

	// Пример использования функции
	replaceBlackPixelsWithColor(url, color);
};

export default imageColor;
