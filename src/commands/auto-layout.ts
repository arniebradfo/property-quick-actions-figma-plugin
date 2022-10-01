import { setNumericValue } from '../utils';

export const autoLayoutDirectionToggle: Command = (node) => {
	if ('layoutMode' in node) {
		node.layoutMode = node.layoutMode === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
	}
};

export const autoLayoutSpacingModeToggle: Command = (node) => {
	if ('primaryAxisAlignItems' in node) {
		// TODO: save node's non SPACE_BETWEEN value to return to?
		node.primaryAxisAlignItems = node.primaryAxisAlignItems !== 'SPACE_BETWEEN' ? 'SPACE_BETWEEN' : 'MIN';
	}
};

export const autoLayoutStrokesToggle: Command = (node) => {
	if ('strokesIncludedInLayout' in node) {
		node.strokesIncludedInLayout = !node.strokesIncludedInLayout;
	}
};

export const autoLayoutCanvasStackingToggle: Command = (node) => {
	if ('itemReverseZIndex' in node) {
		node.itemReverseZIndex = !node.itemReverseZIndex;
	}
};

export const autoLayoutTextBaselineAlignmentToggle: Command = (node) => {
	if ('layoutMode' in node && node.layoutMode === 'HORIZONTAL') {
		// TODO: save node's non BASELINE value to return to?
		node.counterAxisAlignItems = node.counterAxisAlignItems !== 'BASELINE' ? 'BASELINE' : 'CENTER';
	} else {
		figma.notify('Auto Layout > Text Baseline Alignment: Only applicable for horizontal layout');
	}
};

export const autoLayoutSpacingBetweenItems: Command<{ pixels: string }> = (node, { pixels }) => {
	if ('itemSpacing' in node) {
		setNumericValue(node, 'itemSpacing', pixels);
	}
};

export const autoLayoutPadding: Command<{ padding: string }> = (node, { padding }) => {
	if ('paddingTop' in node) {
		const paddingArray = padding
			.replace(',', '')
			.split(' ')
			.map((s) => parseFloat(s));
		node.paddingTop = paddingArray[0];
		node.paddingRight = paddingArray[1];
		node.paddingBottom = paddingArray[2];
		node.paddingLeft = paddingArray[3];
	}
};
