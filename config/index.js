import dotenv from 'dotenv';
import devConfig from './dev.config.js';

dotenv.config();

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        //todo
        throw new Error("production env not configured");
        break;
    case 'test':
        //todo
        throw new Error("test env not configured");
        break;
    default:
        config = devConfig;
        break;
}

config.secret = process.env.SECRET;
config.port = process.env.PORT;
config.node = process.env.NODE_ENV;

export default config;

