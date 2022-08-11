import { Client as BaseClient, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'node:fs';
import { SqliteDatabase } from 'erax.db';

export default class Client extends BaseClient {
    /** @param {string} token */
    constructor(token) {
        super({
            rest: { offset: 250 },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
            ],
            failIfNotExists: false,
        });

        /** @type {SqliteDatabase<any>} */
        this.db = new SqliteDatabase({
            filePath: './databases/database.db',
            tableName: '__VEIVERSA',
            backup: {
                enabled: true,
                filePath: './databases/backups',
            },
        });

        /** @type {Collection<string,import("./base_event").default>} */
        this.events = new Collection();

        this._loadListeners();

        this.login(token);
    }

    async _loadListeners() {
        const files = readdirSync('./src/bot/events');

        for await (const fileName of files) {
            /** @type {import("./base_event").default} */
            const file = new (await import(`../events/${fileName}`).then((e) => e.default))();

            file.client = this;

            this.events.set(file.event, file);

            if (file.once) {
                this.once(file.event, (...args) => file.callback(this, ...args));
            } else {
                this.on(file.event, (...args) => file.callback(this, ...args));
            }
        }
    }
}
