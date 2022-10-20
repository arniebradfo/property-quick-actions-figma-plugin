import { toScreamingSnakeCase } from '../utils';

const scrollingModeSuggestions = ['Horizontal', 'Vertical', 'Both', 'None'] as const;
type ScrollingModeSuggestions = typeof scrollingModeSuggestions[number];

const overflowScrolling: Command<{ scrollingMode: ScrollingModeSuggestions }> = (node, { scrollingMode }) => {
	if ('overflowDirection' in node) {
		node.overflowDirection = toScreamingSnakeCase(scrollingMode) as OverflowDirection;
	}
};

const blendModeSuggestions = [
	'Pass through',
	'Normal',
	//---
	'Darken',
	'Multiply',
	'Linear burn', // non UI
	'Color burn',
	//---
	'Lighten',
	'Screen',
	'Linear dodge', // non UI
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
	if ('blendMode' in node) {
		node.blendMode = toScreamingSnakeCase(blendMode) as BlendMode;
	}
};

const scaleModeSuggestions = ['Fill', 'Fit', 'Crop', 'Tile'] as const;
type ScaleModeSuggestions = typeof scaleModeSuggestions[number];
type ScaleMode = ImagePaint['scaleMode'];

const imageScaleMode: Command<{ scaleMode: ScaleModeSuggestions }> = (node, { scaleMode }) => {
	if ('fills' in node) {
		const fills = [...(node.fills as Paint[])].map((fill) => {
			if (fill.type !== 'IMAGE') return fill; // TODO: or 'VIDEO'?
			return {
				...fill,
				scaleMode: toScreamingSnakeCase(scaleMode) as ScaleMode,
			};
		});
		node.fills = fills;
	}
};

const textResizingModeSuggestions = ['Auto', 'Auto height', 'Fixed size', 'Truncate text'] as const;
type TextResizingModeSuggestions = typeof textResizingModeSuggestions[number];
type TextResizingMode = TextNode['textAutoResize'];
const textResizingModeMap: Record<TextResizingModeSuggestions, TextResizingMode> = {
	'Fixed size': 'NONE',
	'Truncate text': 'TRUNCATE',
	Auto: 'HEIGHT',
	'Auto height': 'WIDTH_AND_HEIGHT',
};

const textResizing: Command<{ textResizingMode: TextResizingModeSuggestions }> = (node, { textResizingMode }) => {
	if ('textAutoResize' in node) {
		// TODO: Cannot write to node with unloaded font: figma.loadFontAsync()
		node.textAutoResize = textResizingModeMap[textResizingMode];
	}
};
/*
		{
			"name": "Text Resizing",
			"command": "textResizing",
			"parameters": [{ "name": "...", "key": "textResizingMode" }]
		},
*/

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
