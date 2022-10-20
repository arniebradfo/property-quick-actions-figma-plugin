import { autoLayoutCommandMap, autoLayoutSuggestionsMap } from './commands/auto-layout';
import { constraintsCommandMap, constraintsSuggestionsMap } from './commands/constraints';
import { extrasCommandMap, extrasSuggestionsMap } from './commands/extras';
import { frameCommandMap, frameSuggestionsMap } from './commands/frame';
import { strokeCommandMap, strokeSuggestionsMap } from './commands/stroke';
import { searchSuggestions } from './utils';

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
	if (typeof suggestions === 'string') result.setError(suggestions);
	else result.setSuggestions(suggestions);
});

const commandMap = {
	...autoLayoutCommandMap,
	...constraintsCommandMap,
	...extrasCommandMap,
	...frameCommandMap,
	// ...setStyleCommandMap, // later
	...strokeCommandMap,
};

const suggestionsMap: SuggestionsMap = {
	...autoLayoutSuggestionsMap,
	...constraintsSuggestionsMap,
	...extrasSuggestionsMap,
	...frameSuggestionsMap,
	// ...setStyleSuggestionsMap, // later
	...strokeSuggestionsMap
};
