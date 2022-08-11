import { Router } from 'express';

/** @param {import("../../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.get('/:id?', (req, res) => {
        /** @type {Record<import("discord.js").Snowflake, any>[]} */
        const bots = client.db.get(`bots`) || [];

        if (req.params.id) {
            const bot = bots.find((bot) => bot.id === req.params.id) || null;

            return res.status(bot ? 200 : 404).json({ data: bot });
        } else {
            return res.status(200).json({ data: bots });
        }
    });

    router.post('/', (req, res) => {
        const id = req.body.id;

        // todo
    });

    return router;
}
