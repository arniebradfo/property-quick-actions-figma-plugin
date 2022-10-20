const framePositionXY: Command<{ xy: string }> = (node, { xy }) => {
	if ('absoluteTransform' in node) {
		console.log('framePositionXY not implemented');
	}
};
const frameSizeHeightWidth: Command<{ xy: string }> = (node, { xy }) => {
	if ('absoluteTransform' in node) {
		console.log('frameSizeHeightWidth not implemented');
	}
};
const frameRotation: Command<{ degrees: string }> = (node, { degrees }) => {
	if ('absoluteTransform' in node) {
		console.log('frameRotation not implemented');
	}
};
const frameCornerRadius: Command<{ radius: string }> = (node, { radius }) => {
	if ('absoluteTransform' in node) {
		console.log('frameCornerRadius not implemented');
	}
};

const resizingSuggestions = ['Fixed', 'Hug', 'Fill'] as const;
type ResizingSuggestions = typeof resizingSuggestions[number];

const frameHorizontalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('absoluteTransform' in node) {
		console.log('frameHorizontalResizing not implemented');
	}
};

const frameVerticalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('absoluteTransform' in node) {
		console.log('frameVerticalResizing not implemented');
	}
};

const frameClipContentToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameClipContentToggle not implemented');
	}
};
const frameConstrainProportionsToggle: Command = (node) => {
	if ('constrainProportions' in node) {
		node.constrainProportions = !node.constrainProportions;
	}
};
const frameAbsolutePositionToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameAbsolutePositionToggle not implemented');
	}
};

export const frameSuggestionsMap: SuggestionsMap = {
	xy: undefined,
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
