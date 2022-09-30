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
	// TODO: fuzzy find
	return options.filter((s) => s.includes(query));
};