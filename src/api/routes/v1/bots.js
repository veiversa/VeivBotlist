import { Router } from 'express';

/** @param {import("../../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.get('/:id?', (req, res) => {
        /** @type {Record<import("discord.js").Snowflake, any>[]} */

        if (req.params.id) {
            const bot = client.db.get(`bots.${req.params.id}`);

            if (!bot) {
                return res.status(404).json({ message: 'Invalid bot id' });
            }

            return res.status(200).json({ bot });
        } else {
            const bots = client.db.get(`bots`) || {};

            return res.status(200).json({ data: bots });
        }
    });

    router.post('/', async (req, res) => {
        const token = req.body?.token;

        if (typeof token !== 'string' || !client.db.has(`tokens.${token}`)) {
            return res.status(401).json({ error: '401: Unauthorized' });
        }

        const fetched = await fetch(`${process.env.API_URL}/v1/auth/user/${token}`)
            .then((res) => res.json())
            .catch(() => null);

        if (fetched.error) {
            return res.status(401).json({ error: '401: Unauthorized' });
        }

        const id = req.body.id;
        const shortDescription = req.body.short_description;
        const longDescription = req.body.long_description;
        const prefix = req.body.prefix;
        const ownerIds = req.body.owner_ids;
        const language = req.body.language;
        const supportServer = req.body.support_server;

        const idPattern = /[\d+]{17,19}/;
        const invitePattern = /(http(s?):\/\/)?(discord(app)?\.(gg|com))\/([a-zA-Z0-9]+)/;

        if (!idPattern.test(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }

        if (client.db.has(`bots.${id}`)) {
            return res.status(400).json({ message: 'Bot already exists' });
        }

        if (typeof shortDescription !== 'string') {
            return res.status(400).json({ message: 'Invalid short description' });
        }

        if (typeof longDescription !== 'string') {
            return res.status(400).json({ message: 'Invalid long description' });
        }

        if (typeof prefix !== 'string') {
            return res.status(400).json({ message: 'Invalid prefix' });
        }

        if (!Array.isArray(ownerIds)) {
            return res.status(400).json({ message: 'Invalid owner ids' });
        }

        for (const ownerId of ownerIds) {
            if (!idPattern.test(ownerId)) {
                return res.status(400).json({ message: 'Invalid owner ids' });
            }
        }

        if (typeof language !== 'string') {
            return res.status(400).json({ message: 'Invalid language' });
        }

        if (
            supportServer &&
            (typeof supportServer !== 'string' || !invitePattern.test(supportServer))
        ) {
            return res.status(400).json({ message: 'Invalid support server' });
        }

        client.db.set(`bots.${id}`, {
            id,
            token,
            shortDescription,
            longDescription,
            prefix,
            ownerIds,
            language,
            supportServer,
            approved: false,
        });

        for (const ownerId of ownerIds) {
            client.db.push(`users.${ownerId}.bots`, id, { returnIfExists: true });
        }

        return res.status(200).json({ message: 'Bot created' });
    });

    router.patch('/:id', (req, res) => {
        const token = req.body?.token;

        if (typeof token !== 'string' || !client.db.has(`tokens.${token}`)) {
            return res.status(401).json({ error: '401: Unauthorized' });
        }

        const idPattern = /[\d+]{17,19}/;

        if (!idPattern.test(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }

        const bot = client.db.get(`bots.${req.params.id}`);

        if (!bot) {
            return res.status(400).json({ message: 'Invalid bot id' });
        }

        const id = req.params.id;
        const shortDescription = req.body.short_description || bot.shortDescription;
        const longDescription = req.body.long_description || bot.longDescription;
        const prefix = req.body.prefix || bot.prefix;
        const ownerIds = req.body.owner_ids || bot.ownerIds;
        const language = req.body.language || bot.language;
        const supportServer = req.body.support_server || bot.supportServer;

        if (typeof shortDescription !== 'string') {
            return res.status(400).json({ message: 'Invalid short description' });
        }

        if (typeof longDescription !== 'string') {
            return res.status(400).json({ message: 'Invalid long description' });
        }

        if (typeof prefix !== 'string') {
            return res.status(400).json({ message: 'Invalid prefix' });
        }

        if (!Array.isArray(ownerIds)) {
            return res.status(400).json({ message: 'Invalid owner ids' });
        }

        for (const ownerId of ownerIds) {
            if (!idPattern.test(ownerId)) {
                return res.status(400).json({ message: 'Invalid owner ids' });
            }
        }

        if (typeof language !== 'string') {
            return res.status(400).json({ message: 'Invalid language' });
        }

        if (supportServer && typeof supportServer !== 'string') {
            return res.status(400).json({ message: 'Invalid support server' });
        }

        client.db.set(`bots.${id}`, {
            id,
            token,
            shortDescription,
            longDescription,
            prefix,
            ownerIds,
            language,
            supportServer,
            approved: bot.approved ?? true,
        });

        for (const ownerId of ownerIds) {
            client.db.push(`users.${ownerId}.bots`, id, { returnIfExists: true });
        }

        return res.status(200).json({ message: 'Bot updated' });
    });

    router.delete('/:id', (req, res) => {
        const token = req.body?.token;

        if (typeof token !== 'string' || !client.db.has(`tokens.${token}`)) {
            return res.status(401).json({ error: '401: Unauthorized' });
        }

        const id = req.params.id;

        const bot = client.db.get(`bots.${id}`);

        if (!bot) {
            return res.status(400).json({ message: 'Invalid bot id' });
        }

        client.db.delete(`bots.${id}`);

        for (const ownerId of bot.ownerIds) {
            client.db.pull(`users.${ownerId}.bots`, id);
        }

        return res.status(200).json({ message: 'Success!' });
    });

    return router;
}
