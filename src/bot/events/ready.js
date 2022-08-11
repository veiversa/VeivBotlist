import BaseEvent from '../struct/base_event.js';
import { API } from '../../api/index.js';

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super({ event: 'ready', once: true });
    }

    callback(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        API(client);
    }
}
