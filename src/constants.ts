const PHI = (1 + Math.sqrt(5)) / 2;
const MOD = 1 / Math.sqrt(1 + PHI * PHI);
const X = 1 * MOD;
const Z = PHI * MOD;
const N = 0;

const verts = [
	{ x: -X, y: N, z: Z },
	{ x: X, y: N, z: Z },
	{ x: -X, y: N, z: -Z },
	{ x: X, y: N, z: -Z },
	{ x: N, y: Z, z: X },
	{ x: N, y: Z, z: -X },
	{ x: N, y: -Z, z: X },
	{ x: N, y: -Z, z: -X },
	{ x: Z, y: X, z: N },
	{ x: -Z, y: X, z: N },
	{ x: Z, y: -X, z: N },
	{ x: -Z, y: -X, z: N },
] as const;

export const triangles = [
	[verts[0], verts[4], verts[1]],
	[verts[0], verts[9], verts[4]],
	[verts[9], verts[5], verts[4]],
	[verts[4], verts[5], verts[8]],
	[verts[4], verts[8], verts[1]],

	[verts[8], verts[10], verts[1]],
	[verts[8], verts[3], verts[10]],
	[verts[5], verts[3], verts[8]],
	[verts[5], verts[2], verts[3]],
	[verts[2], verts[7], verts[3]],

	[verts[7], verts[10], verts[3]],
	[verts[7], verts[6], verts[10]],
	[verts[7], verts[11], verts[6]],
	[verts[11], verts[0], verts[6]],
	[verts[0], verts[1], verts[6]],

	[verts[6], verts[1], verts[10]],
	[verts[9], verts[0], verts[11]],
	[verts[9], verts[11], verts[2]],
	[verts[9], verts[2], verts[5]],
	[verts[7], verts[2], verts[11]],
] as const;
