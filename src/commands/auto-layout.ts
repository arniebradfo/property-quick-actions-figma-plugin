import { setNumericValue } from "../utils";

export const autoLayoutDirectionToggle: Command = (node) => {
	if ('layoutMode' in node) {
		if (node.layoutMode === 'VERTICAL') node.layoutMode = 'HORIZONTAL';
		else node.layoutMode = 'VERTICAL';
	}
};

export const autoLayoutSpacingBetweenItems: Command<{ pixels: string }> = (node, { pixels }) => {
	if ('itemSpacing' in node) setNumericValue(node, 'itemSpacing', pixels);
};

export const autoLayoutSpacingModeSpaceBetween: Command = (node) => {
	if ('primaryAxisAlignItems' in node) node.primaryAxisAlignItems = 'SPACE_BETWEEN';
};
export const autoLayoutSpacingModePacked: Command = (node) => {
	if ('primaryAxisAlignItems' in node) {
		if (node.primaryAxisAlignItems !== 'SPACE_BETWEEN') return;
		node.primaryAxisAlignItems = 'MIN';
	}
};
export const autoLayoutStrokesExcluded: Command = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = false;
};
export const autoLayoutStrokesIncluded: Command = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = true;
};
export const autoLayoutCanvasStackingLast: Command = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = false;
};
export const autoLayoutCanvasStackingFirst: Command = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = true;
};
export const autoLayoutTextBaselineAlignmentToggle: Command = (node) => {
	if ('layoutMode' in node && node.layoutMode === 'HORIZONTAL') {
		if (node.counterAxisAlignItems !== 'BASELINE') {
			node.counterAxisAlignItems = 'BASELINE';
			figma.notify('Auto Layout > Text Baseline Alignment: On');
		} else {
			// node.counterAxisAlignItems = 'CENTER';
			figma.notify('Auto Layout > Text Baseline Alignment: Off');
		}
	} else {
		figma.notify('Auto Layout > Text Baseline Alignment: Only applicable for horizontal layout');
	}
};
