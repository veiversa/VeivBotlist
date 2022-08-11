import { Router } from 'express';

import users from './v1/users.js';
import bots from './v1/bots.js';

/** @param {import("../../bot/struct/client").default} client */
export default function v1(client) {
    const router = Router();

    router.use('/users', users(client));
    router.use('/bots', bots(client));

    return router;
}
