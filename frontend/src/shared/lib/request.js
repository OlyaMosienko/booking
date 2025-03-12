export const request = (url, method, data) =>
	fetch(url, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
