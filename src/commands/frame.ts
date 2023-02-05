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
			.map((s) => parseFloat(s) || 0);
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
			.map((s) => parseFloat(s) || 0);
		if (tr === tl && br === tl && bl === tl) {
			node.cornerRadius = tl;
		} else {
			node.topLeftRadius = tl;
			node.topRightRadius = tr;
			node.bottomRightRadius = br;
			node.bottomLeftRadius = bl;
		}
	}
};

const resizingSuggestions = ['Fixed', 'Hug', 'Fill'] as const;
type ResizingSuggestions = typeof resizingSuggestions[number];

const setNodeResizing = (node: SceneNode, resizing: ResizingSuggestions, layoutMode: BaseFrameMixin['layoutMode'] = 'NONE') => {
	if ('layoutMode' in node) {
		if (node.layoutMode === 'NONE') {
			
		}
		const axisSizingMode = layoutMode === node.layoutMode ? 'counterAxisSizingMode' : 'primaryAxisSizingMode';
		if (resizing === 'Fill') {
			node.layoutAlign = 'STRETCH'
		} else {
			node[axisSizingMode] = resizing === 'Hug' ? 'AUTO' : 'FIXED'
		}
	}
};

const frameHorizontalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('layoutAlign' in node) {
		if (node.parent && 'primaryAxisSizingMode' in node.parent) {
			// node.parent.primaryAxisSizingMode = 'FIXED'
			// node.parent.counterAxisSizingMode = 'FIXED'
		}

		//
		// node.primaryAxisSizingMode = 'AUTO';
		// node.counterAxisSizingMode = 'AUTO';
		
		// 'Fill' // only for children of layoutMode != 'NONE'
		node.layoutAlign = 'STRETCH';
		node.layoutGrow = 1;
		// need to change parent axisSizingMode also
		
		// figma.notify('frameHorizontalResizing not implemented');
	}
};

const frameVerticalResizing: Command<{ resizing: ResizingSuggestions }> = (node, { resizing }) => {
	if ('primaryAxisSizingMode' in node) {
		node.primaryAxisSizingMode = 'AUTO';
		node.counterAxisSizingMode = 'AUTO';
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
