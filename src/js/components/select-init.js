// import 'tom-select/dist/css/tom-select.css';
import imageColor from 'components/image-color';
import 'ScssComponents/universal/tom-select.scss';
import TomSelect from 'tom-select';
import { exist } from '../utils/index';

const selectInit = () => {
	const SELECTORS = {
		wrapper: '.js-select-wrapper',
		design: '.js-select-filter-design',
		symbol: '.js-select-filter-symbol',
		print: '.js-select-filter-print',
		color: '.js-select-filter-color',
		printImg: '.construct__img_w img',
		inputDesign: '#tape_design',
		inputSymbol: '#tape_symbol',
		inputTape: '#tape_tape',
		inputColor: '#tape_color',
	};

	const CLASSNAMES = {};

	const $wrapper = document.querySelector(SELECTORS.wrapper);
	const $design = document.querySelector(SELECTORS.design);
	const $symbol = document.querySelector(SELECTORS.symbol);
	const $print = document.querySelector(SELECTORS.print);
	const $color = document.querySelector(SELECTORS.color);
	const $printImg = document.querySelector(SELECTORS.printImg);
	const $inputDesign = document.querySelector(SELECTORS.inputDesign);
	const $inputSymbol = document.querySelector(SELECTORS.inputSymbol);
	const $inputTape = document.querySelector(SELECTORS.inputTape);
	const $inputColor = document.querySelector(SELECTORS.inputColor);

	if (!exist($wrapper)) return null;

	const getSubstringFromEnd = (str) => {
		const parts = str.split('/');
		const filenameWithExtension = parts[parts.length - 1];
		const filenameParts = filenameWithExtension.split('.');
		// Исключаем последний элемент (расширение)
		filenameParts.pop();
		return filenameParts.join('.');
	};

	const initDesign = new TomSelect($design, {
		create: false,
		searchEnabled: false,
		render: {
			// eslint-disable-next-line
			option: function (data, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${data.design}">${data.text}</div>`;
			},
			// eslint-disable-next-line
			item: function (item, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${item.design}">${item.text}</div>`;
			},
		},
	});

	const initSymbol = new TomSelect($symbol, {
		create: false,
		searchEnabled: false,
		render: {
			// eslint-disable-next-line
			option: function (data, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${data.symbol}">${data.text}</div>`;
			},
			// eslint-disable-next-line
			item: function (item, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${item.symbol}">${item.text}</div>`;
			},
		},
	});

	const initPrint = new TomSelect($print, {
		create: false,
		searchEnabled: false,
		render: {
			// eslint-disable-next-line
			option: function (data, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${data.tape}" data-name="${data.title}"></div>`;
			},
			// eslint-disable-next-line
			item: function (item, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${item.tape}" data-name="${item.title}"></div>`;
			},
		},
	});

	const initColor = new TomSelect($color, {
		create: false,
		searchEnabled: false,
		render: {
			// eslint-disable-next-line
			option: function (data, escape) {
				// eslint-disable-next-line
				return `<div class="search_bar__select_option_item" style="background-color: ${data.color}"><div class="search_bar__select_color  ></div></div>`;
			},
			// eslint-disable-next-line
			item: function (data, escape) {
				// eslint-disable-next-line
				return `<div class="search_bar__select_option_item" style="background-color: ${data.color}"><div class="search_bar__select_color"  ></div></div>`;
			},
		},
	});

	initColor.on('change', (value) => {
		imageColor('.construct__img_print', initDesign.getValue(), value);
		imageColor('.construct__img_symbol', initSymbol.getValue(), value);
		$inputColor.value = value;
	});

	initDesign.on('change', (value) => {
		imageColor('.construct__img_print', initDesign.getValue(), initColor.getValue());
		imageColor('.construct__img_symbol', initSymbol.getValue(), initColor.getValue());
		$inputDesign.value = getSubstringFromEnd(value);
	});

	initSymbol.on('change', (value) => {
		imageColor('.construct__img_print', initDesign.getValue(), initColor.getValue());
		imageColor('.construct__img_symbol', initSymbol.getValue(), initColor.getValue());
		$inputSymbol.value = getSubstringFromEnd(value);
	});

	initPrint.on('change', (value) => {
		// eslint-disable-next-line
		$printImg.src = value;
		$inputTape.value = getSubstringFromEnd(value);
	});

	initPrint.on('initialize', (value) => {
		// eslint-disable-next-line
		$printImg.src = initPrint.getValue();
	});

	imageColor('.construct__img_symbol', initSymbol.getValue(), initColor.getValue());
	imageColor('.construct__img_print', initDesign.getValue(), initColor.getValue());

	return null;
};

export default selectInit;
