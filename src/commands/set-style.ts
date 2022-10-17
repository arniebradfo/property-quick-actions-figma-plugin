const setFillStyle: Command<{ colorStyle: 'string' }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('setFillStyle not implemented');
	}
};
const setStrokeStyle: Command<{ colorStyle: 'string' }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('setStrokeStyle not implemented');
	}
};
const setTextStyle: Command<{ textStyle: 'string' }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('setTextStyle not implemented');
	}
};
const setEffectStyle: Command<{ effectStyle: 'string' }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('setEffectStyle not implemented');
	}
};
const setGridStyle: Command<{ colorStyle: 'gridStyle' }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('setGridStyle not implemented');
	}
};

export const setStyleCommandMap = {
	setFillStyle,
	setStrokeStyle,
	setTextStyle,
	setEffectStyle,
	setGridStyle,
};

/*
		{
			"name": "Set Style",
			"menu": [
				{ "name": "Fill", "command": "setFillStyle", "parameters": { "name": "", "key": "colorStyle" } },
				{ "name": "Stroke", "command": "setStrokeStyle", "parameters": { "name": "", "key": "colorStyle" } },
				{ "name": "Text", "command": "setTextStyle", "parameters": { "name": "", "key": "textStyle" } },
				{ "name": "Effect", "command": "setEffectStyle", "parameters": { "name": "", "key": "effectStyle" } },
				{ "name": "Grid", "command": "setGridStyle", "parameters": { "name": "", "key": "gridStyle" } },
				{ "separator": true },
				{ "name": "Any", "command": "setAnyStyle", "parameters": { "name": "", "key": "anyStyle" } }
			]
		},
*/
