import { ClientEvents } from "discord.js";

export default interface IEventOptions {
    event: string;
    once?: boolean;
}
