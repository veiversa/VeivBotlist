import cookie from 'cookie';

/**@type {import('@sveltejs/kit').RequestHandler}*/
export async function POST({ request }) {
    const data = await request.json();

    if (!data.access_token) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid access token' }, null, 4),
        };
    }

    if (!data.expires_in) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid access token expires' }, null, 4),
        };
    }

    if (!data.refresh_token) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid refresh token' }, null, 4),
        };
    }

    if (!data.token_type) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid token type' }, null, 4),
        };
    }

    return {
        headers: {
            'set-cookie': [
                cookie.serialize('access_token', data.access_token, {
                    expires: new Date(Date.now() + data.expires_in),
                    httpOnly: true,
                    path: '/',
                }),
                cookie.serialize('refresh_token', data.refresh_token, {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 * 12),
                    httpOnly: true,
                    path: '/',
                }),
                cookie.serialize('token_type', data.token_type, {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 * 12),
                    httpOnly: true,
                    path: '/',
                }),
            ],
            location: '/',
        },
        status: 200,
        body: JSON.stringify({ message: 'Successfully saved tokens' }, null, 4),
    };
}
