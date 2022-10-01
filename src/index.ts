import {
	autoLayoutDirectionToggle,
	autoLayoutSpacingBetweenItems,
	autoLayoutTextBaselineAlignmentToggle,
	autoLayoutSpacingModeToggle,
	autoLayoutCanvasStackingToggle,
	autoLayoutStrokesToggle,
} from './commands/auto-layout';
import { searchSuggestions, validateFloat } from './utils';

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
	} else result.setSuggestions(suggestions);
});

const commandMap = {
	autoLayoutSpacingBetweenItems,
	autoLayoutDirectionToggle,
	autoLayoutSpacingModeToggle,
	autoLayoutStrokesToggle,
	autoLayoutCanvasStackingToggle,
	autoLayoutTextBaselineAlignmentToggle,
};

const suggestionsMap: Record<string, string[] | CreateSuggestions | undefined> = {
	pixels: validateFloat,
	example: ['put', 'suggestions', 'here'],
};
