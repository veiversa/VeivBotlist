/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ url }) {
    const accessToken = url.searchParams.get('access_token');
    const tokenType = url.searchParams.get('token_type') || 'Bearer';

    if (!accessToken) {
        return {
            status: 403,
            body: JSON.stringify({ error: 'Invalid access token' }),
        };
    }

    const response = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            Authorization: `${tokenType} ${accessToken}`,
        },
    });

    const data = await response.json();

    if (data.message) {
        return {
            status: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    data.tag = data.username + '#' + data.discriminator;

    data.avatar_url = data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${
              data.avatar.startsWith('a_') ? 'gif' : 'png'
          }`
        : 'https://cdn.discordapp.com/embed/avatars/5.png';

    data.banner_url = data.banner
        ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${
              data.banner.startsWith('a_') ? 'gif' : 'png'
          }`
        : null;
    
    return {
        status: 200,
        body: JSON.stringify(data, null, 4),
    };
}
