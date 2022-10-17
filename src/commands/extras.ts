const overflowScrolling: Command<{ overflowScrolling: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('overflowScrolling not implemented');
	}
};
const layerBlendMode: Command<{ blendMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('layerBlendMode not implemented');
	}
};
const imageScaleMode: Command<{ scaleMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('imageScaleMode not implemented');
	}
};
const textResizing: Command<{ textResizingMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('textResizing not implemented');
	}
};

export const extrasCommandMap = {
	overflowScrolling,
	layerBlendMode,
	imageScaleMode,
	textResizing,
};
