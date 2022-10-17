const framePositionXY: Command<{ xy: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('framePositionXY not implemented');
	}
};
const frameSizeHeightWidth: Command<{ xy: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameSizeHeightWidth not implemented');
	}
};
const frameRotation: Command<{ degrees: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameRotation not implemented');
	}
};
const frameCornerRadius: Command<{ radius: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameCornerRadius not implemented');
	}
};
const frameHorizontalResizing: Command<{ resizing: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameHorizontalResizing not implemented');
	}
};
const frameVerticalResizing: Command<{ resizing: string }> = (node) => {
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
	if ('absoluteTransform' in node) {
		console.log('frameConstrainProportionsToggle not implemented');
	}
};
const frameAbsolutePositionToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('frameAbsolutePositionToggle not implemented');
	}
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
