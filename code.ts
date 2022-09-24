figma.on('run', (event) => {
	console.log(figma.currentPage.selection[0]);

	const command = event.command as keyof typeof commandMap;
	figma.currentPage.selection.forEach((node) => commandMap[command](node));
	figma.closePlugin();
});

// Auto Layout /////////////////////

const autoLayoutDirectionVertical: Cmd = (node) => {
	if ('layoutMode' in node) node.layoutMode = 'VERTICAL';
};
const autoLayoutDirectionHorizontal: Cmd = (node) => {
	if ('layoutMode' in node) node.layoutMode = 'HORIZONTAL';
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
			figma.notify('Text Baseline Alignment: On');
		} else {
			// node.counterAxisAlignItems = 'CENTER';
			figma.notify('Text Baseline Alignment: Off');
		}
	} else {
		figma.notify('Only applicable for horizontal layout');
	}
};

// Command Map /////////////////////

type Cmd = (node: SceneNode) => void;

const commandMap = {
	autoLayoutDirectionVertical,
	autoLayoutDirectionHorizontal,
	autoLayoutSpacingModeSpaceBetween,
	autoLayoutSpacingModePacked,
	autoLayoutStrokesExcluded,
	autoLayoutStrokesIncluded,
	autoLayoutCanvasStackingLast,
	autoLayoutCanvasStackingFirst,
	autoLayoutTextBaselineAlignmentToggle,
};
