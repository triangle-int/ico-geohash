import { add, cross, dot, norm, type Vector3 } from "@triangle-int/geomath";

export type Triangle = readonly [Vector3, Vector3, Vector3];

export function subdivide(
	tri: Triangle,
): [Triangle, Triangle, Triangle, Triangle] {
	const middles = [
		norm(add(tri[0], tri[1])),
		norm(add(tri[1], tri[2])),
		norm(add(tri[2], tri[0])),
	];

	return [
		[tri[0], middles[0], middles[2]],
		[tri[1], middles[1], middles[0]],
		[tri[2], middles[2], middles[1]],
		[middles[0], middles[1], middles[2]],
	];
}

export function center(tri: Triangle): Vector3 {
	return norm(add(tri[0], add(tri[1], tri[2])));
}

function triangleContains(vector: Vector3, triangle: Triangle) {
	for (let i = 0; i < 3; i += 1) {
		const normal = cross(triangle[i], triangle[(i + 1) % 3]);

		if (dot(normal, vector) > 0) {
			return false;
		}
	}

	return true;
}

export function findContaining(
	vec: Vector3,
	tris: readonly Triangle[],
): number {
	return tris.findIndex((tri) => triangleContains(vec, tri));
}
