const postCodeRegex = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/;

export function formatPostcode(postcode: string): string {
	postcode = postcode.toUpperCase();
	postcode = postcode.replace(/[^0-9a-z]/gi, '');
	const parts = postcode.match(postCodeRegex);
	parts.shift();
	postcode = parts.join(' ');
	return postcode;
}
