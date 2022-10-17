const scrollingModeSuggestions = ['Horizontal', 'Vertical', 'Both', 'None'] as const;
type ScrollingModeSuggestions = typeof scrollingModeSuggestions[number];

const overflowScrolling: Command<{ scrollingMode: ScrollingModeSuggestions }> = (node, { scrollingMode }) => {
	if ('absoluteTransform' in node) {
		console.log('overflowScrolling not implemented');
	}
};

const blendModeSuggestions = [
	'Pass through',
	'Normal',
	//---
	'Darken',
	'Multiply',
	'Color burn',
	//---
	'Lighten',
	'Screen',
	'Color dodge',
	//---
	'Overlay',
	'Soft light',
	'Hard light',
	//---
	'Difference',
	'Exclusion',
	//---
	'Hue',
	'Saturation',
	'Color',
	'Luminosity',
] as const;
type BlendModeSuggestions = typeof blendModeSuggestions[number];

const layerBlendMode: Command<{ blendMode: BlendModeSuggestions }> = (node, { blendMode }) => {
	if ('absoluteTransform' in node) {
		console.log('layerBlendMode not implemented');
	}
};

const scaleModeSuggestions = ['Fill', 'Fit', 'Crop', 'Tile'] as const;
type ScaleModeSuggestions = typeof scaleModeSuggestions[number];

const imageScaleMode: Command<{ scaleMode: ScaleModeSuggestions }> = (node, { scaleMode }) => {
	if ('absoluteTransform' in node) {
		console.log('imageScaleMode not implemented');
	}
};

const textResizingModeSuggestions = ['Auto', 'Auto height', 'Fixed size', 'Truncate text'] as const;
type TextResizingModeSuggestions = typeof textResizingModeSuggestions[number];

const textResizing: Command<{ textResizingMode: TextResizingModeSuggestions }> = (node, { textResizingMode }) => {
	if ('absoluteTransform' in node) {
		console.log('textResizing not implemented');
	}
};

export const extrasSuggestionsMap: SuggestionsMap = {
	scrollingMode: scrollingModeSuggestions,
	blendMode: blendModeSuggestions,
	scaleMode: scaleModeSuggestions,
	textResizingMode: textResizingModeSuggestions,
};

export const extrasCommandMap = {
	overflowScrolling,
	layerBlendMode,
	imageScaleMode,
	textResizing,
};
