const strokeAlignModeSuggestions = ['Center', 'Inside', 'Outside'] as const;
type StrokeAlignModeSuggestions = typeof strokeAlignModeSuggestions[number];

const strokeAlign: Command<{ strokeAlignMode: StrokeAlignModeSuggestions }> = (node, { strokeAlignMode }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeAlign not implemented');
	}
};

const strokeWeight: Command<{ padding: string }> = (node, { padding }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeWeight not implemented');
	}
};

const strokeSideModeSuggestions = ['Top', 'Right', 'Bottom', 'Left', 'All'] as const;
type StrokeSideModeSuggestions = typeof strokeSideModeSuggestions[number];

const strokeSide: Command<{ strokeSideMode: StrokeSideModeSuggestions }> = (node, { strokeSideMode }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeSide not implemented');
	}
};

const strokeJoinModeSuggestions = ['Mitre', 'Bevel', 'Round'] as const;
type StrokeJoinModeSuggestions = typeof strokeJoinModeSuggestions[number];

const strokeJoin: Command<{ strokeJoinMode: StrokeJoinModeSuggestions }> = (node, { strokeJoinMode }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeJoin not implemented');
	}
};

const strokeDashSolidToggle: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeDashSolidToggle not implemented');
	}
};

const strokeDashes: Command<{ dashArray: string }> = (node, { dashArray }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeDashes not implemented');
	}
};

const dashCapSuggestions = ['None', 'Round', 'Square'] as const;
type DashCapSuggestions = typeof dashCapSuggestions[number];

const strokeDashCap: Command<{ dashCap: DashCapSuggestions }> = (node, { dashCap }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeDashCap not implemented');
	}
};

const strokeCapSuggestions = ['None', 'Round', 'Square', 'Line arrow', 'Triangle arrow', 'Reversed triangle', 'Circle arrow', 'Diamond arrow'] as const;
type StrokeCapSuggestions = typeof strokeCapSuggestions[number];

const strokeBothEndpoints: Command<{ strokeCap: string }> = (node, { strokeCap }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeBothEndpoints not implemented');
	}
};
const strokeStartpoint: Command<{ strokeCap: string }> = (node, { strokeCap }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeStartpoint not implemented');
	}
};
const strokeEndpoint: Command<{ strokeCap: string }> = (node, { strokeCap }) => {
	if ('absoluteTransform' in node) {
		console.log('strokeEndpoint not implemented');
	}
};

const strokeSwapStartpointAndEndpoint: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeSwapStartpointAndEndpoint not implemented');
	}
};

export const strokeSuggestionsMap: SuggestionsMap = {
	strokeAlignMode: strokeAlignModeSuggestions,
	strokeSideMode: strokeSideModeSuggestions,
	strokeJoinMode: strokeJoinModeSuggestions,
	dashArray: undefined,
	dashCap: dashCapSuggestions,
	strokeCap: strokeCapSuggestions,
};

export const strokeCommandMap = {
	strokeAlign,
	strokeWeight,
	strokeSide,
	strokeJoin,
	strokeDashSolidToggle,
	strokeDashes,
	strokeDashCap,
	strokeBothEndpoints,
	strokeStartpoint,
	strokeEndpoint,
	strokeSwapStartpointAndEndpoint,
};
