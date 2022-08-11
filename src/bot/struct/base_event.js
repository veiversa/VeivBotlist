export default class BaseEvent {
    /** @param {import("../types/IEventOptions").default} options */
    constructor(options) {
        /** @type {?import("./client").default} */
        this.client = null;

        this.event = options.event;
        this.once = options.once || false;
    }

    /** @param {import("./client").default} client @param {any[]} args @returns {any | Promise<any>} */
    // eslint-disable-next-line no-unused-vars
    callback(client, ...args) {
        throw new ReferenceError('This Method Not Implemented!');
    }
}
