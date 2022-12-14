const setFillStyle: Command<{ colorStyle: string }> = (node, { colorStyle }) => {
	if ('absoluteTransform' in node) {
		figma.notify('setFillStyle not implemented');
	}
};
const setStrokeStyle: Command<{ colorStyle: string }> = (node, { colorStyle }) => {
	if ('absoluteTransform' in node) {
		figma.notify('setStrokeStyle not implemented');
	}
};
const setTextStyle: Command<{ textStyle: string }> = (node, { textStyle }) => {
	if ('absoluteTransform' in node) {
		figma.notify('setTextStyle not implemented');
	}
};
const setEffectStyle: Command<{ effectStyle: string }> = (node, { effectStyle }) => {
	if ('absoluteTransform' in node) {
		figma.notify('setEffectStyle not implemented');
	}
};
const setGridStyle: Command<{ gridStyle: string }> = (node, { gridStyle }) => {
	if ('absoluteTransform' in node) {
		figma.notify('setGridStyle not implemented');
	}
};

export const setStyleSuggestionsMap: SuggestionsMap = {
	colorStyle: undefined,
	textStyle: undefined,
	effectStyle: undefined,
	gridStyle: undefined,
}

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
