const strokeAlign: Command<{ strokeAlignMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeAlign not implemented');
	}
};
const strokeWeight: Command<{ padding: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeWeight not implemented');
	}
};
const strokeSide: Command<{ strokeSideMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeSide not implemented');
	}
};
const strokeJoin: Command<{ strokeJoinMode: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeJoin not implemented');
	}
};
const strokeDashes: Command<{ dashArray: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeDashes not implemented');
	}
};
const strokeDashCap: Command<{ dashCap: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeDashCap not implemented');
	}
};
const strokeBothEndpoints: Command<{ strokeCap: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeBothEndpoints not implemented');
	}
};
const strokeStartpoint: Command<{ strokeCap: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeStartpoint not implemented');
	}
};
const strokeEndpoint: Command<{ strokeCap: string }> = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeEndpoint not implemented');
	}
};
const strokeSwapStartpointAndEndpoint: Command = (node) => {
	if ('absoluteTransform' in node) {
		console.log('strokeSwapStartpointAndEndpoint not implemented');
	}
};

export const strokeCommandMap = {
	strokeAlign,
	strokeWeight,
	strokeSide,
	strokeJoin,
	strokeDashes,
	strokeDashCap,
	strokeBothEndpoints,
	strokeStartpoint,
	strokeEndpoint,
	strokeSwapStartpointAndEndpoint,
};
