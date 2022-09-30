// UTILS ///////////////////////
export const setNumericValue = <Node extends SceneNode>(node: Node, numericProperty: keyof Node, value: string) => {
	if (numericProperty in node) {
		const pixels = parseFloat(value);
		if (!isNaN(pixels)) (node[numericProperty] as number) = pixels;
		else figma.notify('Error');
	}
};