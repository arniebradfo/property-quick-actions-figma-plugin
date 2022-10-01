import {
	autoLayoutAlignment,
	autoLayoutCanvasStackingToggle,
	autoLayoutDirectionToggle,
	autoLayoutPadding,
	autoLayoutSpacingBetweenItems,
	autoLayoutSpacingModeToggle,
	autoLayoutStrokesToggle,
	autoLayoutTextBaselineAlignmentToggle,
} from './commands/auto-layout';
import { searchSuggestions, validateFloat, validatePadding } from './utils';

figma.on('run', (event: RunEvent) => {
	console.log(figma.currentPage.selection[0]);

	const command = event.command as keyof typeof commandMap;
	const parameters = event.parameters as any; //

	figma.currentPage.selection.forEach((node) => commandMap[command](node, parameters));
	// figma.closePlugin();
});

figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
	const suggest = suggestionsMap[key];
	if (suggest == null) return; // assume "allowFreeform": true
	const suggestions = typeof suggest === 'function' ? suggest(query) : searchSuggestions(query, suggest);
	if (typeof suggestions === 'string') {
		// if (query === '') return; // no input, no error // but sets loading state...
		result.setError(suggestions);
	} else result.setSuggestions(suggestions);
});

const commandMap = {
	autoLayoutDirectionToggle,
	autoLayoutSpacingModeToggle,
	autoLayoutStrokesToggle,
	autoLayoutCanvasStackingToggle,
	autoLayoutTextBaselineAlignmentToggle,
	autoLayoutSpacingBetweenItems,
	autoLayoutPadding,
	autoLayoutAlignment,
};

const suggestionsMap: Record<string, string[] | CreateSuggestions | undefined> = {
	pixels: validateFloat,
	padding: validatePadding,
	alignment: [
		'Top',
		'Right',
		'Bottom',
		'Left',
		'Center',
		'Top left',
		'Top right',
		'Bottom left',
		'Bottom right'
	],
};
