import { setNumericValue, validateFloat, validatePadding, validateXY } from '../utils';
import {
	affineMatrixRotate,
	affineMatrixRotateAroundPoint,
	composeMatrices,
	multiplyMatrices,
	toAffineTransform,
	toTransform,
} from '../utils-matrix';

const framePositionXY: Command<{ xy: string }> = (node, { xy }) => {
	if ('x' in node) {
		const [x, y] = xy
			.replace(',', '')
			.split(' ')
			.map((s) => parseFloat(s));
		if (x != null) node.x = x;
		if (y != null) node.y = y;
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
	if ('absoluteBoundingBox' in node && node.absoluteBoundingBox != null) {
		// https://www.figma.com/plugin-docs/api/properties/nodes-relativetransform
		// https://www.figma.com/plugin-docs/api/Transform

		// this is WAAAYY harder that it seems

		// setting node.rotation rotates around the top left.
		// need to set node.absoluteTransform, but this has no setter...
		// set node.relativeTransform,
		// - but need to consider the parent the node is relative to,
		// - and its ancestors...
		
		let deg = parseFloat(degrees);
		if (isNaN(deg)) return;
		
		// get rotation from node.absoluteTransform
		deg -= node.rotation;

		const { x, y, height, width } = node.absoluteBoundingBox;
		node.relativeTransform = toTransform(
			composeMatrices([
				toAffineTransform(node.relativeTransform),
				affineMatrixRotateAroundPoint(deg, node.x + width / 2, node.y + height / 2),
			])
		);
	}
};
const frameCornerRadius: Command<{ radius: string }> = (node, { radius }) => {
	if ('topLeftRadius' in node) {
		const [tl, tr, br, bl] = radius
			.replace(',', '')
			.split(' ')
			.map((s) => parseFloat(s));
		// setNumericValue(node, 'topLeftRadius', tl);
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
	degrees: validateFloat,
	radius: validatePadding,
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
