import BaseEvent from '../struct/base_event.js';

export default class MessageCreateEvent extends BaseEvent {
    constructor() {
        super({ event: 'messageCreate' });
    }

    /** @type {import("discord.js").Message} m */
    callback(client, m) {
        console.log(m.content)
        if (m.content === '!ping') {
            m.reply(`Pong! :ping_pong: **${client.ws.ping}**ms`);
        }
    }
}
