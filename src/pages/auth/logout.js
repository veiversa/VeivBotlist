import { serialize } from 'cookie';

export async function GET() {
	return {
		headers: {
			Location: '/',
			'set-cookie': [
				serialize('token', '', {
					maxAge: -1,
					path: '/'
				})
			]
		},
		status: 302
	};
}
