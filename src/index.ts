import { triangles } from "./constants";
import {
	coord2vec,
	vec2coord,
	type Coord,
	type Vector3,
} from "@triangle-int/geomath";
import { type Triangle, center, findContaining, subdivide } from "./triangle";

function vec2triChainWithTris(
	vec: Vector3,
	tris: readonly Triangle[],
	length: number,
): {
	hash: string;
	triangles: Triangle[];
} {
	if (length <= 0) {
		return { hash: "", triangles: [] };
	}

	const index = findContaining(vec, tris);
	const rest = vec2triChainWithTris(vec, subdivide(tris[index]), length - 1);
	return {
		hash: `${index}${rest.hash}`,
		triangles: [tris[index], ...rest.triangles],
	};
}

export function vec2triChain(
	vec: Vector3,
	length: number,
): {
	hash: string;
	triangles: Triangle[];
} {
	const first = findContaining(vec, triangles);
	const rest = vec2triChainWithTris(
		vec,
		subdivide(triangles[first]),
		length - 1,
	);
	return {
		hash: `${String.fromCharCode("a".charCodeAt(0) + first)}${rest.hash}`,
		triangles: [triangles[first], ...rest.triangles],
	};
}

export function coord2triChain(
	coord: Coord,
	length: number,
): {
	hash: string;
	triangles: Triangle[];
} {
	return vec2triChain(coord2vec(coord), length);
}

function hash2vecWithTri(hash: string, tri: Triangle): Vector3 {
	if (hash.length === 0) {
		return center(tri);
	}

	const next = subdivide(tri)[Number.parseInt(hash.substring(0, 1))];
	return hash2vecWithTri(hash.substring(1), next);
}

export function hash2vec(hash: string): Vector3 {
	const index = hash.charCodeAt(0) - "a".charCodeAt(0);
	return hash2vecWithTri(hash.substring(1), triangles[index]);
}

export function vec2Hash(vec: Vector3, length: number): string {
	return vec2triChain(vec, length).hash;
}

export function coord2hash(coord: Coord, length: number): string {
	return coord2triChain(coord, length).hash;
}

export function hash2coord(hash: string): Coord {
	return vec2coord(hash2vec(hash));
}

export function coord2hashAndCenter(
	coord: Coord,
	length: number,
): {
	hash: string;
	centered: Coord;
} {
	const hash = coord2hash(coord, length);
	const centered = hash2coord(hash);

	return {
		hash,
		centered,
	};
}

export * from "./triangle";
