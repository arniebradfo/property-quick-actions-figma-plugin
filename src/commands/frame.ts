import { validateXY } from '../utils';

const framePositionXY: Command<{ xy: string }> = (node, { xy }) => {
	if ('x' in node) {
		const [x, y] = xy
			.replace(',', '')
			.split(' ')
			.map((s) => parseFloat(s));
		if (x) node.x = x;
		if (y) node.y = y;
	}
};
const frameSizeHeightWidth: Command<{ xy: string }> = (node, { xy }) => {
	if ('resize' in node) {
		const [w = node.width, h = node.height] = xy
			.replace(',', '')
			.split(' ')
			.map((s) => parseFloat(s));
		node.resize(w, h);
	}
};
const frameRotation: Command<{ degrees: string }> = (node, { degrees }) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameRotation not implemented');
	}
};
const frameCornerRadius: Command<{ radius: string }> = (node, { radius }) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameCornerRadius not implemented');
	}
};

const resizingSuggestions = ['Fixed', 'Hug', 'Fill'] as const;
type ResizingSuggestions = typeof resizingSuggestions[number];

const frameHorizontalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameHorizontalResizing not implemented');
	}
};

const frameVerticalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameVerticalResizing not implemented');
	}
};

const frameClipContentToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameClipContentToggle not implemented');
	}
};
const frameConstrainProportionsToggle: Command = (node) => {
	if ('constrainProportions' in node) {
		node.constrainProportions = !node.constrainProportions;
	}
};
const frameAbsolutePositionToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		figma.notify('frameAbsolutePositionToggle not implemented');
	}
};

export const frameSuggestionsMap: SuggestionsMap = {
	xy: validateXY,
	degrees: undefined,
	radius: undefined,
	resizing: resizingSuggestions,
};

export const frameCommandMap = {
	framePositionXY,
	frameSizeHeightWidth,
	frameRotation,
	frameCornerRadius,
	frameHorizontalResizing,
	frameVerticalResizing,
	frameClipContentToggle,
	frameConstrainProportionsToggle,
	frameAbsolutePositionToggle,
};
