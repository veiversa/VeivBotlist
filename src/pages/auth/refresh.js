/**@type {import('@sveltejs/kit').RequestHandler}*/
export async function GET({ url }) {
    const refreshToken = url.searchParams.get('refresh_token');
    if (!refreshToken) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid refresh token' }),
        };
    }

    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        // @ts-ignore
        body: new URLSearchParams({
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            grant_type: 'refresh_token',
            redirect_uri: import.meta.env.VITE_SITE_URL + '/auth/callback',
            scope: 'identify',
            refresh_token: refreshToken,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = await response.json();

    if (data.error) {
        return {
            status: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    const resolved = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
    };

    return {
        status: 200,
        body: JSON.stringify(resolved, null, 4),
    };
}
