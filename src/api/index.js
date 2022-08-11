import express from 'express';
import cors from 'cors';
import v1 from './routes/v1.js';

/** @param {import("../bot/struct/client").default} client */
export function API(client) {
    const app = express();

    app.use(cors());

    app.use('/v1', v1(client));

    app.get('/', (req, res) => {
        return res.status(200).send('OK');
    });

    app.listen(5050, () => {
        console.log('Server started on port 5050');
    });
}
