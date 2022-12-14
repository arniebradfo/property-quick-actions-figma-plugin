import * as fuzzy from 'fuzzy';

export const setNumericValue = <Node extends SceneNode>(node: Node, numericProperty: keyof Node, value: string) => {
	if (numericProperty in node) {
		const pixels = parseFloat(value);
		if (!isNaN(pixels)) (node[numericProperty] as number) = pixels;
		else figma.notify('Error');
	}
};

export const validateInt: CreateSuggestions = (query = '') => {
	const int = parseInt(query);
	if (isNaN(int)) return 'Must be an Integer';
	else return [int.toString()];
};

export const validateFloat: CreateSuggestions = (query = '') => {
	const float = parseFloat(query);
	if (isNaN(float)) return 'Must be a Number';
	else return [float.toString()];
};

export const searchSuggestions: GetSuggestions = (query = '', options = []) => {
	const matches = fuzzy.filter(query, options as string[]).map((el) => el.string);
	return matches;
	// return options.filter((s) => s.toLowerCase().includes(query.toLowerCase()));
};

export const validatePadding: CreateSuggestions = (query = '') => {
	const sides = query
		.replace(',', ' ')
		.split(' ')
		.filter((s) => s !== '')
		.map((s) => parseFloat(s))
		.filter((n) => !isNaN(n));
	if (sides.length === 0) return '1-4 numbers, space or comma separated';
	const padding = [
		sides[0], //
		sides[1] || sides[0],
		sides[2] || sides[0],
		sides[3] || sides[1] || sides[0],
	];
	return [padding.join(', ')];
};

export const validateXY: CreateSuggestions = (query = '') => {
	const input = query
		.replace(',', ' ')
		.split(' ')
		.filter((s) => s !== '')
		.map((s) => parseFloat(s))
		.filter((n) => !isNaN(n));
	if (input.length === 0) return '1 or 2 numbers, space or comma separated';
	const xy = [input[0], input[1] || input[0]];
	return [xy.join(', ')];
};

export const toScreamingSnakeCase = (str: string) =>
	str.replace(/[A-Z]/gi, (l) => l.toUpperCase()).replace(/\s/gi, '_');
