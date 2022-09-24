figma.on('run', (event) => {
	console.log(figma.currentPage.selection[0]);

	const command = event.command as keyof typeof commandMap;
	figma.currentPage.selection.forEach((node) => commandMap[command](node));
	figma.closePlugin();
});

// Auto Layout /////////////////////

const autoLayoutDirectionToggle: Cmd = (node) => {
	if ('layoutMode' in node) {
		if (node.layoutMode === 'VERTICAL') node.layoutMode = 'HORIZONTAL';
		else node.layoutMode = 'VERTICAL';
	}
};
const autoLayoutSpacingModeSpaceBetween: Cmd = (node) => {
	if ('primaryAxisAlignItems' in node) node.primaryAxisAlignItems = 'SPACE_BETWEEN';
};
const autoLayoutSpacingModePacked: Cmd = (node) => {
	if ('primaryAxisAlignItems' in node) {
		if (node.primaryAxisAlignItems !== 'SPACE_BETWEEN') return;
		node.primaryAxisAlignItems = 'MIN';
	}
};
const autoLayoutStrokesExcluded: Cmd = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = false;
};
const autoLayoutStrokesIncluded: Cmd = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = true;
};
const autoLayoutCanvasStackingLast: Cmd = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = false;
};
const autoLayoutCanvasStackingFirst: Cmd = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = true;
};
const autoLayoutTextBaselineAlignmentToggle: Cmd = (node) => {
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

// Command Map /////////////////////

type Cmd = (node: SceneNode) => void;

const commandMap = {
	autoLayoutDirectionToggle,
	autoLayoutSpacingModeSpaceBetween,
	autoLayoutSpacingModePacked,
	autoLayoutStrokesExcluded,
	autoLayoutStrokesIncluded,
	autoLayoutCanvasStackingLast,
	autoLayoutCanvasStackingFirst,
	autoLayoutTextBaselineAlignmentToggle,
};
