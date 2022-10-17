import { setNumericValue, validateFloat, validatePadding } from '../utils';

const autoLayoutDirectionToggle: Command = (node) => {
	if ('layoutMode' in node) {
		node.layoutMode = node.layoutMode === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
	}
};

const autoLayoutSpacingModeToggle: Command = (node) => {
	if ('primaryAxisAlignItems' in node) {
		// TODO: save node's non SPACE_BETWEEN value to return to?
		node.primaryAxisAlignItems = node.primaryAxisAlignItems !== 'SPACE_BETWEEN' ? 'SPACE_BETWEEN' : 'MIN';
	}
};

const autoLayoutStrokesToggle: Command = (node) => {
	if ('strokesIncludedInLayout' in node) {
		node.strokesIncludedInLayout = !node.strokesIncludedInLayout;
	}
};

const autoLayoutCanvasStackingToggle: Command = (node) => {
	if ('itemReverseZIndex' in node) {
		node.itemReverseZIndex = !node.itemReverseZIndex;
	}
};

const autoLayoutTextBaselineAlignmentToggle: Command = (node) => {
	if ('layoutMode' in node && node.layoutMode === 'HORIZONTAL') {
		// TODO: save node's non BASELINE value to return to?
		node.counterAxisAlignItems = node.counterAxisAlignItems !== 'BASELINE' ? 'BASELINE' : 'CENTER';
	} else {
		figma.notify('Auto Layout > Text Baseline Alignment: Only applicable for horizontal layout');
	}
};

const autoLayoutSpacingBetweenItems: Command<{ pixels: string }> = (node, { pixels }) => {
	if ('itemSpacing' in node) {
		setNumericValue(node, 'itemSpacing', pixels);
	}
};

const autoLayoutPadding: Command<{ padding: string }> = (node, { padding }) => {
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

const alignmentSuggestions = ['Top', 'Right', 'Bottom', 'Left', 'Center', 'Top left', 'Top right', 'Bottom left', 'Bottom right'] as const;
type AlignmentSuggestions = typeof alignmentSuggestions[number]

const autoLayoutAlignment: Command<{ alignment: AlignmentSuggestions }> = (node, { alignment }) => {
	if (!('layoutMode' in node)) return;
	const isAlignedTo = (position: string) => alignment.toLowerCase().includes(position.toLocaleLowerCase());
	const align = {
		top: isAlignedTo('top'),
		right: isAlignedTo('right'),
		bottom: isAlignedTo('bottom'),
		left: isAlignedTo('left'),
		center: isAlignedTo('center'),
	};
	// TODO: offer dynamic options based on BASELINE or SPACE_BETWEEN being set?
	if (align.center) {
		node.counterAxisAlignItems = 'CENTER';
		node.primaryAxisAlignItems = 'CENTER';
	} else if (node.layoutMode === 'HORIZONTAL') {
		node.primaryAxisAlignItems = setAlignment(align.left, align.right, node.primaryAxisAlignItems) as PrimaryAlign;
		node.counterAxisAlignItems = setAlignment(align.top, align.bottom, node.counterAxisAlignItems) as CounterAlign;
	} else {
		node.primaryAxisAlignItems = setAlignment(align.top, align.bottom, node.primaryAxisAlignItems) as PrimaryAlign;
		node.counterAxisAlignItems = setAlignment(align.left, align.right, node.counterAxisAlignItems) as CounterAlign;
	}
};

const setAlignment = (
	min: boolean,
	max: boolean,
	special: PrimaryAlign | CounterAlign
): PrimaryAlign | CounterAlign => {
	if (min) return 'MIN';
	if (max) return 'MAX';
	if (special === 'BASELINE') return 'BASELINE';
	if (special === 'SPACE_BETWEEN') return 'SPACE_BETWEEN';
	else return 'CENTER';
};

type PrimaryAlign = BaseFrameMixin['primaryAxisAlignItems'];
type CounterAlign = BaseFrameMixin['counterAxisAlignItems'];

export const autoLayoutSuggestionsMap: SuggestionsMap = {
	pixels: validateFloat,
	padding: validatePadding,
	alignment: alignmentSuggestions,
}

export const autoLayoutCommandMap = {
	autoLayoutDirectionToggle,
	autoLayoutSpacingModeToggle,
	autoLayoutStrokesToggle,
	autoLayoutCanvasStackingToggle,
	autoLayoutTextBaselineAlignmentToggle,
	autoLayoutSpacingBetweenItems,
	autoLayoutPadding,
	autoLayoutAlignment,
};