/**  https://www.mathworks.com/discovery/affine-transformation.html */
type AffineTransform = [[number, number, number], [number, number, number], [number, number, number]];

/** https://www.figma.com/plugin-docs/api/Transform */
const identityTransform: Transform = [
	// The identity transform is [[1, 0, 0], [0, 1, 0]]
	[1, 0, 0],
	[0, 1, 0],
];

/** https://www.figma.com/plugin-docs/api/Transform */
const identityAffineTransform: AffineTransform = [
	...identityTransform,
	[0, 0, 1], // The bottom row of the matrix is assumed to be [0, 0, 1]
];

export function affineMatrixTranslate(tx: number = 0, ty: number = 0): AffineTransform {
	return toAffineTransform([
		[1, 0, tx],
		[0, 1, ty],
	]);
}

export function affineMatrixRotate(degrees: number = 0): AffineTransform {
	const angle = degrees * (Math.PI / 180);
	return toAffineTransform([
		[Math.cos(angle), Math.sin(angle), 0],
		[-Math.sin(angle), Math.cos(angle), 0],
	]);
}

export function affineMatrixRotateAroundPoint(degrees: number = 0, x: number = 0, y: number = 0): AffineTransform {
	return composeMatrices([affineMatrixTranslate(-x, -y), affineMatrixRotate(degrees), affineMatrixTranslate(x, y)]);
}

export function toTransform(affineTransform: AffineTransform): Transform {
	return [affineTransform[0], affineTransform[1]];
}

export function toAffineTransform(transform: Transform): AffineTransform {
	return [...transform, identityAffineTransform[2]];
}

export function multiplyMatrices(m1: AffineTransform, m2: AffineTransform) {
	var result = [] as number[][];
	for (var i = 0; i < m1.length; i++) {
		result[i] = [] as number[];
		for (var j = 0; j < m2[0].length; j++) {
			var sum = 0;
			for (var k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result as AffineTransform;
}

/** reads right to left - as is convention */
export function composeMatrices(matrices: AffineTransform[]): AffineTransform {
	return matrices.reduceRight((previousMatrix, currentMatrix) => multiplyMatrices(previousMatrix, currentMatrix));

	// const restMatrices = [...matrices]
	// const nextMatrix = restMatrices.shift()
	// const compositeMatrices = restMatrices.length === 1 ? restMatrices[0] : composeMatrices(restMatrices)

	// return multiplyMatrices(nextMatrix * compositeMatrices)
}

const multiplyMatricesAlt = (a: AffineTransform, b: AffineTransform) => {
	if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
		throw new Error('arguments should be in 2-dimensional array format');
	}
	let x = a.length,
		z = a[0].length,
		y = b[0].length;
	if (b.length !== z) {
		// XxZ & ZxY => XxY
		throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
	}
	let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
	let product = new Array(x);
	for (let p = 0; p < x; p++) {
		product[p] = productRow.slice();
	}
	for (let i = 0; i < x; i++) {
		for (let j = 0; j < y; j++) {
			for (let k = 0; k < z; k++) {
				product[i][j] += a[i][k] * b[k][j];
			}
		}
	}
	return product;
};
