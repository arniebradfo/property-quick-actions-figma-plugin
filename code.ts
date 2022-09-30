figma.on('run', (event: RunEvent) => {
	console.log(figma.currentPage.selection[0]);

	const command = event.command as keyof typeof commandMap;
	const parameters = event.parameters as any; //

	figma.currentPage.selection.forEach((node) => commandMap[command](node, parameters));
	figma.closePlugin();
});

figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
	console.log({ parameters, key, query, result });
	const suggest = suggestionsMap[key];
	if (suggest == null) return; // assume "allowFreeform": true
	const suggestions = typeof suggest === 'function' ? suggest(query) : searchSuggestions(query, suggest);
	if (typeof suggestions === 'string') {
		// if (query === '') return; // no input, no error // but sets loading state...
		result.setError(suggestions);
	}
	else result.setSuggestions(suggestions);
});

// Auto Layout /////////////////////

const autoLayoutDirectionToggle: Command = (node) => {
	if ('layoutMode' in node) {
		if (node.layoutMode === 'VERTICAL') node.layoutMode = 'HORIZONTAL';
		else node.layoutMode = 'VERTICAL';
	}
};

const autoLayoutSpacingBetweenItems: Command<{ pixels: string }> = (node, { pixels }) => {
	if ('itemSpacing' in node) setNumericValue(node, 'itemSpacing', pixels);
};

const autoLayoutSpacingModeSpaceBetween: Command = (node) => {
	if ('primaryAxisAlignItems' in node) node.primaryAxisAlignItems = 'SPACE_BETWEEN';
};
const autoLayoutSpacingModePacked: Command = (node) => {
	if ('primaryAxisAlignItems' in node) {
		if (node.primaryAxisAlignItems !== 'SPACE_BETWEEN') return;
		node.primaryAxisAlignItems = 'MIN';
	}
};
const autoLayoutStrokesExcluded: Command = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = false;
};
const autoLayoutStrokesIncluded: Command = (node) => {
	if ('strokesIncludedInLayout' in node) node.strokesIncludedInLayout = true;
};
const autoLayoutCanvasStackingLast: Command = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = false;
};
const autoLayoutCanvasStackingFirst: Command = (node) => {
	if ('itemReverseZIndex' in node) node.itemReverseZIndex = true;
};
const autoLayoutTextBaselineAlignmentToggle: Command = (node) => {
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

type Command<ParametersType = Record<string, string> | undefined> = (
	node: SceneNode,
	parameters: RunEvent<ParametersType>['parameters']
) => void;

const commandMap = {
	autoLayoutDirectionToggle,
	autoLayoutSpacingBetweenItems,
	autoLayoutSpacingModeSpaceBetween,
	autoLayoutSpacingModePacked,
	autoLayoutStrokesExcluded,
	autoLayoutStrokesIncluded,
	autoLayoutCanvasStackingLast,
	autoLayoutCanvasStackingFirst,
	autoLayoutTextBaselineAlignmentToggle,
};

// Suggestions Map ///////////////////////

type GetSuggestions = (query?: string, options?: string[]) => string[];
const searchSuggestions: GetSuggestions = (query = '', options = []) => {
	// TODO: fuzzy find
	return options.filter((s) => s.includes(query));
};

type CreateSuggestions = (query?: string) => string[] | string;

const validateInt: CreateSuggestions = (query = '') => {
	const int = parseInt(query);
	if (isNaN(int)) return 'Must be an Integer';
	else return [int.toString()];
};
const validateFloat: CreateSuggestions = (query = '') => {
	const float = parseFloat(query);
	if (isNaN(float)) return 'Must be a Number';
	else return [float.toString()];
};

const suggestionsMap: Record<string, string[] | CreateSuggestions | undefined> = {
	pixels: validateFloat,
	example: ['put', 'suggestions', 'here'],
};

// UTILS ///////////////////////
const setNumericValue = <Node extends SceneNode>(node: Node, numericProperty: keyof Node, value: string) => {
	if (numericProperty in node) {
		const pixels = parseFloat(value);
		if (!isNaN(pixels)) (node[numericProperty] as number) = pixels;
		else figma.notify('Error');
	}
};
