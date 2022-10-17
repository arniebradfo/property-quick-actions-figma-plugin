const constraintsVertical: Command<{ constraints: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsVertical not implemented');
	}
};

const constraintsHorizontal: Command<{ constraints: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsHorizontal not implemented');
	}
};
const constraintsFixPositionToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('constraintsFixPositionToggle not implemented');
	}
};

export const constraintsCommandMap = {
	constraintsVertical,
	constraintsHorizontal,
	constraintsFixPositionToggle,
};
