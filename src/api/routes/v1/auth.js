import { Router } from 'express';
import { fetch } from 'undici';

/** @param {import("../../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.get('/login', async (req, res) => {
        return res
            .status(200)
            .redirect(
                `https://discord.com/api/oauth2/authorize?client_id=${
                    process.env.CLIENT_ID
                }&redirect_uri=${encodeURIComponent(
                    process.env.API_URL + '/v1/auth/callback'
                )}&response_type=code&scope=identify`
            );
    });

    router.get('/callback', async (req, res) => {
        try {
            /** @type {import("discord-api-types/v10").RESTPostOAuth2AccessTokenResult} */
            const response = await fetch('https://discordapp.com/api/oauth2/token', {
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: process.env.API_URL + '/v1/auth/callback',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    scope: 'identify',
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => res.json());

            if (response.error) {
                return res.status(400).redirect(process.env.SITE_URL);
            }

            const token = tokenGen();

            client.db.set(`tokens.${token}`, {
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
                tokenType: response.token_type,
                expiresIn: Date.now() + response.expires_in,
            });

            return res.status(200).redirect(`${process.env.SITE_URL}/auth/callback?token=${token}`);
        } catch {
            return res.status(400).redirect(process.env.SITE_URL);
        }
    });

    router.post('/refresh', async (req, res) => {
        const token = req.body?.token;

        if (!token) {
            return res.status(404).send('Invald token');
        }

        const fetched = client.db.get(`tokens.${token}`);

        if (!fetched) {
            return res.status(404).send('Invald token');
        }

        try {
            /** @type {import("discord-api-types/v10").RESTPostOAuth2RefreshTokenResult} */
            const response = await fetch(`https://discordapp.com/api/oauth2/token`, {
                body: URLSearchParams({
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    grant_type: 'refresh_token',
                    redirect_uri: process.env.API_URL + '/v1/auth/callback',
                    scope: 'identify',
                    refresh_token: fetched.refreshToken,
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then((res) => res.json());

            if (response.error) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            client.db.set(`tokens.${token}`, {
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
                tokenType: response.token_type,
                expiresIn: Date.now() + response.expires_in,
            });

            return res.status(200).json({ message: 'Success!' });
        } catch {
            return res.status(400).json({ message: 'Invalid token' });
        }
    });

    router.get('/user/:token', async (req, res) => {
        const fetched = client.db.get(`tokens.${req.params.token}`);

        if (!fetched) {
            return res.status(404).json({ error: 'Invalid token' });
        }

        try {
            const response = await fetch(`https://discordapp.com/api/users/@me`, {
                headers: { Authorization: `${fetched.tokenType} ${fetched.accessToken}` },
            }).then((res) => res.json());

            if (response.message) {
                return res.status(400).json({ error: 'An error occurred.' });
            }

            response.tag = response.username + '#' + response.discriminator;

            response.avatar_url = response.avatar
                ? `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.${
                      response.avatar.startsWith('a_') ? 'gif' : 'png'
                  }`
                : 'https://cdn.discordapp.com/embed/avatars/5.png';

            response.banner_url = response.banner
                ? `https://cdn.discordapp.com/banners/${response.id}/${response.banner}.${
                      response.banner.startsWith('a_') ? 'gif' : 'png'
                  }`
                : null;

            return res.status(200).json({ user: response });
        } catch {
            return res.status(400).json({ error: 'An error occurred.' });
        }
    });

    router.post('/check', async (req, res) => {
        const token = req.body?.token;

        if (!token) {
            return res.status(404).json({ error: 'Invalid token' });
        }

        const fetched = client.db.get(`tokens.${token}`);

        if (!fetched) {
            return res.status(404).json({ error: 'Invalid token' });
        }

        if (fetched.expiresIn < Date.now()) {
            await fetch(`${process.env.API_URL}/v1/refresh`, {
                body: { token },
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }).catch(() => null);
        }

        return res.status(200).json({ message: 'Success!' });
    });

    return router;
}

function tokenGen() {
    let chars = 'abcdefghijklmnopqrstuvwxyzASDDEFCHIJKLMNOPQRSTUVWXYZ0123456789';
    let l = chars.length;

    let p1 = '';
    let p2 = '';
    let p3 = '';

    for (let i = 0; i < 25; i++) {
        p1 += chars.charAt(Math.floor(Math.random() * l));
    }

    for (let i = 0; i < 5; i++) {
        p2 += chars.charAt(Math.floor(Math.random() * l));
    }

    for (let i = 0; i < 39; i++) {
        p3 += chars.charAt(Math.floor(Math.random() * l));
    }

    return `${p1}.${p2}.${p3}`;
}
