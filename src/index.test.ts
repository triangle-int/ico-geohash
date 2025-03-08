import { describe, expect, test } from "vitest";
import { hash2vec, vec2Hash } from ".";
import { triangles } from "./constants";

describe("hashing", () => {
	test("should hash twice", () => {
		for (let t = 0; t < 10; t++) {
			let hash = String.fromCharCode(
				Math.floor(Math.random() * triangles.length) + "a".charCodeAt(0),
			);

			for (let i = 0; i < 19; i++) {
				hash = `${hash}${Math.floor(Math.random() * 4)}`;
			}

			const vec = hash2vec(hash);
			const hash2 = vec2Hash(vec, 20);
			expect(hash).toEqual(hash2);
		}
	});
});
