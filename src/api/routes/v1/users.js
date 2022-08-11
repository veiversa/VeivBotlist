import { Router } from 'express';

/** @param {import("../../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.get('/:id', async (req, res) => {
        /** @type {import("discord.js").APIUser} */
        const user = await client.rest.get(`/users/${req.params.id}`).catch(() => null);

        if (user) {
            user.tag = user.username + '#' + user.discriminator;

            user.avatar_url = user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${
                      user.avatar.startsWith('a_') ? 'gif' : 'png'
                  }`
                : 'https://cdn.discordapp.com/embed/avatars/5.png';

            user.banner_url = user.banner
                ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${
                      user.banner.startsWith('a_') ? 'gif' : 'png'
                  }`
                : null;
        }

        return res.status(user ? 200 : 404).json({ data: user });
    });

    return router;
}
