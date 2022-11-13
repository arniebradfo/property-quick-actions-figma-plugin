import { validateFloat, validatePadding, validateXY } from '../utils';
import { compose, identity, inverse, rotateDEG } from 'transformation-matrix';
import { currentMatrixRotation, matrixToTransform, toDeg, transformToMatrix } from '../utils-matrix';

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
	if ('absoluteBoundingBox' in node) {
		let rotation = parseFloat(degrees);
		if (isNaN(rotation)) return;

		// node.rotation = rotation // thought this would be easy, but...
		// this is WAAAYY harder that it seems
		// https://www.figma.com/plugin-docs/api/properties/nodes-relativetransform
		// https://www.figma.com/plugin-docs/api/Transform

		// TODO: this doesn't work when a node has been flipped. I don't know how to fix that

		const absoluteMatrix = transformToMatrix(node.absoluteTransform);
		const parentAbsoluteMatrix =
			node.parent != null && 'absoluteTransform' in node.parent && node.parent.type !== 'GROUP'
				? transformToMatrix(node.parent.absoluteTransform)
				: identity();

		const absoluteRotation = -toDeg(currentMatrixRotation(absoluteMatrix));
		const relativeRotation = rotation - absoluteRotation;
		const { x = 0, y = 0, height = 0, width = 0 } = node.absoluteBoundingBox || {};
		const rotationMatrix = rotateDEG(-relativeRotation, x + width / 2, y + height / 2);

		const newAbsoluteMatrix = compose(rotationMatrix, absoluteMatrix);
		const newRelativeMatrix = compose(inverse(parentAbsoluteMatrix), newAbsoluteMatrix);

		node.relativeTransform = matrixToTransform(newRelativeMatrix);
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
