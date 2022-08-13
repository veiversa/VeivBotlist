import { Router } from 'express';

/** @param {import("../../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.get('/:id', async (req, res) => {
        const idPattern = /[\d+]{17,19}/;

        if (!idPattern.test(req.params.id)) {
            return res.status(404).json({ message: 'Invalid id' });
        }

        /** @type {import("discord.js").APIUser} */
        const user = await client.rest.get(`/users/${req.params.id}`).catch(() => null);

        
        if (!user) {
            return res.status(404).json({ message: 'Invalid id' });
        }
        
        if (user) {
            user.tag = user.username + '#' + user.discriminator;

            user.avatar_url = user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${
                      user.avatar.startsWith('a_') ? 'gif' : 'png'
                  }`
                : 'https://cdn.discordapp.com/embed/avatars/1.png';

            user.banner_url = user.banner
                ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${
                      user.banner.startsWith('a_') ? 'gif' : 'png'
                  }`
                : null;

            user.bots = client.db.get(`users.${user.id}.bots`) || [];
        }

        return res.status(200).json({ user });
    });

    return router;
}
