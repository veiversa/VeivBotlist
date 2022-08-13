import BaseEvent from '../struct/base_event.js';

export default class MessageCreateEvent extends BaseEvent {
    constructor() {
        super({ event: 'messageCreate' });
    }

    /** @type {import("../struct/client").default} client @type {import("discord.js").Message} m */
    callback(client, m) {
        if (m.content === '!ping') {
            m.reply(`Pong! :ping_pong: **${client.ws.ping}**ms`);
        } else if (m.content === '!site') {
            m.reply('https://veivbotlist.com ^^');
        }
    }
}
