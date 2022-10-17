const constraintSuggestions = ['Left', 'Right', 'Stretch', 'Center', 'Scale'] as const;
type ConstraintSuggestions = typeof constraintSuggestions[number]

const constraintsVertical: Command<{ constraints: ConstraintSuggestions }> = (node, { constraints }) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsVertical not implemented');
	}
};

const constraintsHorizontal: Command<{ constraints: ConstraintSuggestions }> = (node, { constraints }) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsHorizontal not implemented');
	}
};

const constraintsFixPositionToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsFixPositionToggle not implemented');
	}
};

export const constraintsSuggestionsMap: SuggestionsMap = {
	constraints: constraintSuggestions
}

export const constraintsCommandMap = {
	constraintsVertical,
	constraintsHorizontal,
	constraintsFixPositionToggle,
};
