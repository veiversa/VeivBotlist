import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ request }) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.token;

	if (!token) {
		return {
			user: false
		};
	}

	await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/check`, {
		body: JSON.stringify({ token }),
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	});

	const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/user/${token}`);
	const data = await response.json();

	if (data.error) {
		return {
			user: false
		};
	}

	return {
		user: data.user
	};
}
