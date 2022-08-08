import cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    if (cookies.refresh_token && !cookies.access_token) {
        // @ts-ignore
        event.locals.require_refresh = true;
    }

    return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ request, locals }) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');

    //@ts-ignore
    if (locals.require_refresh) {
        const response = await fetch(
            `${import.meta.env.VITE_SITE_URL}/auth/refresh?refresh_token=${cookies.refresh_token}`
        );

        // @ts-ignore
        locals.require_refresh = false;

        const data = await response.json();

        if (data.access_token) {
            const user = await getUserWithAccessToken(data.access_token);

            return {
                user,
                tokens: {
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    token_type: data.token_type,
                    expires_in: data.expires_in,
                },
            };
        }

        return {
            user: false,
        };
    }

    if (cookies.access_token) {
        return await getUserWithAccessToken(cookies.access_token);
    } else {
        return {
            user: false,
        };
    }
}

/**@param {string} accessToken */
async function getUserWithAccessToken(accessToken) {
    const response = await fetch(
        `${import.meta.env.VITE_SITE_URL}/auth/user?access_token=${accessToken}`
    );

    const data = await response.json();

    return { user: data.id ? data : false };
}
