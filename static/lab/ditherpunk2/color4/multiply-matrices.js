/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 */
// A is m x n. B is n x p. product is m x p.
export function multiplyMatrices(A, B) {
	let m = A.length;

	if(ArrayBuffer.isView(A)) {
		A = [...A];
	}

	if (!Array.isArray(A[0])) {
		// A is vector, convert to [[a, b, c, ...]]
		A = [A];
	}

	if(ArrayBuffer.isView(B)) {
		B = [...B];
	}

	if (!Array.isArray(B[0])) {
		// B is vector, convert to [[a], [b], [c], ...]]
		B = B.map(x => [x]);
	}

	let p = B[0].length;
	let B_cols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
	let product = A.map(row => B_cols.map(col => {
		if (!Array.isArray(row)) {
			return col.reduce((a, c) => a + c * row, 0);
		}

		return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
	}));

	if (m === 1) {
		product = product[0]; // Avoid [[a, b, c, ...]]
	}

	if (p === 1) {
		return product.map(x => x[0]); // Avoid [[a], [b], [c], ...]]
	}

	return product;
}