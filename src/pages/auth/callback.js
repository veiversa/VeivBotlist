import { serialize } from 'cookie';

/**@type {import('@sveltejs/kit').RequestHandler}*/
export async function GET({ url }) {
	const token = url.searchParams.get('token');

	if (!token) {
		return { status: 400, headers: { Location: '/' } };
	}

	return {
		headers: {
			Location: '/',
			'set-cookie': [
				serialize('token', token, {
					path: '/'
				})
			]
		},
		status: 302
	};
}
