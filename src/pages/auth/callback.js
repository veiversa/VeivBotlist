import cookie from 'cookie';

/**@type {import('@sveltejs/kit').RequestHandler}*/
export async function GET({ url }) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        // @ts-ignore
        body: new URLSearchParams({
            client_id: import.meta.env.VITE_CLIENT_ID,
             client_secret: import.meta.env.VITE_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: import.meta.env.VITE_SITE_URL + '/auth/callback',
            code: url.searchParams.get('code'),
            scope: 'identify',
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = await response.json();

    if (data.error) {
        return {
            headers: { Location: '/' },
            status: 302,
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
        status: 302,
    };
}
