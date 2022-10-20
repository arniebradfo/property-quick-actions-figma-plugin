import nodeTest from 'node:test';
import { parentPort } from 'node:worker_threads';

const constraintHorizontalSuggestions = ['Left', 'Right', 'Stretch', 'Center', 'Scale'] as const;
type ConstraintHorizontalSuggestions = typeof constraintHorizontalSuggestions[number];
const constraintMap: Record<ConstraintHorizontalSuggestions, ConstraintType> = {
	Left: 'MIN',
	Right: 'MAX',
	Center: 'CENTER',
	Scale: 'SCALE',
	Stretch: 'STRETCH',
};

const constraintVerticalSuggestions = ['Top', 'Bottom', 'Stretch', 'Center', 'Scale'] as const;
type ConstraintVerticalSuggestions = typeof constraintHorizontalSuggestions[number];
const constraintsVertical: Command<{ constraintsVertical: ConstraintVerticalSuggestions }> = (
	node,
	{ constraintsVertical }
) => {
	if ('constraints' in node) {
		node.constraints = {
			horizontal: node.constraints.horizontal,
			vertical: constraintMap[constraintsVertical],
		};
	}
};

const constraintsHorizontal: Command<{ constraintsHorizontal: ConstraintHorizontalSuggestions }> = (
	node,
	{ constraintsHorizontal }
) => {
	if ('constraints' in node) {
		node.constraints = {
			horizontal: constraintMap[constraintsHorizontal],
			vertical: node.constraints.vertical,
		};
	}
};

const constraintsFixPositionToggle: Command = (node) => {
	/**
	 cant access any property related to this other than `numberOfFixedChildren`?
	 https://www.figma.com/plugin-docs/api/properties/nodes-numberoffixedchildren/
	 "Despite the "Fix position when scrolling" checkbox in the UI, 
	 fixed layers are not represented as a boolean property on individual layers. 
	 Instead, what we really have are two sections of children inside each frame. 
	 These section headers are visible in the layers panel when a frame 
	 has at least one fixed child."
	 */
	if (node.parent && 'numberOfFixedChildren' in node.parent) {
		const indexInParent = getIndexInParent(node);
		const isFixed = indexInParent >= node.parent.children.length - node.parent.numberOfFixedChildren;
		if (isFixed) {
			node.parent.insertChild(node.parent.children.length - node.parent.numberOfFixedChildren, node);
			// node.parent.numberOfFixedChildren -= 1; // apparently this happens already somehow?
		} else {
			node.parent.insertChild(node.parent.children.length - node.parent.numberOfFixedChildren, node);
			node.parent.numberOfFixedChildren += 1;
		}
	}
};
const getIndexInParent = (node: SceneNode) => {
	const index = node.parent?.children.findIndex(({ id }) => id === node.id);
	return index != null && index > -1 ? index : Number.POSITIVE_INFINITY;
};

export const constraintsSuggestionsMap: SuggestionsMap = {
	constraintsHorizontal: constraintHorizontalSuggestions,
	constraintsVertical: constraintVerticalSuggestions,
};

export const constraintsCommandMap = {
	constraintsVertical,
	constraintsHorizontal,
	constraintsFixPositionToggle,
};
