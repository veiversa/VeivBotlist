import Client from './struct/client.js';
import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env') });

new Client(process.env.TOKEN);
