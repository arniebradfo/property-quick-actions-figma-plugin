import { decomposeTSR, Matrix } from 'transformation-matrix';

export function transformToMatrix(t: Transform): Matrix {
	return {
		a: t[0][0],
		b: t[1][0],
		c: t[0][1],
		d: t[1][1],
		e: t[0][2],
		f: t[1][2],
	};
}

export function matrixToTransform({ a, b, c, d, e, f }: Matrix): Transform {
	return [
		[a, c, e],
		[b, d, f],
	];
}

export function currentMatrixRotation(matrix: Matrix): number {
	return decomposeTSR(matrix).rotation.angle;
}

export function toDeg(radians: number): number {
	return (radians * 180) / Math.PI;
}

export function toRad(degrees: number): number {
	return (degrees * Math.PI) / 180;
}
